import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowRight, Sparkles, Shield, Hammer, Droplets, Star, ChevronRight, Mail, CheckCircle, X } from 'lucide-react';

const flooringServices = [
  'Epoxy Flooring',
  'PU Flooring',
  'Antiskid Flooring',
  'Yellow Bay Marking',
  'Car Deck Flooring',
];

const waterproofingServices = [
  'New/Old Terrace Waterproofing',
  'New/Old Bathroom Waterproofing',
  'UG Sump & STP Tank Waterproofing',
  'External Wall Waterproofing',
  'Epoxy Tiles Grouting',
  'Retaining Wall Waterproofing',
  'Basement Waterproofing',
  'Swimming Pool Waterproofing',
];

export default function Services({ openQuoteModal }) {
  const [hoveredService, setHoveredService] = useState(null);
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [servicesFromApi, setServicesFromApi] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationTrigger(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    async function fetchServices() {
      try {
        const res = await fetch('https://hv-mefz.onrender.com/api/services');
        const json = res.ok ? await res.json() : [];
        if (!isCancelled) {
          setServicesFromApi(Array.isArray(json) ? json : []);
        }
      } catch (e) {
        if (!isCancelled) setServicesFromApi([]);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }
    fetchServices();
    return () => { isCancelled = true; };
  }, []);

  // Group services by category
  const groupedServices = useMemo(() => {
    if (servicesFromApi.length === 0) {
      return {
        flooring: flooringServices.map(title => ({ title, category: 'flooring' })),
        waterproofing: waterproofingServices.map(title => ({ title, category: 'waterproofing' }))
      };
    }
    
    return {
      flooring: servicesFromApi.filter(s => s.category?.toLowerCase() === 'flooring'),
      waterproofing: servicesFromApi.filter(s => s.category?.toLowerCase() === 'waterproofing')
    };
  }, [servicesFromApi]);

  const openServiceModal = useCallback((service) => {
    setSelectedService(service);
  }, []);

  const closeServiceModal = useCallback(() => {
    setSelectedService(null);
  }, []);

  const ServiceCard = ({ title, services, icon: Icon, gradient, delay = 0 }) => (
    <div 
      className={`group relative overflow-hidden rounded-3xl transition-all duration-700 transform ${
        animationTrigger ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
      
      {/* Glassmorphism Effect */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 p-8 h-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-gray-600">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">Premium Quality</span>
            </div>
          </div>
        </div>
        
        {/* Services List */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {services.map((service, index) => (
            <div
              key={service._id || index}
              className={`group/item flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm transition-all duration-300 cursor-pointer transform hover:scale-102 ${
                hoveredService === `${title}-${index}` 
                  ? 'bg-white/90 border border-blue-200 shadow-lg' 
                  : 'bg-white/70 border border-gray-200 hover:bg-white/90 hover:border-blue-200'
              }`}
              onMouseEnter={() => setHoveredService(`${title}-${index}`)}
              onMouseLeave={() => setHoveredService(null)}
              onClick={() => openServiceModal(service)}
            >
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} shadow-lg group-hover/item:shadow-xl transition-shadow duration-300`} />
              <span className="font-semibold text-base sm:text-lg text-gray-800 flex-1 group-hover/item:text-blue-600 transition-colors duration-300 line-clamp-1">
                {service.title}
              </span>
              <div className="flex items-center gap-2">
                {service.description && (
                  <span className="text-xs text-gray-500 hidden sm:inline">View Details</span>
                )}
                <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r ${gradient} text-white font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group/btn`}
            onClick={openQuoteModal}
          >
            <Sparkles className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
            Get Free Quote
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 overflow-y-auto py-8">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative animate-fade-in max-h-[90vh] overflow-y-auto">
            <button
              className="sticky top-0 right-0 float-right m-4 text-gray-600 hover:text-gray-900 text-3xl font-bold focus:outline-none transition-colors z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:shadow-xl"
              onClick={closeServiceModal}
              aria-label="Close service details"
            >
              <X className="w-6 h-6" />
            </button>
            
            {selectedService.image && (
              <div className="overflow-hidden rounded-t-2xl sm:rounded-t-3xl w-full">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            )}
            
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {selectedService.title}
                </h2>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  selectedService.category?.toLowerCase() === 'flooring' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {selectedService.category || 'Service'}
                </span>
              </div>
              
              {selectedService.description && (
                <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
                  {selectedService.description}
                </p>
              )}
              
              {selectedService.features && selectedService.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                    Key Features & Benefits
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2 text-gray-700 bg-gray-50 p-3 rounded-lg">
                        <span className="text-blue-600 mt-1 font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2 fill-yellow-500" />
                  Why Choose This Service?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our expert team uses industry-leading techniques and premium materials to ensure long-lasting protection. 
                  We provide comprehensive solutions tailored to your specific needs with guaranteed results and professional installation.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    closeServiceModal();
                    openQuoteModal();
                  }}
                  className={`flex-1 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 ${
                    selectedService.category?.toLowerCase() === 'flooring'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                  <span>Get Free Quote</span>
                </button>
                <button
                  onClick={closeServiceModal}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 sm:py-24">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className={`text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 transition-all duration-700 transform ${
            animationTrigger ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>
            <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text">
              Our Premium Services
            </span>
          </h1>
          <p className={`text-base sm:text-lg md:text-xl text-gray-700 max-w-xl sm:max-w-2xl mx-auto leading-relaxed transition-all duration-700 transform ${
            animationTrigger ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '400ms' }}>
            Discover our comprehensive range of flooring and waterproofing solutions, 
            engineered with cutting-edge technology and unmatched quality.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        ) : (
          <>
            {/* Services Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {groupedServices.flooring.length > 0 && (
                <ServiceCard
                  title="Flooring Services"
                  services={groupedServices.flooring}
                  icon={Hammer}
                  gradient="from-blue-600 to-cyan-600"
                  delay={600}
                />
              )}
              {groupedServices.waterproofing.length > 0 && (
                <ServiceCard
                  title="Waterproofing Services"
                  services={groupedServices.waterproofing}
                  icon={Shield}
                  gradient="from-purple-600 to-pink-600"
                  delay={800}
                />
              )}
            </div>

            {/* Bottom CTA */}
            <div className={`text-center mt-14 sm:mt-20 transition-all duration-700 transform ${
              animationTrigger ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '1000ms' }}>
              <button
                className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer group text-base sm:text-lg"
                onClick={openQuoteModal}
              >
                <Droplets className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Ready to Transform Your Space?</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }

        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}