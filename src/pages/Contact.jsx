import React from 'react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 sm:top-20 sm:left-20 sm:w-72 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-10 w-56 h-56 sm:top-40 sm:right-20 sm:w-96 sm:h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/2 w-40 h-40 sm:bottom-20 sm:left-1/2 sm:w-80 sm:h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-22 sm:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-md sm:max-w-2xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? Let's connect and create something extraordinary together.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-start">
            {/* Contact Form */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-4 sm:p-8 border border-white/20 shadow-2xl">
              <div className="mb-4 sm:mb-8">
                <h2 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">Send us a message</h2>
                <p className="text-gray-300 text-sm sm:text-base">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              </div>
              <ContactForm />
            </div>
            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-8">
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-4 sm:p-8 border border-white/20 shadow-2xl">
                <h2 className="text-xl sm:text-3xl font-bold text-white mb-4 sm:mb-8">Contact Information</h2>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-2 sm:gap-4 p-2 sm:p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Phone</h3>
                      <p className="text-gray-300 text-xs sm:text-base">+91 9731535216</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-4 p-2 sm:p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Email</h3>
                      <p className="text-gray-300 text-xs sm:text-base">Highlightventures0317@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-4 p-2 sm:p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
                      <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Instagram</h3>
                      <p className="text-gray-300 text-xs sm:text-base">@highlight_ventures_0317</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-4 p-2 sm:p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Address</h3>
                      <p className="text-gray-300 text-xs sm:text-base leading-relaxed">
                        No. 786/1, 3rd main, 2nd cross,<br />
                        beside Muneshwara Temple,<br />
                        Telecom Layout, Srirampura,<br />
                        Jakkur, Bengaluru, Karnataka 560064
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Additional Info Card */}
              <div className="backdrop-blur-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl p-4 sm:p-8 border border-white/20 shadow-2xl">
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-4">Pradeepa C</h3>
                <p className="text-gray-300 mb-2 sm:mb-6 text-xs sm:text-base">
                  Ready to collaborate on your next project? Let's discuss how we can bring your vision to life with innovative solutions and creative excellence.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-white/10 rounded-full text-xs sm:text-sm text-white font-medium">
                    Available for Projects
                  </span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-white/10 rounded-full text-xs sm:text-sm text-white font-medium">
                    Quick Response
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}