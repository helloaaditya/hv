import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Training from './pages/Training';
import Admin from './pages/Admin';
import ContactForm from './components/ContactForm';
import WhatsAppWidget from './components/WhatsAppWidget';
import Sitemap from './pages/Sitemap';

function App() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const openQuoteModal = () => setShowQuoteModal(true);
  const closeQuoteModal = () => setShowQuoteModal(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header openQuoteModal={openQuoteModal} />
      {/* WhatsApp Widget */}
      <WhatsAppWidget />
      {/* Global Get Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-lg relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-cyan-400 focus:outline-none"
              onClick={closeQuoteModal}
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
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home openQuoteModal={openQuoteModal} />} />
          <Route path="/services" element={<Services openQuoteModal={openQuoteModal} />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/training" element={<Training />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/sitemap" element={<Sitemap />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
