import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Award, Calendar, MapPin, Phone, ArrowRight } from 'lucide-react';

const gallery = [
  {
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
    after: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
    desc: 'Terrace Waterproofing',
    location: 'HSR Layout, Bangalore',
    duration: '3 Days',
    problem: 'Severe water leakage during monsoon',
    solution: 'Complete membrane waterproofing system'
  },
  {
    before: 'https://images.unsplash.com/photo-1584622781564-1d987ba6d710?auto=format&fit=crop&w=400&q=80',
    after: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=400&q=80',
    desc: 'Bathroom Waterproofing',
    location: 'Koramangala, Bangalore',
    duration: '2 Days',
    problem: 'Wall seepage and floor leakage',
    solution: 'Advanced polyurethane coating'
  },
  {
    before: 'https://images.unsplash.com/photo-1590725140246-20acdee442be?auto=format&fit=crop&w=400&q=80',
    after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    desc: 'Basement Waterproofing',
    location: 'Whitefield, Bangalore',
    duration: '5 Days',
    problem: 'Groundwater seepage in basement',
    solution: 'Crystalline waterproofing treatment'
  },
  {
    before: 'https://images.unsplash.com/photo-1590725140246-20acdee442be?auto=format&fit=crop&w=400&q=80',
    after: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=400&q=80',
    desc: 'Swimming Pool Waterproofing',
    location: 'Indiranagar, Bangalore',
    duration: '7 Days',
    problem: 'Pool deck and wall leakage',
    solution: 'Epoxy waterproofing system'
  },
  {
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
    after: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80',
    desc: 'Balcony Waterproofing',
    location: 'Jayanagar, Bangalore',
    duration: '2 Days',
    problem: 'Water damage to lower floor',
    solution: 'Liquid membrane application'
  },
  {
    before: 'https://images.unsplash.com/photo-1584622781564-1d987ba6d710?auto=format&fit=crop&w=400&q=80',
    after: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=400&q=80',
    desc: 'External Wall Waterproofing',
    location: 'Electronic City, Bangalore',
    duration: '4 Days',
    problem: 'Exterior wall cracks and seepage',
    solution: 'Acrylic waterproofing coating'
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBefore, setShowBefore] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % gallery.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const openModal = (item, index) => {
    setSelectedImage({ ...item, index });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="relative py-22 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 sm:top-20 sm:left-20 sm:w-64 sm:h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 sm:bottom-20 sm:right-20 sm:w-64 sm:h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Award className="w-4 h-4 mr-2" />
            Our Completed Projects
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            Project Gallery
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-md sm:max-w-3xl mx-auto mb-6 sm:mb-8">
            See the transformation of our waterproofing solutions across Bangalore. From residential to commercial projects, we deliver lasting results.
          </p>
        </div>
        {/* Featured Slider */}
        <div className="mb-10 sm:mb-16">
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-full sm:max-w-4xl mx-auto">
            <div className="relative h-56 sm:h-96 md:h-[500px]">
              <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 gap-1">
                <div className="relative overflow-hidden">
                  <img 
                    src={gallery[currentSlide].before} 
                    alt="Before waterproofing" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                    BEFORE
                  </div>
                </div>
                <div className="relative overflow-hidden">
                  <img 
                    src={gallery[currentSlide].after} 
                    alt="After waterproofing" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                    AFTER
                  </div>
                </div>
              </div>
              {/* Navigation */}
              <button 
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            {/* Project Details */}
            <div className="p-4 sm:p-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-2 sm:mb-4 gap-2 sm:gap-0">
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{gallery[currentSlide].desc}</h3>
                  <div className="flex items-center text-blue-100 mb-1 sm:mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    {gallery[currentSlide].location}
                  </div>
                  <div className="flex items-center text-blue-100">
                    <Calendar className="w-4 h-4 mr-2" />
                    Completed in {gallery[currentSlide].duration}
                  </div>
                </div>
                <button 
                  onClick={() => openModal(gallery[currentSlide], currentSlide)}
                  className="bg-white text-blue-600 px-3 sm:px-4 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center text-xs sm:text-base"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-1 sm:mb-2 text-blue-100 text-xs sm:text-base">Problem:</h4>
                  <p className="text-white text-xs sm:text-base">{gallery[currentSlide].problem}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 sm:mb-2 text-blue-100 text-xs sm:text-base">Solution:</h4>
                  <p className="text-white text-xs sm:text-base">{gallery[currentSlide].solution}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Slide Indicators */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-1 sm:space-x-2">
            {gallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-blue-600 w-6 sm:w-8' : 'bg-gray-300 w-2 sm:w-3'
                }`}
              />
            ))}
          </div>
        </div>
        {/* Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-10 sm:mb-16">
          {gallery.map((item, idx) => (
            <div 
              key={idx}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-36 sm:h-48 overflow-hidden">
                <img 
                  src={item.after} 
                  alt={item.desc}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button 
                  onClick={() => openModal(item, idx)}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="bg-white text-blue-600 px-3 sm:px-4 py-2 rounded-full font-semibold flex items-center text-xs sm:text-base">
                    <Eye className="w-4 h-4 mr-2" />
                    View Project
                  </div>
                </button>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-xl font-bold text-blue-900 mb-1 sm:mb-2">{item.desc}</h3>
                <div className="flex items-center text-gray-600 mb-1 sm:mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {item.location}
                </div>
                <div className="flex items-center text-gray-600 mb-2 sm:mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {item.duration}
                </div>
                <p className="text-gray-700 text-xs sm:text-sm mb-2 sm:mb-4">{item.problem}</p>
                <button 
                  onClick={() => openModal(item, idx)}
                  className="text-blue-600 hover:text-blue-800 font-semibold text-xs sm:text-sm flex items-center"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* CTA Section */}
        <div className="text-center bg-white rounded-3xl p-4 sm:p-8 shadow-lg">
          <h3 className="text-lg sm:text-2xl font-bold text-blue-900 mb-2 sm:mb-4">Ready to Transform Your Property?</h3>
          <p className="text-gray-600 mb-6">Get expert waterproofing solutions for your home or business in Bangalore</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open('tel:+919731535216', '_self')}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: +91 9731535216
            </button>
            <button 
              onClick={() => window.open('https://wa.me/919731535216', '_blank')}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300"
            >
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white text-gray-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
              >
                ×
              </button>
              
              <div className="p-8">
                <h3 className="text-3xl font-bold text-blue-900 mb-6">{selectedImage.desc}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={selectedImage.before} 
                        alt="Before" 
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        BEFORE
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900">Problem Identified:</h4>
                    <p className="text-gray-700">{selectedImage.problem}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={selectedImage.after} 
                        alt="After" 
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        AFTER
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900">Solution Applied:</h4>
                    <p className="text-gray-700">{selectedImage.solution}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6 mb-8">
                  <h4 className="font-bold text-blue-900 mb-4">Project Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                      <span><strong>Location:</strong> {selectedImage.location}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                      <span><strong>Duration:</strong> {selectedImage.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-600 mb-6">Need similar waterproofing solutions for your property?</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => window.open('tel:+919731535216', '_self')}
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </button>
                    <button 
                      onClick={() => window.open('https://wa.me/919731535216', '_blank')}
                      className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300"
                    >
                      WhatsApp Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}