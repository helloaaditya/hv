import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, Phone, Mail, Star, CheckCircle, Users, Calendar, Award, ArrowRight, ChevronLeft, Plus, Minus, Eye, ExternalLink } from 'lucide-react';

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [counters, setCounters] = useState({
    projects: 0,
    experience: 0,
    clients: 0,
    warranty: 0
  });

  // Counter animation
  useEffect(() => {
    const targets = { projects: 500, experience: 15, clients: 1200, warranty: 25 };
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
      name: "Sarah Johnson",
      role: "Homeowner",
      content: "AquaShield Pro transformed our basement from a damp, unusable space into a dry, comfortable area. Their team was professional and the results exceeded our expectations.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616c04c107f?w=100&h=100&fit=crop&auto=format"
    },
    {
      name: "Michael Chen",
      role: "Property Manager",
      content: "We've used AquaShield Pro for multiple commercial properties. Their expertise and reliability make them our go-to waterproofing contractor.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format"
    },
    {
      name: "Emma Rodriguez",
      role: "Business Owner",
      content: "The team solved our persistent water issues with innovative solutions. The warranty and follow-up service give us complete peace of mind.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format"
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
      {/* Hero Section */}
      <section className="relative h-[420px] sm:h-180 flex items-center justify-center overflow-hidden px-2 sm:px-0">
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
        <div className="relative z-10 text-center text-white px-2 sm:px-6 max-w-6xl">
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in leading-tight">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-base sm:text-xl md:text-2xl mb-4 sm:mb-6 text-blue-100 font-medium">
            {heroSlides[currentSlide].subtitle}
          </p>
          <p className="text-sm sm:text-lg mb-6 sm:mb-10 text-gray-200 max-w-2xl sm:max-w-4xl mx-auto leading-relaxed">
            {heroSlides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center">
            <button className="block w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3 text-base sm:text-lg">
              <span>Get Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="block w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 text-base sm:text-lg">
              <span>Learn More</span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
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
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1558618666-fbd19c830cd4?w=1200&h=600&fit=crop&auto=format" 
            alt="Contact us"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
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
      <style jsx>{`
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