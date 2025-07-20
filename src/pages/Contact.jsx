import React from 'react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-22 sm:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-4 sm:mb-6">
              Get In Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-md sm:max-w-2xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? Let's connect and create something extraordinary together.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-4 sm:p-8 border border-blue-100 shadow-2xl">
              <div className="mb-4 sm:mb-8">
                <h2 className="text-xl sm:text-3xl font-bold text-blue-900 mb-2 sm:mb-4">Send us a message</h2>
                <p className="text-gray-700 text-sm sm:text-base">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              </div>
              <ContactForm />
            </div>
            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-4 sm:p-8 border border-purple-100 shadow-2xl">
                <h2 className="text-xl sm:text-3xl font-bold text-purple-900 mb-4 sm:mb-8">Contact Information</h2>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-2 sm:gap-4 p-2 sm:p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300">
                    <div className="p-2 sm:p-3 bg-blue-100 rounded-xl">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1 text-sm sm:text-base">Phone</h3>
                      <p className="text-gray-700 text-xs sm:text-base">+91 9731535216</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-4 p-2 sm:p-4 rounded-xl bg-cyan-50 hover:bg-cyan-100 transition-all duration-300">
                    <div className="p-2 sm:p-3 bg-cyan-100 rounded-xl">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-cyan-900 mb-1 text-sm sm:text-base">Email</h3>
                      <p className="text-gray-700 text-xs sm:text-base">Highlightventures0317@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-4 p-2 sm:p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all duration-300">
                    <div className="p-2 sm:p-3 bg-purple-100 rounded-xl">
                      <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900 mb-1 text-sm sm:text-base">Instagram</h3>
                      <p className="text-gray-700 text-xs sm:text-base">@highlight_ventures_0317</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-4 p-2 sm:p-4 rounded-xl bg-pink-50 hover:bg-pink-100 transition-all duration-300">
                    <div className="p-2 sm:p-3 bg-pink-100 rounded-xl">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-pink-900 mb-1 text-sm sm:text-base">Address</h3>
                      <p className="text-gray-700 text-xs sm:text-base leading-relaxed">
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
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-4 sm:p-8 border border-blue-100 shadow-2xl">
                <h3 className="text-lg sm:text-2xl font-bold text-blue-900 mb-2 sm:mb-4">Pradeepa C</h3>
                <p className="text-gray-700 mb-2 sm:mb-6 text-xs sm:text-base">
                  Ready to collaborate on your next project? Let's discuss how we can bring your vision to life with innovative solutions and creative excellence.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 rounded-full text-xs sm:text-sm text-blue-900 font-medium">
                    Available for Projects
                  </span>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 bg-cyan-100 rounded-full text-xs sm:text-sm text-cyan-900 font-medium">
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