import React, { useState, useEffect } from 'react';
import { Award, Shield, Users, Clock, Heart, Star, CheckCircle, Sparkles, ArrowRight, Trophy } from 'lucide-react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Award,
      title: "Affordable Pricing",
      description: "Premium quality without breaking the bank",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Guaranteed Work",
      description: "100% satisfaction guarantee on all projects",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Expert & Experienced Team",
      description: "Skilled professionals with 5+ years experience",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Timely Project Completion",
      description: "On-time delivery, every time",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Heart,
      title: "Customer-First Approach",
      description: "Your satisfaction is our top priority",
      color: "from-rose-500 to-pink-500"
    }
  ];

  const stats = [
    { number: "5+", label: "Years Experience", icon: Trophy },
    { number: "500+", label: "Projects Completed", icon: CheckCircle },
    { number: "100%", label: "Customer Satisfaction", icon: Star },
    { number: "24/7", label: "Support Available", icon: Shield }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/5 w-60 h-60 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/5 w-60 h-60 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 sm:w-64 sm:h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-22 sm:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10 sm:mb-20">
            <h2 className={`text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-8 transition-all duration-700 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '200ms' }}>
              <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text">
                About Us
              </span>
            </h2>
            <p className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-xl sm:max-w-4xl mx-auto leading-relaxed transition-all duration-700 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '400ms' }}>
              With over 5 years of experience, Highlight Ventures is committed to providing top-quality waterproofing solutions for homes and businesses. Our values are rooted in integrity, reliability, and customer satisfaction. We use the latest technology and best materials to ensure lasting results.
            </p>
          </div>
          {/* Stats Section */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-20 transition-all duration-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '600ms' }}>
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-2 sm:mb-4 group-hover:rotate-12 transition-transform duration-300">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Why Choose Us Section */}
          <div className={`transition-all duration-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '800ms' }}>
            <div className="text-center mb-8 sm:mb-16">
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                  Why Choose Us?
                </span>
              </h3>
              <p className="text-gray-300 text-base sm:text-lg max-w-md sm:max-w-2xl mx-auto">
                Discover what makes us the preferred choice for waterproofing and flooring solutions
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-3xl transition-all duration-500 transform hover:scale-105 ${
                    hoveredFeature === index ? 'z-10' : ''
                  }`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{ transitionDelay: `${1000 + index * 100}ms` }}
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                  {/* Glassmorphism Card */}
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-4 sm:p-8 h-full group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-2xl`}>
                      <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    {/* Content */}
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-2 sm:mb-4 text-sm sm:text-base">
                      {feature.description}
                    </p>
                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-xs sm:text-sm font-medium">Learn More</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Call to Action */}
          <div className={`text-center mt-10 sm:mt-20 transition-all duration-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '1400ms' }}>
            <div className="inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer group text-base sm:text-lg">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Experience Excellence Today</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}