import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://hv-mefz.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setShowSuccess(true);
        if (onSuccess) onSuccess();
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message');
    }
  };

  const closeSuccess = () => setShowSuccess(false);

  return (
    <>
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-0">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 max-w-xs sm:max-w-sm w-full text-center animate-fade-in">
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-2 sm:mb-4" />
            <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 text-gray-800">Thank you!</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Your request has been received.<br/>Our team will get in touch with you soon.</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-6 py-2 rounded-lg transition duration-200 shadow text-sm sm:text-base"
              onClick={closeSuccess}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs sm:text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              placeholder="Your full name"
              required
            />
          </div>
          <div className="space-y-1 sm:space-y-2">
            <label className="text-xs sm:text-sm font-medium text-gray-300">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              placeholder="+91 9731535216"
              required
            />
          </div>
        </div>
        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            placeholder="your@email.com"
            required
          />
        </div>
        <div className="space-y-1 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-gray-300">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base"
            placeholder="Tell us about your project..."
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
          disabled={isSubmitted}
        >
          {isSubmitted ? (
            <>
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              Message Sent!
            </>
          ) : (
            <>
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              Send Message
            </>
          )}
        </button>
        {error && <div className="text-red-400 text-center font-medium text-sm sm:text-base">{error}</div>}
      </form>
    </>
  );
} 