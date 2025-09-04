// components/SuperHeader.tsx
"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

type DropdownType = 'features' | 'categories' | 'mobile' | null;

const SuperHeader = () => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;
      
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container') && !target.closest('.mobile-menu-button')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleDropdown = (name: DropdownType) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (activeDropdown) setActiveDropdown(null);
  };

  return (
    <>
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-gradient-to-r from-blue-50 to-indigo-50 py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">Zaira Tech Blogs</Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                About
              </Link>
              
              <div className="relative dropdown-container">
                <button 
                  onClick={() => toggleDropdown('features')}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center"
                  aria-expanded={activeDropdown === 'features'}
                >
                  Features
                  <svg 
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${activeDropdown === 'features' ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className={`absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 transition-all duration-300 transform origin-top ${activeDropdown === 'features' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <Link href="/features/design" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Design
                  </Link>
                  <Link href="/features/development" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Development
                  </Link>
                  <Link href="/features/marketing" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Marketing
                  </Link>
                </div>
              </div>
              
              <div className="relative dropdown-container">
                <button 
                  onClick={() => toggleDropdown('categories')}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center"
                  aria-expanded={activeDropdown === 'categories'}
                >
                  Categories
                  <svg 
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${activeDropdown === 'categories' ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className={`absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 transition-all duration-300 transform origin-top ${activeDropdown === 'categories' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <Link href="/category/javascript" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    JavaScript
                  </Link>
                  <Link href="/category/react" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    React
                  </Link>
                  <Link href="/category/nodejs" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Node.js
                  </Link>
                  <Link href="/category/python" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    Python
                  </Link>
                </div>
              </div>
              
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Contact
              </Link>
            </nav>

            {/* Right side icons and button */}
            <div className="flex items-center space-x-4">
              {/* Flag icon */}
              <button 
                className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50"
                aria-label="Language selection"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </button>
              
              {/* Search icon */}
              <button 
                className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Sign In button */}
              <Link href="/auth/signin" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg">
                Sign In
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="mobile-menu-button text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div className={`lg:hidden bg-white shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link
              href="/"
              className="block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            
            <button 
              onClick={() => toggleDropdown('features')}
              className="flex items-center justify-between w-full py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
              aria-expanded={activeDropdown === 'features'}
            >
              Features
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'features' ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`pl-6 space-y-1 overflow-hidden transition-all duration-300 ${activeDropdown === 'features' ? 'max-h-40' : 'max-h-0'}`}>
              <Link 
                href="/features/design" 
                className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Design
              </Link>
              <Link 
                href="/features/development" 
                className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Development
              </Link>
              <Link 
                href="/features/marketing" 
                className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Marketing
              </Link>
            </div>
            
            <button 
              onClick={() => toggleDropdown('categories')}
              className="flex items-center justify-between w-full py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
              aria-expanded={activeDropdown === 'categories'}
            >
              Categories
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'categories' ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`pl-6 space-y-1 overflow-hidden transition-all duration-300 ${activeDropdown === 'categories' ? 'max-h-40' : 'max-h-0'}`}>
              <Link
                href="/category/javascript"
                className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                JavaScript
              </Link>
              <Link
                href="/category/react"
                className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                React
              </Link>
              <Link
                href="/category/nodejs"
                className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Node.js
              </Link>
              <Link
                href="/category/python"
                className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Python
              </Link>
            </div>
            
            <Link 
              href="/contact" 
              className="block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </header>
      
      {/* Add padding to the top of the page content to account for fixed header */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
};

export default SuperHeader;