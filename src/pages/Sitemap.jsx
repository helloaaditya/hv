import React from 'react';
import { Link } from 'react-router-dom';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Training', path: '/training' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
  { name: 'Legal & Policies (PDF)', path: '/docs/legal.pdf' },
];

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-white py-22 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Sitemap</h1>
        <p className="text-gray-700 mb-8">Browse all the main pages of Highlight Ventures. Click any link to visit the page.</p>
        <ul className="space-y-4">
          {pages.map((page) => (
            <li key={page.path}>
              <a
                href={page.path}
                className="text-lg font-semibold text-blue-700 hover:text-purple-600 transition-colors duration-200 underline"
                target={page.path.endsWith('.pdf') ? '_blank' : undefined}
                rel={page.path.endsWith('.pdf') ? 'noopener noreferrer' : undefined}
              >
                {page.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 