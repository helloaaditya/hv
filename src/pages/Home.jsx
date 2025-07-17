import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, Phone, Mail, Star, CheckCircle, Users, Calendar, Award, ArrowRight, ChevronLeft, Plus, Minus, Eye, ExternalLink } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function LandingPage({ openQuoteModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [counters, setCounters] = useState({
    projects: 0,
    experience: 0,
    clients: 0,
    warranty: 0
  });

  // Counter animation
  useEffect(() => {
    const targets = { projects: 500, experience: 5, clients: 1200, warranty: 25 };
    const duration = 2000;
    const steps = 50;
    const stepDuration = duration / steps;

    const intervals = Object.keys(targets).map(key => {
      const target = targets[key];
      const increment = target / steps;
      let current = 0;
      
      return setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(intervals[Object.keys(targets).indexOf(key)]);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepDuration);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Hero slider with real images
  const heroSlides = [
    {
      title: "Professional Waterproofing Solutions",
      subtitle: "Protect Your Property with Advanced Technology",
      description: "Expert waterproofing services for residential and commercial properties. 15+ years of experience with guaranteed results.",
      image: "https://images.unsplash.com/photo-1596859777303-7cd0c841106d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Basement Waterproofing Experts",
      subtitle: "Keep Your Foundation Dry & Secure",
      description: "Comprehensive basement waterproofing solutions using cutting-edge materials and proven techniques.",
      image: "https://images.unsplash.com/photo-1511747813271-99d6710c197d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZsb29yfGVufDB8fDB8fHww"
    },
    {
      title: "Commercial Waterproofing Services",
      subtitle: "Large-Scale Protection Solutions",
      description: "Professional waterproofing for commercial buildings, warehouses, and industrial facilities.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop&auto=format"
    }
  ];

  const recentWorks = [
    {
      title: "Luxury Residential Basement",
      location: "Bengaluru, Karnataka",
      description: "Complete basement waterproofing with premium drainage system and moisture control.",
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop&auto=format",
      category: "Residential",
      completedDate: "March 2024",
      features: ["Interior Drainage", "Vapor Barrier", "Dehumidification System"]
    },
    {
      title: "Commercial Warehouse Complex",
      location: "Mumbai, Maharashtra",
      description: "Large-scale waterproofing for 50,000 sq ft warehouse facility with advanced membrane system.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop&auto=format",
      category: "Commercial",
      completedDate: "February 2024",
      features: ["Membrane Waterproofing", "Structural Reinforcement", "Drainage Solutions"]
    },
    {
      title: "Heritage Building Restoration",
      location: "Delhi, NCR",
      description: "Specialized waterproofing for historic structure preserving architectural integrity.",
      image: "https://images.unsplash.com/photo-1558618666-fbd19c830cd4?w=600&h=400&fit=crop&auto=format",
      category: "Heritage",
      completedDate: "January 2024",
      features: ["Heritage Preservation", "Custom Solutions", "Structural Protection"]
    },
    {
      title: "Multi-Story Residential Complex",
      location: "Hyderabad, Telangana",
      description: "Comprehensive waterproofing for 12-story residential building with terrace garden.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&auto=format",
      category: "Residential",
      completedDate: "December 2023",
      features: ["Roof Waterproofing", "Terrace Gardens", "Facade Protection"]
    },
    {
      title: "Industrial Manufacturing Plant",
      location: "Chennai, Tamil Nadu",
      description: "Heavy-duty waterproofing for chemical processing facility with specialized coatings.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop&auto=format",
      category: "Industrial",
      completedDate: "November 2023",
      features: ["Chemical Resistant Coatings", "Floor Waterproofing", "Containment Systems"]
    },
    {
      title: "Luxury Villa Swimming Pool",
      location: "Goa",
      description: "Premium waterproofing for infinity pool with integrated water features.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop&auto=format",
      category: "Luxury",
      completedDate: "October 2023",
      features: ["Pool Waterproofing", "Water Features", "Deck Protection"]
    }
  ];

  const faqs = [
    {
      question: "How long does waterproofing last?",
      answer: "Our waterproofing solutions come with a 25-year warranty and are designed to last for decades. The longevity depends on factors like material quality, installation technique, and environmental conditions. With proper maintenance, our systems can protect your property for 30+ years."
    },
    {
      question: "What's included in a free inspection?",
      answer: "Our comprehensive free inspection includes moisture level testing, structural assessment, identification of water entry points, evaluation of existing waterproofing systems, and a detailed report with recommended solutions. We also provide a no-obligation quote for all suggested work."
    },
    {
      question: "Do you offer emergency waterproofing services?",
      answer: "Yes, we provide 24/7 emergency waterproofing services for urgent situations like flooding, major leaks, or structural water damage. Our rapid response team can implement temporary protective measures and begin permanent repairs within hours of your call."
    },
    {
      question: "What areas do you serve?",
      answer: "We provide waterproofing services across major cities in India including Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Pune, and surrounding areas. For projects outside these regions, we can arrange specialized teams for large-scale commercial or industrial work."
    },
    {
      question: "How much does waterproofing cost?",
      answer: "Waterproofing costs vary based on property size, complexity, materials used, and specific requirements. Residential projects typically range from ₹150-500 per sq ft, while commercial projects are quoted based on scope. We provide detailed estimates after our free inspection."
    },
    {
      question: "Can you waterproof during monsoon season?",
      answer: "While we prefer dry conditions for optimal results, we can perform certain waterproofing work during monsoon using specialized techniques and materials. Interior waterproofing, crack repairs, and emergency work can be done year-round with proper preparation."
    },
    {
      question: "What warranty do you provide?",
      answer: "We offer industry-leading warranties: 25 years on structural waterproofing, 15 years on basement systems, 10 years on roof waterproofing, and 5 years on repair work. Our warranties cover both materials and workmanship, with free annual inspections."
    },
    {
      question: "Do you use eco-friendly waterproofing materials?",
      answer: "Yes, we prioritize environmentally safe materials and offer eco-friendly waterproofing solutions including water-based membranes, bio-degradable sealants, and low-VOC coatings. These materials are safe for families, pets, and the environment while providing excellent protection."
    }
  ];

  const services = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Basement Waterproofing",
      description: "Complete basement protection with interior and exterior waterproofing solutions.",
      features: ["Interior Drainage", "Exterior Sealing", "Sump Pump Installation"],
      image: "https://images.unsplash.com/photo-1558618666-fbd19c830cd4?w=400&h=300&fit=crop&auto=format"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Foundation Repair",
      description: "Professional foundation crack repair and structural waterproofing services.",
      features: ["Crack Injection", "Foundation Sealing", "Structural Reinforcement"],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&auto=format"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Roof Waterproofing",
      description: "Advanced roof waterproofing systems for long-lasting protection.",
      features: ["Membrane Installation", "Leak Detection", "Preventive Maintenance"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Commercial Services",
      description: "Large-scale waterproofing solutions for commercial and industrial properties.",
      features: ["Site Assessment", "Custom Solutions", "Project Management"],
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop&auto=format"
    }
  ];

  const testimonials = [
    {
      name: "Likith M",
      role: "Homeowner",
      content: "Highlight Ventures transformed our basement from a damp, unusable space into a dry, comfortable area. Their team was professional and the results exceeded our expectations.",
      rating: 5,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6dtqv8-fhhNxjkOC95oWMGiwNIxGtPWnwQBCIaEYqaHbX4DatSa_bwm8P3MsuZFyr5uphfA&s"
    },
    {
      name: "Punith",
      role: "Property Manager",
      content: "We've used Highlight Ventures for multiple commercial properties. Their expertise and reliability make them our go-to waterproofing contractor.",
      rating: 5,
      image: "data:image/jpeg;base64,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"
    },
    {
      name: "Yashwanth K",
      role: "Business Owner",
      content: "The team solved our persistent water issues with innovative solutions. The warranty and follow-up service give us complete peace of mind.",
      rating: 5,
      image: "data:image/jpeg;base64,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"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % recentWorks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [recentWorks.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Modal for Get Free Quote */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-lg relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-cyan-400 focus:outline-none"
              onClick={() => setShowQuoteModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Get Free Quote</h2>
            <p className="text-gray-300 mb-6 text-center">Fill out the form and our team will get back to you soon.</p>
            <ContactForm />
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative h-[420px] sm:h-180 flex flex-col items-center justify-center overflow-hidden px-2 sm:px-0 pt-20 sm:pt-0">
        <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
          <img 
            src={heroSlides[currentSlide].image} 
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>
        <button 
          onClick={prevSlide}
          className="absolute left-2 sm:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-2 sm:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
        <div className="relative z-10 text-center text-white px-2 sm:px-6 max-w-6xl w-full">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-6 animate-fade-in leading-tight break-words">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl mb-2 sm:mb-6 text-blue-100 font-medium">
            {heroSlides[currentSlide].subtitle}
          </p>
          <p className="text-xs xs:text-sm sm:text-lg mb-4 sm:mb-10 text-gray-200 max-w-xs xs:max-w-sm sm:max-w-2xl sm:max-w-4xl mx-auto leading-relaxed">
            {heroSlides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center w-full">
            <button
              className="block w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3 text-sm xs:text-base sm:text-lg"
              onClick={openQuoteModal}
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="block w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 text-sm xs:text-base sm:text-lg">
              <span>Learn More</span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-2 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div className="transform hover:scale-110 transition-all duration-300 animate-on-scroll">
              <div className="text-2xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {counters.projects}+
              </div>
              <div className="text-blue-100 text-xs sm:text-lg font-medium">Projects Completed</div>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300 animate-on-scroll">
              <div className="text-2xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {counters.experience}+
              </div>
              <div className="text-blue-100 text-xs sm:text-lg font-medium">Years Experience</div>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300 animate-on-scroll">
              <div className="text-2xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {counters.clients}+
              </div>
              <div className="text-blue-100 text-xs sm:text-lg font-medium">Happy Clients</div>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300 animate-on-scroll">
              <div className="text-2xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {counters.warranty}
              </div>
              <div className="text-blue-100 text-xs sm:text-lg font-medium">Year Warranty</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-24 px-2 sm:px-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-2 sm:px-6">
          <div className="text-center mb-10 sm:mb-20">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive waterproofing solutions tailored to protect your property from water damage with cutting-edge technology and expert craftsmanship
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group animate-on-scroll">
                <div className="relative h-36 sm:h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                </div>
                <div className="p-4 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-3 sm:mb-6 leading-relaxed text-sm sm:text-base">{service.description}</p>
                  <ul className="space-y-2 sm:space-y-3 mb-3 sm:mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 sm:space-x-3 text-gray-700 text-xs sm:text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-300 text-xs sm:text-base">
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Works Section */}
      <section className="py-12 sm:py-24 px-2 sm:px-12 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-2 sm:px-6">
          <div className="text-center mb-10 sm:mb-20">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Our Recent <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our latest projects showcasing innovative waterproofing solutions across residential, commercial, and industrial sectors
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Featured Project */}
            <div className="lg:col-span-2 animate-on-scroll">
              <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group">
                <div className="relative h-52 sm:h-80 overflow-hidden">
                  <img 
                    src={recentWorks[activeProject].image} 
                    alt={recentWorks[activeProject].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="inline-block px-2 sm:px-3 py-1 bg-blue-500 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                      {recentWorks[activeProject].category}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{recentWorks[activeProject].title}</h3>
                    <p className="text-blue-100 text-xs sm:text-sm">{recentWorks[activeProject].location}</p>
                  </div>
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 hover:bg-white/30 transition-all duration-300">
                      <Eye className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
                <div className="p-4 sm:p-8">
                  <p className="text-gray-600 mb-3 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {recentWorks[activeProject].description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-6">
                    {recentWorks[activeProject].features.map((feature, index) => (
                      <span key={index} className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                    <span className="text-xs sm:text-sm text-gray-500">
                      Completed: {recentWorks[activeProject].completedDate}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-300 text-xs sm:text-base">
                      <span>View Details</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Project List */}
            <div className="space-y-3 sm:space-y-4 animate-on-scroll">
              {recentWorks.map((project, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    index === activeProject ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">{project.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{project.location}</p>
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-10 sm:mt-16">
            <button className="block w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg text-base sm:text-lg">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-24 px-2 sm:px-12 bg-white">
        <div className="container mx-auto px-2 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-8">
                Why Choose <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Us?</span>
              </h2>
              <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-12 leading-relaxed">
                We deliver exceptional waterproofing solutions with unmatched expertise, cutting-edge technology, and unwavering commitment to customer satisfaction.
              </p>
              <div className="space-y-4 sm:space-y-8">
                <div className="flex items-start space-x-4 sm:space-x-6 group">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-3">Licensed & Insured</h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-base">Fully licensed contractors with comprehensive insurance coverage for your complete peace of mind and protection.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 sm:space-x-6 group">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-3">Expert Team</h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-base">Skilled professionals with years of specialized experience in waterproofing, foundation repair, and advanced protection systems.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 sm:space-x-6 group">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-3">25-Year Warranty</h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-base">Industry-leading warranty coverage on all our waterproofing services and premium materials for long-lasting protection.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative animate-on-scroll mt-8 lg:mt-0">
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl sm:rounded-3xl p-6 sm:p-12 relative overflow-hidden">
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=600&fit=crop&auto=format" 
                    alt="Professional waterproofing work"
                    className="w-full h-full object-cover rounded-2xl sm:rounded-3xl opacity-20"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl sm:rounded-3xl"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-8 shadow-2xl">
                      <Shield className="w-10 h-10 sm:w-16 sm:h-16 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">Trusted Protection</h3>
                    <p className="text-gray-600 text-xs sm:text-lg leading-relaxed">Your property deserves the best protection. We deliver results that last for decades.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-blue-50 py-8 sm:py-10 px-2 sm:px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-4 sm:mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-3 sm:p-4">
                <button
                  className="w-full text-left font-semibold text-blue-700 flex justify-between items-center focus:outline-none text-sm sm:text-base"
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={expandedFAQ === idx}
                >
                  {faq.question}
                  <span className={`ml-2 transition-transform ${expandedFAQ === idx ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {expandedFAQ === idx && (
                  <div className="mt-2 text-gray-700 text-xs sm:text-sm animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              What Our <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it - hear from our satisfied customers who trust us with their most valuable assets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 animate-on-scroll">
                <div className="flex items-center mb-8">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic text-lg leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Ready to Protect Your Property?
          </h2>
          <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Get a free, no-obligation quote from our waterproofing experts today and discover how we can safeguard your most valuable investment
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3">
              <Phone className="w-6 h-6" />
              <span className="text-lg">Call Now: +91-973-1535-216</span>
            </button>
            <button className="bg-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3">
              <Mail className="w-6 h-6" />
              <span className="text-lg">Get Free Quote</span>
            </button>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }
        
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
        
        @media (max-width: 768px) {
          .text-6xl {
            font-size: 3rem;
          }
          
          .text-7xl {
            font-size: 3.5rem;
          }
          
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
        
        @media (max-width: 640px) {
          .text-4xl {
            font-size: 2rem;
          }
          
          .text-5xl {
            font-size: 2.5rem;
          }
          
          .grid-cols-2 {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}