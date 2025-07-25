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
        <div className="absolute -top-20 -right-20 w-40 h-40 sm:-top-40 sm:-right-40 sm:w-80 sm:h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 sm:-bottom-40 sm:-left-40 sm:w-80 sm:h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 py-22 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Award className="w-4 h-4 mr-2" />
              Bangalore's Premier Waterproofing Training
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6">
              Waterproofing Solutions
              <span className="block text-xl sm:text-4xl md:text-5xl mt-1 sm:mt-2">Training Center</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-md sm:max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Learn waterproofing solutions from Bangalore's trusted experts. Get practical training, work with real projects, and start your career in the growing construction industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
              <button
                onClick={() => window.open('https://wa.me/9731535216', '_blank')}
                className="group bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => window.open('https://wa.me/9731535216', '_blank')}
                className="group bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                WhatsApp Us
              </button>
            </div>
          </div>
          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-10 sm:mb-16">
            {[
              { number: '200+', label: 'Workers Trained', icon: Users },
              { number: '5+', label: 'Years Experience', icon: Award },
              { number: '24/7', label: 'Support Available', icon: CheckCircle },
              { number: '100%', label: 'Practical Training', icon: Star }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2 sm:mb-3" />
                  <div className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-xs sm:text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Training Image & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-10 sm:mb-16">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://plus.unsplash.com/premium_photo-1682974932896-ce7d226802b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHUlMjBmbG9vcmluZ3xlbnwwfHwwfHx8MA%3D%3D"
                  alt="Waterproofing training in progress"
                  className="w-full h-56 sm:h-80 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                  <div className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Live Training Session</div>
                  <div className="text-xs sm:text-sm opacity-90">Hands-on learning with expert guidance</div>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-green-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                ✓ Certified
              </div>
              <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-blue-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                🎓 Expert Led
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6">Why Choose Our Training?</h3>
              <div className="space-y-4 sm:space-y-6">
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
                  <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                    <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h4>
                      <p className="text-gray-600 text-xs sm:text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Contact Information */}
          <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-lg mb-10 sm:mb-16">
            <h3 className="text-lg sm:text-2xl font-bold text-center text-blue-900 mb-4 sm:mb-8">Contact Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Call Us</h4>
                <a href="tel:+919876543210" className="text-blue-600 hover:text-blue-800 font-semibold mb-1 sm:mb-2 block text-xs sm:text-base">+919731535216</a>
                <p className="text-gray-600 text-xs sm:text-base">Mon-Sat: 9AM-6PM IST</p>
              </div>
              <div className="text-center">
                <div className="bg-cyan-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Email Us</h4>
                <a href="mailto:Highlightventures0317@gmail.com" className="text-cyan-600 hover:text-cyan-800 font-semibold mb-1 sm:mb-2 block text-xs sm:text-base">Highlightventures0317@gmail.com</a>
                <p className="text-gray-600 text-xs sm:text-base">Quick response</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Visit Us</h4>
                <p className="text-gray-600 mb-1 sm:mb-2 text-xs sm:text-base">No. 786/1, 3rd main, 2nd cross, beside Muneshwara Temple,Telecom Layout, Srirampura, Jakkur, Bengaluru, Karnataka 560064</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Modal remains unchanged */}
    </section>
  );
}