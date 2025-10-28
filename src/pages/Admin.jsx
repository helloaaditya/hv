import React, { useState, useEffect } from 'react';
import { Eye, Trash2, FileSpreadsheet, Star, CheckCircle, XCircle, MessageSquare, Users, Settings, Home, Phone, Camera, Plus, Edit, Save, X } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [submissions, setSubmissions] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);
  const [homepageContent, setHomepageContent] = useState([]);
  const [contactDetails, setContactDetails] = useState([]);
  const [projectPhotos, setProjectPhotos] = useState([]);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('submissions');
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [heroSlides, setHeroSlides] = useState([]);

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

  const fetchServices = () => {
    if (token) {
      fetch('https://hv-4qa2.onrender.com/api/admin/services', {
        headers: { Authorization: token },
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setServices(data);
        });
    }
  };

  const fetchHomepageContent = () => {
    if (token) {
      fetch('https://hv-4qa2.onrender.com/api/admin/homepage-content', {
        headers: { Authorization: token },
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setHomepageContent(data);
            // Extract hero slides from homepage content
            const heroItems = data.filter(c => (c.section || '').toLowerCase().startsWith('hero'));
            setHeroSlides(heroItems);
          }
        });
    }
  };

  const fetchContactDetails = () => {
    if (token) {
      fetch('https://hv-4qa2.onrender.com/api/admin/contact-details', {
        headers: { Authorization: token },
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setContactDetails(data);
        });
    }
  };

  const fetchProjectPhotos = () => {
    if (token) {
      fetch('https://hv-4qa2.onrender.com/api/admin/project-photos', {
        headers: { Authorization: token },
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setProjectPhotos(data);
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
    fetchServices();
    fetchHomepageContent();
    fetchContactDetails();
    fetchProjectPhotos();
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

  // New CRUD functions for services
  const handleCreateService = async (serviceData) => {
    setLoading(true);
    try {
      const response = await fetch('https://hv-4qa2.onrender.com/api/admin/services', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: token 
        },
        body: JSON.stringify(serviceData),
      });
      
      if (response.ok) {
        fetchServices();
        setShowEditModal(false);
        setEditForm({});
      }
    } catch (error) {
      console.error('Error creating service:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateService = async (id, serviceData) => {
    setLoading(true);
    try {
      const response = await fetch(`https://hv-4qa2.onrender.com/api/admin/services/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: token 
        },
        body: JSON.stringify(serviceData),
      });
      
      if (response.ok) {
        fetchServices();
        setShowEditModal(false);
        setEditForm({});
      }
    } catch (error) {
      console.error('Error updating service:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://hv-4qa2.onrender.com/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });
      
      if (response.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    } finally {
      setLoading(false);
    }
  };

  // Similar functions for other entities...
  const handleCreateProjectPhoto = async (photoData) => {
    setLoading(true);
    try {
      const response = await fetch('https://hv-4qa2.onrender.com/api/admin/project-photos', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: token 
        },
        body: JSON.stringify(photoData),
      });
      
      if (response.ok) {
        fetchProjectPhotos();
        setShowEditModal(false);
        setEditForm({});
      }
    } catch (error) {
      console.error('Error creating project photo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProjectPhoto = async (id, photoData) => {
    setLoading(true);
    try {
      const response = await fetch(`https://hv-4qa2.onrender.com/api/admin/project-photos/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: token 
        },
        body: JSON.stringify(photoData),
      });
      
      if (response.ok) {
        fetchProjectPhotos();
        setShowEditModal(false);
        setEditForm({});
      }
    } catch (error) {
      console.error('Error updating project photo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProjectPhoto = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://hv-4qa2.onrender.com/api/admin/project-photos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });
      
      if (response.ok) {
        fetchProjectPhotos();
      }
    } catch (error) {
      console.error('Error deleting project photo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateContactDetails = async (id, detailsData) => {
    setLoading(true);
    try {
      const response = await fetch(`https://hv-4qa2.onrender.com/api/admin/contact-details/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: token 
        },
        body: JSON.stringify(detailsData),
      });
      
      if (response.ok) {
        fetchContactDetails();
        setShowEditModal(false);
        setEditForm({});
      }
    } catch (error) {
      console.error('Error updating contact details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHomepageContent = async (id, contentData) => {
    setLoading(true);
    try {
      const response = await fetch(`https://hv-4qa2.onrender.com/api/admin/homepage-content/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: token 
        },
        body: JSON.stringify(contentData),
      });
      
      if (response.ok) {
        fetchHomepageContent();
        setShowEditModal(false);
        setEditForm({});
      }
    } catch (error) {
      console.error('Error updating homepage content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Hero slides specific functions
  const handleCreateHeroSlide = async (slideData) => {
    setLoading(true);
    try {
      const response = await fetch('https://hv-4qa2.onrender.com/api/admin/homepage-content', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: token 
        },
        body: JSON.stringify({
          ...slideData,
          section: `hero-${Date.now()}`, // Unique section name
          isActive: true
        }),
      });
      
      if (response.ok) {
        fetchHomepageContent();
        setShowEditModal(false);
        setEditForm({});
      }
    } catch (error) {
      console.error('Error creating hero slide:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHeroSlide = async (id, slideData) => {
    setLoading(true);
    try {
      const response = await fetch(`https://hv-4qa2.onrender.com/api/admin/homepage-content/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: token 
        },
        body: JSON.stringify(slideData),
      });
      
      if (response.ok) {
        fetchHomepageContent();
        setShowEditModal(false);
        setEditForm({});
      }
    } catch (error) {
      console.error('Error updating hero slide:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHeroSlide = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://hv-4qa2.onrender.com/api/admin/homepage-content/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });
      
      if (response.ok) {
        fetchHomepageContent();
      }
    } catch (error) {
      console.error('Error deleting hero slide:', error);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (item, type) => {
    setEditingItem({ ...item, type });
    setEditForm({ ...item });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    
    const { type, _id } = editingItem;
    
    switch (type) {
      case 'service':
        if (_id) {
          handleUpdateService(_id, editForm);
        } else {
          handleCreateService(editForm);
        }
        break;
      case 'projectPhoto':
        if (_id) {
          handleUpdateProjectPhoto(_id, editForm);
        } else {
          handleCreateProjectPhoto(editForm);
        }
        break;
      case 'contactDetails':
        handleUpdateContactDetails(_id, editForm);
        break;
      case 'homepageContent':
        handleUpdateHomepageContent(_id, editForm);
        break;
      case 'heroSlide':
        if (_id) {
          handleUpdateHeroSlide(_id, editForm);
        } else {
          handleCreateHeroSlide(editForm);
        }
        break;
      default:
        break;
    }
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
  <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center sm:text-left">
    Admin Dashboard
  </h2>

  <div className="flex flex-wrap justify-center sm:justify-end gap-2">
    <button
      onClick={handleExport}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
      title={`Export ${activeTab} to Excel`}
    >
      <FileSpreadsheet className="w-5 h-5" /> Export
    </button>

    <button
      onClick={handleDeleteAll}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200 w-full sm:w-auto"
      disabled={
        loading ||
        (activeTab === 'submissions'
          ? submissions.length === 0
          : testimonials.length === 0)
      }
    >
      Delete All
    </button>

    <button
      onClick={() => {
        setToken('');
        localStorage.removeItem('adminToken');
      }}
      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200 w-full sm:w-auto"
    >
      Logout
    </button>
  </div>
</div>


        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors text-sm ${
              activeTab === 'submissions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Leads ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors text-sm ${
              activeTab === 'testimonials'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Testimonials ({testimonials.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors text-sm ${
              activeTab === 'services'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Services ({services.length})
          </button>
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors text-sm ${
              activeTab === 'hero'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Home className="w-4 h-4 inline mr-2" />
            Hero Slides ({heroSlides.length})
          </button>
          {/* <button
            onClick={() => setActiveTab('homepage')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors text-sm ${
              activeTab === 'homepage'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Homepage Content
          </button> */}
          {/* <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors text-sm ${
              activeTab === 'contact'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Phone className="w-4 h-4 inline mr-2" />
            Contact Details
          </button> */}
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors text-sm ${
              activeTab === 'photos'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Camera className="w-4 h-4 inline mr-2" />
            Project Photos ({projectPhotos.length})
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
              </>
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
              </>
            )}
          </>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <>
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Services Management</h3>
              <button
                onClick={() => openEditModal({}, 'service')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </button>
            </div>
            {services.length === 0 ? (
              <div className="text-gray-500 text-center py-8 text-lg">No services yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                  <div key={service._id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-gray-800">{service.title}</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(service, 'service')}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit Service"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete Service"
                          disabled={loading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{service.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        service.category === 'flooring' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {service.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        service.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    {service.features && service.features.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-2">Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Hero Slides Tab */}
        {activeTab === 'hero' && (
          <>
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Hero Slides Management</h3>
              <button
                onClick={() => openEditModal({}, 'heroSlide')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Hero Slide
              </button>
            </div>
            {heroSlides.length === 0 ? (
              <div className="text-gray-500 text-center py-8 text-lg">No hero slides yet. Add your first slide to get started.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {heroSlides.map((slide, index) => (
                  <div key={slide._id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <div className="relative">
                      <img 
                        src={slide.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop&auto=format'} 
                        alt={slide.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button
                          onClick={() => openEditModal(slide, 'heroSlide')}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg"
                          title="Edit Slide"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteHeroSlide(slide._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
                          title="Delete Slide"
                          disabled={loading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <span className="bg-black/50 text-white px-2 py-1 rounded text-xs font-medium">
                          Slide {index + 1}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{slide.title}</h4>
                      {slide.subtitle && (
                        <p className="text-gray-600 mb-2 text-sm line-clamp-2">{slide.subtitle}</p>
                      )}
                      {slide.description && (
                        <p className="text-gray-500 text-xs line-clamp-3">{slide.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          slide.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {slide.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {slide.section}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Homepage Content Tab */}
        {activeTab === 'homepage' && (
          <>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Homepage Content Management</h3>
            </div>
            {homepageContent.length === 0 ? (
              <div className="text-gray-500 text-center py-8 text-lg">No homepage content configured yet.</div>
            ) : (
              <div className="space-y-4">
                {homepageContent.map(content => (
                  <div key={content._id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-gray-800 capitalize">{content.section}</h4>
                      <button
                        onClick={() => openEditModal(content, 'homepageContent')}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                        title="Edit Content"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-semibold text-gray-700">Title:</h5>
                        <p className="text-gray-600">{content.title}</p>
                      </div>
                      {content.subtitle && (
                        <div>
                          <h5 className="font-semibold text-gray-700">Subtitle:</h5>
                          <p className="text-gray-600">{content.subtitle}</p>
                        </div>
                      )}
                      <div>
                        <h5 className="font-semibold text-gray-700">Description:</h5>
                        <p className="text-gray-600">{content.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          content.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {content.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Contact Details Tab
        {activeTab === 'contact' && (
          <>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Details Management</h3>
            </div>
            {contactDetails.length === 0 ? (
              <div className="text-gray-500 text-center py-8 text-lg">No contact details configured yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactDetails.map(detail => (
                  <div key={detail._id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-gray-800">{detail.label}</h4>
                      <button
                        onClick={() => openEditModal(detail, 'contactDetails')}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                        title="Edit Contact Detail"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-semibold text-gray-700">Type:</h5>
                        <p className="text-gray-600 capitalize">{detail.type}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-700">Value:</h5>
                        <p className="text-gray-600">{detail.value}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          detail.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {detail.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )} */}

        {/* Project Photos Tab */}
        {activeTab === 'photos' && (
          <>
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Project Photos Management</h3>
              <button
                onClick={() => openEditModal({}, 'projectPhoto')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Photo
              </button>
            </div>
            {projectPhotos.length === 0 ? (
              <div className="text-gray-500 text-center py-8 text-lg">No project photos yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectPhotos.map(photo => (
                  <div key={photo._id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <div className="relative">
                      <img 
                        src={photo.image} 
                        alt={photo.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button
                          onClick={() => openEditModal(photo, 'projectPhoto')}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg"
                          title="Edit Photo"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProjectPhoto(photo._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
                          title="Delete Photo"
                          disabled={loading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">{photo.title}</h4>
                      {photo.description && (
                        <p className="text-gray-600 mb-3 text-sm">{photo.description}</p>
                      )}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {photo.category}
                        </span>
                        {photo.location && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                            {photo.location}
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          photo.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {photo.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      {photo.features && photo.features.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-gray-700 mb-2 text-sm">Features:</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {photo.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-left animate-fade-in relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-bold focus:outline-none"
              onClick={() => {
                setShowEditModal(false);
                setEditingItem(null);
                setEditForm({});
              }}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-6 text-blue-700">
              {editingItem?._id ? 'Edit' : 'Add'} {editingItem?.type === 'service' ? 'Service' : 
               editingItem?.type === 'projectPhoto' ? 'Project Photo' :
               editingItem?.type === 'contactDetails' ? 'Contact Detail' :
               editingItem?.type === 'homepageContent' ? 'Homepage Content' :
               editingItem?.type === 'heroSlide' ? 'Hero Slide' : 'Item'}
            </h3>
            
            <div className="space-y-4">
              {editingItem?.type === 'service' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Service title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Service description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={editForm.category || ''}
                      onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      <option value="flooring">Flooring</option>
                      <option value="waterproofing">Waterproofing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={editForm.image || ''}
                      onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                    <textarea
                      value={editForm.features?.join('\n') || ''}
                      onChange={(e) => setEditForm({...editForm, features: e.target.value.split('\n').filter(f => f.trim())})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editForm.isActive || false}
                        onChange={(e) => setEditForm({...editForm, isActive: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Active</span>
                    </label>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                      <input
                        type="number"
                        value={editForm.order || 0}
                        onChange={(e) => setEditForm({...editForm, order: parseInt(e.target.value) || 0})}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </>
              )}

              {editingItem?.type === 'projectPhoto' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Project title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Project description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <input
                        type="text"
                        value={editForm.category || ''}
                        onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Residential, Commercial"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={editForm.location || ''}
                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Bengaluru, Karnataka"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={editForm.image || ''}
                      onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Completed Date</label>
                    <input
                      type="text"
                      value={editForm.completedDate || ''}
                      onChange={(e) => setEditForm({...editForm, completedDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., March 2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                    <textarea
                      value={editForm.features?.join('\n') || ''}
                      onChange={(e) => setEditForm({...editForm, features: e.target.value.split('\n').filter(f => f.trim())})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editForm.isActive || false}
                        onChange={(e) => setEditForm({...editForm, isActive: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Active</span>
                    </label>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                      <input
                        type="number"
                        value={editForm.order || 0}
                        onChange={(e) => setEditForm({...editForm, order: parseInt(e.target.value) || 0})}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </>
              )}

              {editingItem?.type === 'contactDetails' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={editForm.type || ''}
                      onChange={(e) => setEditForm({...editForm, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      <option value="phone">Phone</option>
                      <option value="email">Email</option>
                      <option value="address">Address</option>
                      <option value="instagram">Instagram</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                    <input
                      type="text"
                      value={editForm.label || ''}
                      onChange={(e) => setEditForm({...editForm, label: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Phone, Email, Address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                    <textarea
                      value={editForm.value || ''}
                      onChange={(e) => setEditForm({...editForm, value: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Contact information value"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editForm.isActive || false}
                        onChange={(e) => setEditForm({...editForm, isActive: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Active</span>
                    </label>
                  </div>
                </>
              )}

              {editingItem?.type === 'heroSlide' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Hero slide title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={editForm.subtitle || ''}
                      onChange={(e) => setEditForm({...editForm, subtitle: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Hero slide subtitle"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Hero slide description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={editForm.image || ''}
                      onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/hero-image.jpg"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editForm.isActive || false}
                        onChange={(e) => setEditForm({...editForm, isActive: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Active</span>
                    </label>
                  </div>
                </>
              )}

              {editingItem?.type === 'homepageContent' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                    <input
                      type="text"
                      value={editForm.section || ''}
                      onChange={(e) => setEditForm({...editForm, section: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., hero, services, about"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Section title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={editForm.subtitle || ''}
                      onChange={(e) => setEditForm({...editForm, subtitle: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Section subtitle"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      placeholder="Section description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={editForm.image || ''}
                      onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editForm.isActive || false}
                        onChange={(e) => setEditForm({...editForm, isActive: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Active</span>
                    </label>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingItem(null);
                  setEditForm({});
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 