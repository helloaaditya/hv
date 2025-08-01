import React, { useState, useEffect } from 'react';
import { Eye, Trash2, FileSpreadsheet, Star, CheckCircle, XCircle, MessageSquare, Users } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [submissions, setSubmissions] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('submissions'); // 'submissions' or 'testimonials'
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // null for single, 'all' for all, or array for bulk

  const fetchSubmissions = () => {
    if (token) {
      fetch('https://hv-4qa2.onrender.com/api/admin/submissions', {
        headers: { Authorization: token },
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setSubmissions(data);
        });
    }
  };

  const fetchTestimonials = () => {
    if (token) {
      fetch('https://hv-4qa2.onrender.com/api/admin/testimonials', {
        headers: { Authorization: token },
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setTestimonials(data);
        });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('https://hv-4qa2.onrender.com/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(login),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      localStorage.setItem('adminToken', data.token);
    } else {
      setError(data.message || 'Login failed');
    }
  };

  useEffect(() => {
    fetchSubmissions();
    fetchTestimonials();
    // eslint-disable-next-line
  }, [token]);

  const handleDelete = async (id) => {
    setDeleteTarget(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    
    setLoading(true);
    try {
      if (deleteTarget === 'all') {
        // Delete all items
        const endpoint = activeTab === 'submissions' 
          ? 'https://hv-4qa2.onrender.com/api/admin/submissions/all'
          : 'https://hv-4qa2.onrender.com/api/admin/testimonials/all';
        
        await fetch(endpoint, {
          method: 'DELETE',
          headers: { Authorization: token },
        });
        
        if (activeTab === 'submissions') {
          setSubmissions([]);
        } else {
          setTestimonials([]);
        }
      } else if (Array.isArray(deleteTarget)) {
        // Bulk delete selected items
        const endpoint = activeTab === 'submissions' 
          ? 'https://hv-4qa2.onrender.com/api/admin/submissions/bulk'
          : 'https://hv-4qa2.onrender.com/api/admin/testimonials/bulk';
        
        await fetch(endpoint, {
          method: 'DELETE',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: token 
          },
          body: JSON.stringify({ ids: deleteTarget }),
        });
        
        if (activeTab === 'submissions') {
          setSubmissions(submissions.filter(s => !deleteTarget.includes(s._id)));
        } else {
          setTestimonials(testimonials.filter(t => !deleteTarget.includes(t._id)));
        }
      } else {
        // Delete single item
        const endpoint = activeTab === 'submissions' 
          ? `https://hv-4qa2.onrender.com/api/admin/submissions/${deleteTarget}`
          : `https://hv-4qa2.onrender.com/api/admin/testimonials/${deleteTarget}`;
        
        await fetch(endpoint, {
          method: 'DELETE',
          headers: { Authorization: token },
        });
        
        if (activeTab === 'submissions') {
          setSubmissions(submissions.filter(s => s._id !== deleteTarget));
        } else {
          setTestimonials(testimonials.filter(t => t._id !== deleteTarget));
        }
      }
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
      setDeleteTarget(null);
      setSelectedItems(new Set());
      setSelectAll(false);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
      setSelectAll(false);
    } else {
      const items = activeTab === 'submissions' ? submissions : testimonials;
      setSelectedItems(new Set(items.map(item => item._id)));
      setSelectAll(true);
    }
  };

  const handleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
    setSelectAll(newSelected.size === (activeTab === 'submissions' ? submissions.length : testimonials.length));
  };

  const handleBulkDelete = () => {
    if (selectedItems.size === 0) return;
    setDeleteTarget(Array.from(selectedItems));
    setShowDeleteConfirm(true);
  };

  const handleDeleteAll = () => {
    setDeleteTarget('all');
    setShowDeleteConfirm(true);
  };

  const handleApproveTestimonial = async (id, isApproved) => {
    setLoading(true);
    try {
      const response = await fetch(`https://hv-4qa2.onrender.com/api/admin/testimonials/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: token 
        },
        body: JSON.stringify({ isApproved }),
      });
      
      if (response.ok) {
        setTestimonials(testimonials.map(t => 
          t._id === id ? { ...t, isApproved } : t
        ));
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const data = activeTab === 'submissions' 
      ? submissions.map(s => ({
          Name: s.name,
          Email: s.email,
          Phone: s.phone,
          Message: s.message,
          Date: new Date(s.date).toLocaleString(),
        }))
      : testimonials.map(t => ({
          Name: t.name,
          Email: t.email,
          Role: t.role,
          Rating: t.rating,
          Content: t.content,
          Approved: t.isApproved ? 'Yes' : 'No',
          Date: new Date(t.date).toLocaleString(),
        }));
    
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, activeTab === 'submissions' ? 'Leads' : 'Testimonials');
    XLSX.writeFile(wb, `${activeTab}.xlsx`);
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Username"
              value={login.username}
              onChange={e => setLogin({ ...login, username: e.target.value })}
              required
            />
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={e => setLogin({ ...login, password: e.target.value })}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 shadow"
            >
              Login
            </button>
          </form>
          {error && <div className="mt-4 text-center text-red-600 font-medium">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-22">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-7xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-700">Admin Dashboard</h2>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200 flex items-center gap-2"
              title={`Export ${activeTab} to Excel`}
            >
              <FileSpreadsheet className="w-5 h-5" /> Export
            </button>
            <button
              onClick={handleDeleteAll}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200"
              disabled={loading || (activeTab === 'submissions' ? submissions.length === 0 : testimonials.length === 0)}
            >
              Delete All
            </button>
            <button
              onClick={() => { setToken(''); localStorage.removeItem('adminToken'); }}
              className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'submissions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageSquare className="w-5 h-5 inline mr-2" />
            Contact Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'testimonials'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="w-5 h-5 inline mr-2" />
            Testimonials ({testimonials.length})
          </button>
        </div>

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <>
            {submissions.length === 0 ? (
              <div className="text-gray-500 text-center py-8 text-lg">No submissions yet.</div>
            ) : (
              <>
                {/* Bulk Actions */}
                <div className="mb-4 flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Select All</span>
                    </label>
                    {selectedItems.size > 0 && (
                      <span className="text-sm text-gray-600">
                        {selectedItems.size} item(s) selected
                      </span>
                    )}
                  </div>
                  {selectedItems.size > 0 && (
                    <button
                      onClick={handleBulkDelete}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200"
                      disabled={loading}
                    >
                      Delete Selected ({selectedItems.size})
                    </button>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-blue-700 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Message</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-blue-700 uppercase tracking-wider">View</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-blue-700 uppercase tracking-wider">Delete</th>
                      </tr>
                    </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {submissions.map(s => (
                      <tr key={s._id} className="hover:bg-blue-50 transition">
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(s._id)}
                            onChange={() => handleSelectItem(s._id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{s.name}</td>
                        <td className="px-4 py-3 text-blue-700 whitespace-nowrap">{s.email}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{s.phone || '-'}</td>
                        <td className="px-4 py-3 text-gray-700 max-w-xs break-words truncate" title={s.message}>{s.message}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{new Date(s.date).toLocaleString()}</td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => setSelected(s)} className="text-blue-600 hover:text-blue-900" title="View Details">
                            <Eye className="w-5 h-5 inline" />
                          </button>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => handleDelete(s._id)} className="text-red-600 hover:text-red-900" title="Delete Lead" disabled={loading}>
                            <Trash2 className="w-5 h-5 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <>
            {testimonials.length === 0 ? (
              <div className="text-gray-500 text-center py-8 text-lg">No testimonials yet.</div>
            ) : (
              <>
                {/* Bulk Actions */}
                <div className="mb-4 flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Select All</span>
                    </label>
                    {selectedItems.size > 0 && (
                      <span className="text-sm text-gray-600">
                        {selectedItems.size} item(s) selected
                      </span>
                    )}
                  </div>
                  {selectedItems.size > 0 && (
                    <button
                      onClick={handleBulkDelete}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200"
                      disabled={loading}
                    >
                      Delete Selected ({selectedItems.size})
                    </button>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-blue-700 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Role</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Rating</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Content</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-blue-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {testimonials.map(t => (
                      <tr key={t._id} className="hover:bg-blue-50 transition">
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(t._id)}
                            onChange={() => handleSelectItem(t._id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{t.name}</td>
                        <td className="px-4 py-3 text-blue-700 whitespace-nowrap">{t.email}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{t.role}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < t.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-500">({t.rating})</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700 max-w-xs break-words truncate" title={t.content}>{t.content}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            t.isApproved 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {t.isApproved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{new Date(t.date).toLocaleString()}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <button 
                              onClick={() => setSelected(t)} 
                              className="text-blue-600 hover:text-blue-900" 
                              title="View Details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            {!t.isApproved && (
                              <button 
                                onClick={() => handleApproveTestimonial(t._id, true)} 
                                className="text-green-600 hover:text-green-900" 
                                title="Approve"
                                disabled={loading}
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                            )}
                            {t.isApproved && (
                              <button 
                                onClick={() => handleApproveTestimonial(t._id, false)} 
                                className="text-yellow-600 hover:text-yellow-900" 
                                title="Reject"
                                disabled={loading}
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            )}
                            <button 
                              onClick={() => handleDelete(t._id)} 
                              className="text-red-600 hover:text-red-900" 
                              title="Delete"
                              disabled={loading}
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-left animate-fade-in relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-bold focus:outline-none"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-4 text-blue-700">
              {activeTab === 'submissions' ? 'Submission' : 'Testimonial'} Details
            </h3>
            <div className="space-y-3">
              <div><span className="font-semibold text-gray-700">Name:</span> {selected.name}</div>
              <div><span className="font-semibold text-gray-700">Email:</span> {selected.email}</div>
              {activeTab === 'submissions' ? (
                <>
                  <div><span className="font-semibold text-gray-700">Phone:</span> {selected.phone || '-'}</div>
                  <div><span className="font-semibold text-gray-700">Message:</span><br /><span className="block bg-gray-50 rounded p-2 mt-1 text-gray-800 whitespace-pre-line">{selected.message}</span></div>
                </>
              ) : (
                <>
                  <div><span className="font-semibold text-gray-700">Role:</span> {selected.role}</div>
                  <div><span className="font-semibold text-gray-700">Rating:</span> {selected.rating}/5</div>
                  <div><span className="font-semibold text-gray-700">Status:</span> <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    selected.isApproved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>{selected.isApproved ? 'Approved' : 'Pending'}</span></div>
                  <div><span className="font-semibold text-gray-700">Content:</span><br /><span className="block bg-gray-50 rounded p-2 mt-1 text-gray-800 whitespace-pre-line">{selected.content}</span></div>
                </>
              )}
              <div><span className="font-semibold text-gray-700">Date:</span> {new Date(selected.date).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-left animate-fade-in relative">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {deleteTarget === 'all' 
                  ? `Delete All ${activeTab === 'submissions' ? 'Submissions' : 'Testimonials'}?`
                  : Array.isArray(deleteTarget)
                  ? `Delete ${deleteTarget.length} Selected ${activeTab === 'submissions' ? 'Submission' : 'Testimonial'}${deleteTarget.length > 1 ? 's' : ''}?`
                  : `Delete ${activeTab === 'submissions' ? 'Submission' : 'Testimonial'}?`
                }
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. This will permanently delete the {activeTab === 'submissions' ? 'submission' : 'testimonial'}{deleteTarget === 'all' || (Array.isArray(deleteTarget) && deleteTarget.length > 1) ? 's' : ''} from the database.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteTarget(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete Permanently'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 