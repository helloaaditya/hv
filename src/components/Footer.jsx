import React, { useState, useEffect } from 'react';
import { FaInstagram, FaPhoneAlt, FaEnvelope, FaArrowUp, FaMapMarkerAlt, FaChevronUp } from 'react-icons/fa';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Training', path: '/training' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

const services = [
  'Epoxy Flooring',
  'PU Flooring',
  'Antiskid Flooring',
  'Yellow bay marking',
  'Car deck flooring',
  'Terrace Waterproofing',
  'Bathroom Waterproofing',
  'Wall Waterproofing',
  'Basement Waterproofing',
];

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white pt-16 pb-8 mt-0 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.08),transparent_50%)] pointer-events-none"></div>
        
        {/* Top Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Logo & Description */}
            <div className="flex flex-col items-center md:items-start space-y-4 lg:col-span-1">
              <div className="group cursor-pointer transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">HV</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Highlight Ventures
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs text-center md:text-left">
                We provide expert waterproofing and flooring solutions for homes and businesses in Bengaluru. 
                <span className="text-blue-400 font-medium"> Quality, reliability, and customer satisfaction</span> are our top priorities.
              </p>
              
              {/* Social Media with Hover Effects */}
              <div className="flex space-x-4 mt-4">
                <a 
                  href="https://instagram.com/highlight_ventures_0317" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                >
                  <FaInstagram className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <h4 className="font-semibold text-lg text-white relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </h4>
              <div className="space-y-3">
                {quickLinks.map(link => (
                  <a 
                    key={link.name} 
                    href={link.path} 
                    className="group flex items-center text-gray-300 hover:text-blue-400 text-sm transition-all duration-300 hover:translate-x-1"
                  >
                    <FaChevronUp className="w-3 h-3 mr-2 rotate-90 group-hover:rotate-45 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <h4 className="font-semibold text-lg text-white relative">
                Our Services
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </h4>
              <div className="space-y-2">
                {services.map((service, index) => (
                  <div 
                    key={service} 
                    className="group flex items-center text-gray-300 text-sm hover:text-purple-400 transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & Address */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <h4 className="font-semibold text-lg text-white relative">
                Get In Touch
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
              </h4>
              
              <div className="space-y-4">
                {/* Phone */}
                <a 
                  href="tel:+919731535216" 
                  className="group flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-all duration-300 hover:translate-x-1"
                >
                  <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all duration-300">
                    <FaPhoneAlt className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-sm">9731535216</span>
                </a>

                {/* Email */}
                <a 
                  href="mailto:Highlightventures0317@gmail.com" 
                  className="group flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1"
                >
                  <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-all duration-300">
                    <FaEnvelope className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm">Highlightventures0317@gmail.com</span>
                </a>

                {/* Address */}
                <div className="group flex items-start space-x-3 text-gray-300 hover:text-purple-400 transition-all duration-300">
                  <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all duration-300 mt-1">
                    <FaMapMarkerAlt className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-sm leading-relaxed">
                    <div className="font-medium mb-1">Our Location</div>
                    <address className="not-italic text-gray-400">
                      No. 786/1, 3rd main, 2nd cross,<br />
                      beside Muneshwara Temple,<br />
                      Telecom Layout, Srirampura,<br />
                      Jakkur, Bengaluru, Karnataka 560064
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-700/50">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  &copy; {new Date().getFullYear()} Highlight Ventures. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Crafted with ❤️ for quality flooring and waterproofing solutions
                </p>
              </div>
              
              <div className="flex items-center space-x-6 text-xs text-gray-400">
                <span className="hover:text-blue-400 cursor-pointer transition-colors duration-300">Privacy Policy</span>
                <span className="hover:text-blue-400 cursor-pointer transition-colors duration-300">Terms of Service</span>
                <span className="hover:text-blue-400 cursor-pointer transition-colors duration-300">Sitemap</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
        }}
      >
        <FaArrowUp className="w-5 h-5 animate-bounce" />
      </button>
    </>
  );
}