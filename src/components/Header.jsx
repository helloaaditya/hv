import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png";

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Training', path: '/training'},
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export default function Header({ openQuoteModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (itemName) => {
    setActiveItem(itemName);
    closeMenu();
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="hidden lg:block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 9731535216</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Highlightventures0317@gmail.com</span>
              </div>
            </div>
            <div className="text-sm">
              <span className="opacity-90">Expert Flooring & Waterproofing Solutions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-2xl border-b border-gray-200/30 mt-0' 
          : 'bg-white/90 backdrop-blur-md lg:mt-9 mt-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group" onClick={() => handleNavClick('Home')}>
              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                  <img 
                    src={logo} 
                    alt="Highlight Ventures Logo" 
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Highlight Ventures
                </div>
                <div className="text-xs lg:text-sm text-gray-500 -mt-1">
                  Quality Flooring Solutions
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => handleNavClick(item.name)}
                  className={`relative px-4 py-3 rounded-xl font-medium text-sm xl:text-base transition-all duration-300 group ${
                    activeItem === item.name
                      ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transform scale-105' 
                      : 'text-gray-700 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                  }`}
                >
                  {item.name}
                  <span className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform transition-transform duration-300 ${
                    activeItem === item.name ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu Button */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                type="button"
                onClick={openQuoteModal}
                className="hidden sm:inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 text-sm sm:text-base"
              >
                <span className="mr-2">Get a Quote</span>
                <ChevronDown className="w-4 h-4 transform rotate-[-90deg]" />
              </button>
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 sm:p-3 rounded-full hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? 'max-h-[500px] opacity-100' 
            : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden bg-white/98 backdrop-blur-lg border-t border-gray-200/30 w-full`}> 
          <div className="px-2 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2 flex flex-col gap-1 sm:gap-2">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavClick(item.name)}
                className={`block w-full px-3 sm:px-5 py-3 sm:py-4 rounded-xl font-medium text-base sm:text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white ${
                  activeItem === item.name
                    ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg' 
                    : 'text-gray-700 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                tabIndex={0}
              >
                <div className="flex items-center justify-between w-full">
                  {item.name}
                  <ChevronDown className="w-4 h-4 transform rotate-[-90deg] opacity-50" />
                </div>
              </Link>
            ))}
            <button
              type="button"
              onClick={() => { closeMenu(); openQuoteModal(); }}
              className="block w-full mt-2 sm:mt-4 px-3 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white text-base sm:text-lg"
            >
              <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                <span>Get a Quote</span>
                <ChevronDown className="w-4 h-4 transform rotate-[-90deg]" />
              </div>
            </button>
            {/* Mobile Contact Info */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200/50 flex flex-col gap-2 sm:gap-3">
              <div className="flex items-center space-x-2 sm:space-x-3 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-xs sm:text-sm">9731535216</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Highlightventures0317@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden cursor-pointer"
          onClick={closeMenu}
          tabIndex={0}
          aria-label="Close menu overlay"
        />
      )}
    </>
  );
}