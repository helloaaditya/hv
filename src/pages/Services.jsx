import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Shield, Hammer, Droplets, Star } from 'lucide-react';

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

export default function Services() {
  const [hoveredService, setHoveredService] = useState(null);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationTrigger(true), 100);
    return () => clearTimeout(timer);
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
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-gray-300">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">Premium Quality</span>
            </div>
          </div>
        </div>
        
        {/* Services List */}
        <div className="space-y-3">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group/item flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                hoveredService === `${title}-${index}` 
                  ? 'bg-white/10 border border-white/20 shadow-lg' 
                  : 'bg-white/5 border border-white/5 hover:bg-white/10'
              }`}
              onMouseEnter={() => setHoveredService(`${title}-${index}`)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} shadow-lg group-hover/item:shadow-xl transition-shadow duration-300`} />
              <span className="text-gray-200 flex-1 group-hover/item:text-white transition-colors duration-300">
                {service}
              </span>
              <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-300" />
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <button className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r ${gradient} text-white font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group/btn`}>
            <Sparkles className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
            Get Quote
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px- py-22">
        {/* Hero Section */}
        <div className="text-center mb-16">
          
          <h1 className={`text-6xl md:text-7xl font-bold mb-6 transition-all duration-700 transform ${
            animationTrigger ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>
            <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text">
              Our Services
            </span>
          </h1>
          
          <p className={`text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed transition-all duration-700 transform ${
            animationTrigger ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '400ms' }}>
            Discover our premium range of flooring and waterproofing solutions, 
            engineered with cutting-edge technology and unmatched quality.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <ServiceCard
            title="Flooring Services"
            services={flooringServices}
            icon={Hammer}
            gradient="from-blue-600 to-cyan-600"
            delay={600}
          />
          
          <ServiceCard
            title="Waterproofing Services"
            services={waterproofingServices}
            icon={Shield}
            gradient="from-purple-600 to-pink-600"
            delay={800}
          />
        </div>
        
        {/* Bottom CTA */}
        <div className={`text-center mt-20 transition-all duration-700 transform ${
          animationTrigger ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '1000ms' }}>
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer group">
            <Droplets className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span>Ready to Transform Your Space?</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}