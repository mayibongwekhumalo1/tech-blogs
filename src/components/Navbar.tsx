
"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FaRegHeart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { BsRouterFill } from "react-icons/bs";


type DropdownType = 'features' | 'categories' | 'mobile' | null;

const SuperHeader = () => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();

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
      if (!target.closest('.dropdown-container') && !target.closest('.mobile-menu-button') && !target.closest('.user-menu-container')) {
        setActiveDropdown(null);
        setIsUserMenuOpen(false);
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

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const getUserInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return 'U';
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-indigo-50 py-4'} mt-0`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-secondary">Zaira Tech Blogs</Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-secondary transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-secondary transition-colors duration-200 font-medium"
              >
                About
              </Link>
              
              <div className="relative dropdown-container">
                <button
                  onClick={() => toggleDropdown('features')}
                  className="text-gray-700 hover:text-secondary transition-colors duration-200 font-medium flex items-center"
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
                  <Link href="/features/design" className="block px-4 py-3 text-sm text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-colors">
                    Design
                  </Link>
                  <Link href="/features/development" className="block px-4 py-3 text-sm text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-colors">
                    Development
                  </Link>
                  <Link href="/features/marketing" className="block px-4 py-3 text-sm text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-colors">
                    Marketing
                  </Link>
                </div>
              </div>
              
              <div className="relative dropdown-container">
                <button
                  onClick={() => toggleDropdown('categories')}
                  className="text-gray-700 hover:text-secondary transition-colors duration-200 font-medium flex items-center"
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
                  <Link href="/category/javascript" className="block px-4 py-3 text-sm text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-colors">
                    JavaScript
                  </Link>
                  <Link href="/category/react" className="block px-4 py-3 text-sm text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-colors">
                    React
                  </Link>
                  <Link href="/category/nodejs" className="block px-4 py-3 text-sm text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-colors">
                    Node.js
                  </Link>
                  <Link href="/category/python" className="block px-4 py-3 text-sm text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-colors">
                    Python
                  </Link>
                </div>
              </div>
              
              <Link
                href="/contact"
                className="text-gray-700 hover:text-secondary transition-colors duration-200 font-medium"
              >
                Contact
              </Link>
            </nav>

            {/* Right side icons and button */}
            <div className="flex items-center space-x-2">
              {/* Flag icon */}
              <button
                className="text-gray-600 hover:text-secondary transition-colors p-2 rounded-full hover:bg-secondary/10"
                aria-label="Language selection"
              >
                <FaRegHeart />
              </button>
              
              {/* Search icon */}
              <button
                className="text-gray-600 hover:text-secondary transition-colors p-2 rounded-full hover:bg-secondary/10"
                aria-label="Search"
              >
                <BsRouterFill />
              </button>
              
              {/* User menu or Sign In button */}
              {session?.user ? (
                <div className="relative user-menu-container">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 bg-accent text-white px-3 py-2 rounded-lg text-md hover:bg-accent/80 transition-colors"
                    aria-expanded={isUserMenuOpen}
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-semibold">
                      {getUserInitials(session.user.name, session.user.email)}
                    </div>
                  </button>

                  {/* User dropdown menu */}
                  <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 transition-all duration-300 transform origin-top-right ${isUserMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{session.user.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{session.user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/auth/signin" className="flex space-x-2.5 items-center bg-accent text-white px-4 py-2 rounded-lg text-md hover:bg-accent/80">
                  <FaRegUserCircle className='mx-2' />
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="mobile-menu-button text-gray-600 hover:text-secondary p-2 rounded-full hover:bg-secondary/10 transition-colors"
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
              className="block py-3 px-4 text-gray-700 hover:bg-secondary/10 hover:text-secondary rounded-lg transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block py-3 px-4 text-gray-700 hover:bg-secondary/10 hover:text-secondary rounded-lg transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            
            <button
              onClick={() => toggleDropdown('features')}
              className="flex items-center justify-between w-full py-3 px-4 text-gray-700 hover:bg-secondary/10 hover:text-secondary rounded-lg transition-colors font-medium"
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
                className="block py-2 text-gray-600 hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Design
              </Link>
              <Link
                href="/features/development"
                className="block py-2 text-gray-600 hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Development
              </Link>
              <Link
                href="/features/marketing"
                className="block py-2 text-gray-600 hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Marketing
              </Link>
            </div>
            
            <button
              onClick={() => toggleDropdown('categories')}
              className="flex items-center justify-between w-full py-3 px-4 text-gray-700 hover:bg-secondary/10 hover:text-secondary rounded-lg transition-colors font-medium"
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
                className="block py-2 text-gray-600 hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                JavaScript
              </Link>
              <Link
                href="/category/react"
                className="block py-2 text-gray-600 hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                React
              </Link>
              <Link
                href="/category/nodejs"
                className="block py-2 text-gray-600 hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Node.js
              </Link>
              <Link
                href="/category/python"
                className="block py-2 text-gray-600 hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Python
              </Link>
            </div>
            
            <Link
              href="/contact"
              className="block py-3 px-4 text-gray-700 hover:bg-secondary/10 hover:text-secondary rounded-lg transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile user menu */}
            {session?.user ? (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-sm font-semibold text-accent">
                      {getUserInitials(session.user.name, session.user.email)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{session.user.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{session.user.email}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Link
                  href="/auth/signin"
                  className="block py-3 px-4 text-center bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Add padding to the top of the page content to account for fixed header */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
};

export default SuperHeader;