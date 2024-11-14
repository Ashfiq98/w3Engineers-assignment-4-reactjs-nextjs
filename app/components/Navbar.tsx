// Navbar.tsx
"use client";

import { useState } from 'react';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md new-nav">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left Side Links */}
        <div className="flex items-center space-x-4">
          <a href="#" className="flex items-center text-gray-600 hover:text-gray-800">
          <i className="fa-solid fa-globe"></i>
            &nbsp;United States
          </a>
          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">Trip Boards</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">List your property</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Help</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">My trips</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Sign in</a>
          </div>
        </div>

        {/* Right Side Menu Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
          <i className="fa-solid fa-user"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="space-y-2 p-4">
            <a href="#" className="block text-gray-600 hover:text-gray-800">Trip Boards</a>
            <a href="#" className="block text-gray-600 hover:text-gray-800">List your property</a>
            <a href="#" className="block text-gray-600 hover:text-gray-800">Help</a>
            <a href="#" className="block text-gray-600 hover:text-gray-800">My trips</a>
            <a href="#" className="block text-gray-600 hover:text-gray-800">Sign in</a>
          </div>
        </div>
      )}
    </nav>
  );
}
