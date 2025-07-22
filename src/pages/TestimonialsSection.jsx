import React, { useState, useEffect } from 'react';
import { Star, Send, User, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

const TestimonialsSection = () => {
  // Initial testimonials data
  const [testimonials, setTestimonials] = useState([
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Exceptional service! They transformed our business completely. The results exceeded all our expectations."
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Professional, reliable, and innovative. Working with them was one of the best decisions we've made."
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, GrowthLab",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: "Outstanding results and incredible attention to detail. They truly understand what businesses need to succeed."
    }
  ]);

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

  // Simulate MongoDB operations (in real app, these would be API calls)
  const saveToMongoDB = async (testimonialData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real application, this would be:
    // const response = await fetch('/api/testimonials', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(testimonialData)
    // });
    // return response.json();
    
    return { success: true, id: Date.now() };
  };

  const fetchFromMongoDB = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real application, this would be:
    // const response = await fetch('/api/testimonials');
    // return response.json();
    
    return testimonials;
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.content) {
        throw new Error('Please fill in all required fields');
      }

      // Prepare testimonial data
      const testimonialData = {
        ...formData,
        image: formData.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=3b82f6&color=ffffff&size=150`,
        createdAt: new Date().toISOString()
      };

      // Save to MongoDB (simulated)
      const result = await saveToMongoDB(testimonialData);

      if (result.success) {
        // Add to local state for immediate display
        setTestimonials(prev => [...prev, testimonialData]);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          role: '',
          rating: 5,
          content: '',
          image: ''
        });
        
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your testimonial has been submitted successfully.'
        });
        
        // Hide form after successful submission
        setTimeout(() => {
          setShowForm(false);
          setSubmitStatus({ type: '', message: '' });
        }, 3000);
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load testimonials on component mount (simulated)
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchFromMongoDB();
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to load testimonials:', error);
      }
    };
    
    // loadTestimonials(); // Uncomment in real app
  }, []);

  return (
    <section className="py-24 px-12 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            What Our <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Don't just take our word for it - hear from our satisfied customers who trust us with their most valuable assets
          </p>
          
          {/* Add Testimonial Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Share Your Experience
          </button>
        </div>

        {/* Feedback Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-16 bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Share Your Testimonial</h3>
            
            {submitStatus.message && (
              <div className={`mb-6 p-4 rounded-lg flex items-center ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                {submitStatus.message}
              </div>
            )}

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role/Position
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., CEO, Marketing Director"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Optional: Link to your photo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="focus:outline-none transition-colors duration-200"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= formData.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        } hover:text-yellow-400 transition-colors duration-200`}
                      />
                    </button>
                  ))}
                </div>
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Share your experience with us..."
                  required
                />
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Testimonial
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 border border-gray-100"
            >
              <div className="flex items-center mb-8">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-100"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=3b82f6&color=ffffff&size=150`;
                  }}
                />
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 italic text-lg leading-relaxed">"{testimonial.content}"</p>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-xl">No testimonials yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;