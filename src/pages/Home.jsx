import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Shield, Phone, Mail, Star, Users, Calendar, Award, ArrowRight, ChevronLeft, Eye, ExternalLink, CheckCircle } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import TestimonialsSection from './TestimonialsSection';

export default function LandingPage({ openQuoteModal }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [counters, setCounters] = useState({
    projects: 0,
    experience: 0,
    clients: 0,
    reviews: 0
  });

  // API data state
  const [heroSlides, setHeroSlides] = useState([]);
  const [servicesFromApi, setServicesFromApi] = useState([]);
  const [recentWorks, setRecentWorks] = useState([]);
  const [loadingContent, setLoadingContent] = useState(true);

  // Counter animation with cleanup
  useEffect(() => {
    const targets = { projects: 500, experience: 5, clients: 1200, reviews: 4.5 };
    const duration = 2000;
    const steps = 50;
    const stepDuration = duration / steps;

    const intervals = [];

    Object.entries(targets).forEach(([key, target]) => {
      const increment = target / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setCounters(prev => ({ 
          ...prev, 
          [key]: key === 'reviews' ? Math.round(current * 10) / 10 : Math.floor(current) 
        }));
      }, stepDuration);

      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loadingContent]);

  // Fetch homepage content with proper error handling
  useEffect(() => {
    let isCancelled = false;

    async function fetchContent() {
      try {
        const [contentRes, servicesRes, photosRes] = await Promise.all([
          fetch('https://hv-4qa2.onrender.com/api/homepage-content'),
          fetch('https://hv-4qa2.onrender.com/api/services'),
          fetch('https://hv-4qa2.onrender.com/api/project-photos')
        ]);

        if (isCancelled) return;

        const [contentJson, servicesJson, photosJson] = await Promise.all([
          contentRes.ok ? contentRes.json() : [],
          servicesRes.ok ? servicesRes.json() : [],
          photosRes.ok ? photosRes.json() : []
        ]);

        if (isCancelled) return;

        // Process hero slides
        const heroItems = (contentJson || []).filter(c => 
          (c.section || '').toLowerCase().startsWith('hero')
        );
        const slides = heroItems.map(item => ({
          title: item.title || '',
          subtitle: item.subtitle || '',
          description: item.description || '',
          image: item.image || ''
        }));

        setHeroSlides(slides.length > 0 ? slides : []);
        setServicesFromApi(Array.isArray(servicesJson) ? servicesJson : []);
        
        const works = Array.isArray(photosJson) ? photosJson : [];
        setRecentWorks(works);
        
        if (works.length === 0) {
          setActiveProject(0);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        if (!isCancelled) {
          setHeroSlides([]);
          setServicesFromApi([]);
          setRecentWorks([]);
        }
      } finally {
        if (!isCancelled) {
          setLoadingContent(false);
        }
      }
    }

    fetchContent();
    return () => { isCancelled = true; };
  }, []);

  // Hero slide auto-rotation
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Project auto-rotation
  useEffect(() => {
    if (recentWorks.length <= 1) return;
    
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % recentWorks.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [recentWorks.length]);

  // Memoized services data
  const homepageServices = useMemo(() => {
    return (servicesFromApi || []).slice(0, 4).map(s => ({
      icon: <Shield className="w-8 h-8" />,
      title: s.title,
      description: s.description,
      features: Array.isArray(s.features) ? s.features.slice(0, 3) : [],
      image: s.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop&auto=format',
      imageUrl: s.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop&auto=format',
      category: s.category || 'Waterproofing',
      _id: s._id
    }));
  }, [servicesFromApi]);

  // FAQ data
  const faqs = useMemo(() => [
    {
      question: "How long does waterproofing last?",
      answer: "Our waterproofing solutions are designed to last for decades. The longevity depends on factors like material quality, installation technique, and environmental conditions. With proper maintenance, our systems can protect your property for 30+ years."
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
      answer: "We offer warranties on our waterproofing systems. Please contact us for specific details about coverage for your project."
    },
    {
      question: "Do you use eco-friendly waterproofing materials?",
      answer: "Yes, we prioritize environmentally safe materials and offer eco-friendly waterproofing solutions including water-based membranes, bio-degradable sealants, and low-VOC coatings. These materials are safe for families, pets, and the environment while providing excellent protection."
    }
  ], []);

  // Callback functions
  const nextSlide = useCallback(() => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  const toggleFAQ = useCallback((index) => {
    setExpandedFAQ(prev => prev === index ? null : index);
  }, []);

  const handleQuoteModal = useCallback(() => {
    setShowQuoteModal(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setShowQuoteModal(false);
  }, []);

  const handleProjectClick = useCallback((index) => {
    if (recentWorks.length > 0) {
      setActiveProject(index);
    }
  }, [recentWorks.length]);

  const openServiceModal = useCallback((service) => {
    setSelectedService(service);
  }, []);

  const closeServiceModal = useCallback(() => {
    setSelectedService(null);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-lg relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-cyan-400 focus:outline-none transition-colors"
              onClick={closeQuoteModal}
              aria-label="Close modal"
            >
              ×
            </button>
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Get Free Quote</h2>
            <p className="text-gray-300 mb-6 text-center">Fill out the form and our team will get back to you soon.</p>
            <ContactForm />
          </div>
        </div>
      )}

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 overflow-y-auto py-8">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative animate-fade-in max-h-[90vh] overflow-y-auto">
            <button
              className="sticky top-0 right-0 float-right m-4 text-gray-600 hover:text-gray-900 text-3xl font-bold focus:outline-none transition-colors z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
              onClick={closeServiceModal}
              aria-label="Close service details"
            >
              ×
            </button>
            
            <div className="overflow-hidden rounded-t-2xl sm:rounded-t-3xl w-full">
              <img
                src={selectedService.imageUrl}
                alt={selectedService.title}
                className="w-full h-64 sm:h-80 object-cover rounded-t-2xl sm:rounded-t-3xl"
              />
            </div>
            
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {selectedService.title}
                </h2>
                <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                  {selectedService.category}
                </span>
              </div>
              
              <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
                {selectedService.description}
              </p>
              
              {selectedService.features && selectedService.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2 text-gray-700">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Why Choose This Service?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our expert team uses industry-leading techniques and premium materials to ensure long-lasting protection. 
                  We provide comprehensive solutions tailored to your specific needs with guaranteed results.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    closeServiceModal();
                    handleQuoteModal();
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Get Free Quote</span>
                </button>
                <button
                  onClick={() => navigate('/services')}
                  className="flex-1 bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[420px] sm:h-[700px] flex flex-col items-center justify-center overflow-hidden px-2 sm:px-0 pt-20 sm:pt-0">
        <div className="absolute inset-0 transition-opacity duration-1000">
          {heroSlides.length > 0 ? (
            <>
              <img 
                src={heroSlides[currentSlide].image} 
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-900 to-indigo-900" />
          )}
        </div>

        {heroSlides.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-2 sm:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 sm:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        <div className="relative z-10 text-center text-white px-2 sm:px-6 max-w-6xl w-full">
          {heroSlides.length > 0 && (
            <>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-6 animate-fade-in leading-tight">
                {heroSlides[currentSlide]?.title}
              </h1>
              {heroSlides[currentSlide]?.subtitle && (
                <p className="text-base xs:text-lg sm:text-xl md:text-2xl mb-2 sm:mb-6 text-blue-100 font-medium">
                  {heroSlides[currentSlide]?.subtitle}
                </p>
              )}
              {heroSlides[currentSlide]?.description && (
                <p className="text-xs xs:text-sm sm:text-lg mb-4 sm:mb-10 text-gray-200 max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-4xl mx-auto leading-relaxed">
                  {heroSlides[currentSlide]?.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center w-full">
                <button
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3 text-sm xs:text-base sm:text-lg"
                  onClick={handleQuoteModal}
                >
                  <span>Get Free Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 text-sm xs:text-base sm:text-lg">
                  <span>Learn More</span>
                </button>
              </div>
            </>
          )}
        </div>

        {heroSlides.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
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
              <div className="flex items-center justify-center gap-2 text-2xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {counters.reviews}
                <Star className="w-7 h-7 sm:w-9 sm:h-9 text-yellow-400" />
              </div>
              <div className="text-blue-100 text-xs sm:text-lg font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-24 px-2 sm:px-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-2 sm:px-6">
          <div className="text-center mb-10 sm:mb-20 animate-on-scroll">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive waterproofing solutions tailored to protect your property from water damage with cutting-edge technology and expert craftsmanship
            </p>
          </div>

          {loadingContent ? (
            <div className="text-center text-gray-500">Loading services...</div>
          ) : homepageServices.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {homepageServices.map((service, index) => (
                  <div
                    key={service._id || index}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 animate-on-scroll"
                  >
                    <div className="overflow-hidden rounded-t-2xl">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {service.description}
                      </p>
                      {service.features?.length > 0 && (
                        <ul className="text-sm text-gray-700 mb-4 space-y-1">
                          {service.features.slice(0, 2).map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-blue-600 mr-2 font-bold">✓</span>
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                          {service.features.length > 2 && (
                            <li className="text-blue-600 text-xs font-medium pl-5">
                              +{service.features.length - 2} more features
                            </li>
                          )}
                        </ul>
                      )}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                          {service.category}
                        </span>
                        <button
                          onClick={() => openServiceModal(service)}
                          className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center space-x-1 transition-colors group"
                        >
                          <span className='line-clamp-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors duration-300'>View More</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10 sm:mt-16 animate-on-scroll">
                <button
                  onClick={() => navigate("/services")}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg text-base sm:text-lg flex items-center justify-center space-x-2 mx-auto"
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">No services available at the moment.</div>
          )}
        </div>
      </section>

      {/* Recent Works Section */}
      {recentWorks.length > 0 && (
        <section className="py-12 sm:py-24 px-2 sm:px-12 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-2 sm:px-6">
            <div className="text-center mb-10 sm:mb-20 animate-on-scroll">
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
                      loading="lazy"
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
                      {recentWorks[activeProject]?.description || 'Our expert team delivers high-quality waterproofing solutions across India.'}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3 sm:mb-6">
                      {(recentWorks[activeProject]?.features || []).map((feature, index) => (
                        <span key={index} className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                      <span className="text-xs sm:text-sm text-gray-500">
                        {recentWorks[activeProject]?.completedDate ? `Completed: ${recentWorks[activeProject].completedDate}` : ''}
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
                    onClick={() => handleProjectClick(index)}
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
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 mb-1 text-sm sm:text-base truncate">{project.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 truncate">{project.location}</p>
                        <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-10 sm:mt-16 animate-on-scroll">
              <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg text-base sm:text-lg">
                View All Projects
              </button>
            </div>
          </div>
        </section>
      )}

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
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-3">Warranty</h3>
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-base">We provide warranty coverage on our waterproofing services and premium materials. Contact us for details.</p>
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
                    loading="lazy"
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
      <section className="bg-blue-50 py-8 sm:py-16 px-2 sm:px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-blue-800 mb-4 sm:mb-8 text-center animate-on-scroll">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-3 sm:p-5 animate-on-scroll"
              >
                <button
                  className="w-full text-left font-semibold text-blue-700 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded text-sm sm:text-base"
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={expandedFAQ === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="pr-4">{faq.question}</span>
                  <span className={`transition-transform duration-300 flex-shrink-0 ${expandedFAQ === idx ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedFAQ === idx && (
                  <div 
                    id={`faq-answer-${idx}`}
                    className="mt-3 text-gray-700 text-xs sm:text-sm leading-relaxed animate-fade-in"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 leading-tight animate-on-scroll">
            Ready to Protect Your Property?
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed animate-on-scroll">
            Get a free, no-obligation quote from our waterproofing experts today and discover how we can safeguard your most valuable investment
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-on-scroll">
            <a 
              href="tel:+919731535216"
              className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-base sm:text-lg">Call: +91-973-1535-216</span>
            </a>
            <button 
              onClick={handleQuoteModal}
              className="w-full sm:w-auto bg-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-base sm:text-lg">Get Free Quote</span>
            </button>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* Ensure smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Optimize image loading */
        img {
          content-visibility: auto;
        }

        /* Improve text rendering */
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        /* Line clamp utility */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Prevent layout shift */
        .container {
          max-width: 100%;
        }

        @media (min-width: 640px) {
          .container {
            max-width: 640px;
          }
        }

        @media (min-width: 768px) {
          .container {
            max-width: 768px;
          }
        }

        @media (min-width: 1024px) {
          .container {
            max-width: 1024px;
          }
        }

        @media (min-width: 1280px) {
          .container {
            max-width: 1280px;
          }
        }

        /* Accessibility improvements */
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Loading optimization */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}