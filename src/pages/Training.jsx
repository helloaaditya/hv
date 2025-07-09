import React, { useState } from 'react';
import { Phone, Mail, MapPin, Award, Users, Clock, CheckCircle, Star, ArrowRight, Play } from 'lucide-react';

export default function Training() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Basic Waterproofing',
    message: ''
  });



  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Direct WhatsApp contact
    const message = `Hi, I'm interested in ${formData.course} training. Name: ${formData.name}, Phone: ${formData.phone}`;
    const whatsappUrl = `https://wa.me/919731535216?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowContactModal(false);
    setFormData({ name: '', email: '', phone: '', course: 'Basic Waterproofing', message: '' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 min-h-screen">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 py-22 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              Bangalore's Premier Waterproofing Training
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-6">
              Waterproofing Solutions
              <span className="block text-4xl md:text-5xl mt-2">Training Center</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Learn waterproofing solutions from Bangalore's trusted experts. Get practical training, work with real projects, and start your career in the growing construction industry.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => window.open('https://wa.me/9731535216', '_blank')}
                className="group bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => window.open('https://wa.me/9731535216', '_blank')}
                className="group bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                WhatsApp Us
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { number: '200+', label: 'Students Trained', icon: Users },
              { number: '15+', label: 'Years Experience', icon: Award },
              { number: '24/7', label: 'Support Available', icon: CheckCircle },
              { number: '100%', label: 'Practical Training', icon: Star }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Training Image & Info */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://plus.unsplash.com/premium_photo-1682974932896-ce7d226802b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHUlMjBmbG9vcmluZ3xlbnwwfHwwfHx8MA%3D%3D"
                  alt="Waterproofing training in progress"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-2xl font-bold mb-2">Live Training Session</div>
                  <div className="text-sm opacity-90">Hands-on learning with expert guidance</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                ✓ Certified
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                🎓 Expert Led
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-blue-900 mb-6">Why Choose Our Training?</h3>
              <div className="space-y-6">
                {[
                  {
                    title: 'Expert Training',
                    desc: 'Learn from experienced waterproofing professionals with 15+ years in Bangalore.',
                    icon: Award
                  },
                  {
                    title: 'Practical Learning',
                    desc: 'Hands-on training with real waterproofing projects and materials.',
                    icon: Users
                  },
                  {
                    title: 'Complete Support',
                    desc: 'Get ongoing guidance and support even after completing your training.',
                    icon: CheckCircle
                  },
                  {
                    title: 'Modern Techniques',
                    desc: 'Learn latest waterproofing methods and materials used in construction.',
                    icon: Star
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Contact Information */}
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-16">
            <h3 className="text-2xl font-bold text-center text-blue-900 mb-8">Contact Us</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Call Us</h4>
                <a href="tel:+919876543210" className="text-blue-600 hover:text-blue-800 font-semibold mb-2 block">+919731535216</a>
                <p className="text-gray-600">Mon-Sat: 9AM-6PM IST</p>
              </div>

              <div className="text-center">
                <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-cyan-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Email Us</h4>
                <a href="mailto:Highlightventures0317@gmail.com" className="text-cyan-600 hover:text-cyan-800 font-semibold mb-2 block">Highlightventures0317@gmail.com</a>
                <p className="text-gray-600">Quick response</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Visit Us</h4>
                <p className="text-gray-600 mb-2">No. 786/1, 3rd main, 2nd cross,
                beside Muneshwara Temple,Telecom Layout, Srirampura,
                Jakkur, Bengaluru, Karnataka 560064</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-blue-900">Contact Us</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Course</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {courses.map(course => (
                    <option key={course.id} value={course.name}>{course.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Send WhatsApp Message
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}