import React, { useState, useEffect } from 'react';
import { Eye, Trash2, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [submissions, setSubmissions] = useState([]);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

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
    // eslint-disable-next-line
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    setLoading(true);
    await fetch(`https://hv-4qa2.onrender.com/api/admin/submissions/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
    });
    setLoading(false);
    setSubmissions(submissions.filter(s => s._id !== id));
  };

  const handleExport = () => {
    const data = submissions.map(s => ({
      Name: s.name,
      Email: s.email,
      Phone: s.phone,
      Message: s.message,
      Date: new Date(s.date).toLocaleString(),
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Leads');
    XLSX.writeFile(wb, 'leads.xlsx');
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
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-5xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-700">Contact Form Submissions</h2>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200 flex items-center gap-2"
              title="Export to Excel"
            >
              <FileSpreadsheet className="w-5 h-5" /> Export
            </button>
            <button
              onClick={() => { setToken(''); localStorage.removeItem('adminToken'); }}
              className="ml-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
        {submissions.length === 0 ? (
          <div className="text-gray-500 text-center py-8 text-lg">No submissions yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
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
            <h3 className="text-2xl font-bold mb-4 text-blue-700">Submission Details</h3>
            <div className="space-y-3">
              <div><span className="font-semibold text-gray-700">Name:</span> {selected.name}</div>
              <div><span className="font-semibold text-gray-700">Email:</span> {selected.email}</div>
              <div><span className="font-semibold text-gray-700">Phone:</span> {selected.phone || '-'}</div>
              <div><span className="font-semibold text-gray-700">Message:</span><br /><span className="block bg-gray-50 rounded p-2 mt-1 text-gray-800 whitespace-pre-line">{selected.message}</span></div>
              <div><span className="font-semibold text-gray-700">Date:</span> {new Date(selected.date).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 