import React, { useState, useEffect } from 'react';
import { Star, Send, User, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

const TestimonialsSection = () => {
  // State for testimonials from database
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    rating: 5,
    content: '',
    image: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Fetch approved testimonials from API
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://hv-mefz.onrender.com/api/testimonials');
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      const data = await response.json();
      setTestimonials(data);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  // Load testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.role || !formData.content) {
        throw new Error('Please fill in all required fields');
      }

      // Submit testimonial to API
      const response = await fetch('https://hv-mefz.onrender.com/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit testimonial');
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        role: '',
        rating: 5,
        content: '',
        image: ''
      });
      setShowForm(false);
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you! Your testimonial has been submitted and will be reviewed by our team.' 
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: '', message: '' });
      }, 5000);

    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to submit testimonial. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Render testimonial card
  const renderTestimonial = (testimonial, index) => (
    <div
      key={testimonial._id || index}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
          {testimonial.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
        </div>
        <div className="flex">{renderStars(testimonial.rating)}</div>
      </div>
      <p className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our valued clients have to say about their experience with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mb-12">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading testimonials...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-gray-600">{error}</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No testimonials available yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map(renderTestimonial)}
            </div>
          )}
        </div>

        {/* Submit Testimonial Section */}
        <div className="text-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Send className="inline w-5 h-5 mr-2" />
            Share Your Experience
          </button>
        </div>

        {/* Testimonial Submission Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Share Your Experience</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Status Message */}
              {submitStatus.message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  <div className="flex items-center">
                    {submitStatus.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 mr-2" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mr-2" />
                    )}
                    {submitStatus.message}
                  </div>
                </div>
              )}

              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role/Position *
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., CEO, Marketing Director, Founder"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating *
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className={`p-2 rounded-lg transition-colors ${
                          formData.rating >= star
                            ? 'text-yellow-400 bg-yellow-50'
                            : 'text-gray-300 hover:text-yellow-300'
                        }`}
                      >
                        <Star className={`w-6 h-6 ${formData.rating >= star ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.rating} out of 5 stars
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Testimonial *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Share your experience with our services..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      <>
                        <Send className="inline w-5 h-5 mr-2" />
                        Submit Testimonial
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;