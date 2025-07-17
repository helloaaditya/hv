import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WHATSAPP_NUMBER = '919731535216'; // Change to your company WhatsApp number
const COMPANY_NAME = 'Highlight Ventures';
const DEFAULT_MESSAGE = `Hi, welcome to ${COMPANY_NAME}! I would like to know more about your services.`;

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  const handleChat = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`,
      '_blank'
    );
  };

  return (
    <div className="fixed bottom-25 right-6 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-3 w-80 max-w-xs bg-white rounded-2xl shadow-2xl p-5 animate-fade-in border border-green-200">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-green-700 text-lg">WhatsApp Chat</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-red-500 text-xl font-bold focus:outline-none" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mb-3">
            <p className="text-gray-700 font-semibold mb-1">Hi, welcome to <span className="text-green-700">{COMPANY_NAME}</span>!</p>
            <p className="text-gray-600">We're glad to have you here. How can we help you today?</p>
          </div>
          <button
            onClick={handleChat}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow transition duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.617h-.001a9.87 9.87 0 01-4.988-1.358l-.361-.214-3.709.982.991-3.617-.235-.372A9.86 9.86 0 012.1 12.045C2.073 6.92 6.92 2.073 12.047 2.073c2.654 0 5.151 1.037 7.027 2.917a9.825 9.825 0 012.924 7.017c-.003 5.127-4.85 9.974-9.947 9.974zm8.413-18.387A11.815 11.815 0 0012.047 0C5.495 0 .047 5.447.073 12.087c.021 2.13.558 4.21 1.601 6.077L.057 24l6.065-1.625a11.915 11.915 0 005.924 1.523h.005c6.551 0 11.999-5.447 12.001-12.088a11.86 11.86 0 00-3.497-8.395z"/></svg>
            Chat on WhatsApp
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen(true)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center focus:outline-none border-4 border-white"
        aria-label="Open WhatsApp Chat"
        style={{ boxShadow: '0 4px 24px 0 rgba(37, 211, 102, 0.25)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.617h-.001a9.87 9.87 0 01-4.988-1.358l-.361-.214-3.709.982.991-3.617-.235-.372A9.86 9.86 0 012.1 12.045C2.073 6.92 6.92 2.073 12.047 2.073c2.654 0 5.151 1.037 7.027 2.917a9.825 9.825 0 012.924 7.017c-.003 5.127-4.85 9.974-9.947 9.974zm8.413-18.387A11.815 11.815 0 0012.047 0C5.495 0 .047 5.447.073 12.087c.021 2.13.558 4.21 1.601 6.077L.057 24l6.065-1.625a11.915 11.915 0 005.924 1.523h.005c6.551 0 11.999-5.447 12.001-12.088a11.86 11.86 0 00-3.497-8.395z"/></svg>
      </button>
    </div>
  );
} 