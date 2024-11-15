"use client";
import React, { useState } from "react";

export default function Header() {
  const images = [
    "./images/header-1.jpg",
    "./images/header-4.jpg",
    "./images/header-3.jpg",
    "./images/header-5.jpg",
    "./images/header-6.jpeg",
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Grid container for larger screens */}
      <div className="hidden md:grid grid-cols-12 gap-4">
        {/* Single Photo Section */}
        <div className="col-span-6">
          <div className="relative h-80 w-full">
            <img
              src={images[0]}
              alt="Main Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Four Photos Section */}
        <div className="col-span-6 grid grid-cols-2 gap-4">
          {images.slice(0, 4).map((image, index) => (
            <div key={index} className="relative h-40 w-full">
              <img
                src={image}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              {index === 3 && (
                <button
                  onClick={openModal}
                  className="absolute bottom-2 right-2 bg-black text-white py-2 px-4 rounded-full"
                >
                  30+ <i className="fa-regular fa-images"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Carousel for Small Screens */}
      <div className="block md:hidden">
        <div className="relative h-80 w-full">
          <img
            src={images[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex justify-between items-center">
            <button
              onClick={prevSlide}
              className="bg-black text-white p-2 rounded-full"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
              onClick={nextSlide}
              className="bg-black text-white p-2 rounded-full"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-3xl mx-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-2xl text-gray-600"
            >
              &times;
            </button>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="h-40 w-full">
                  <img
                    src={image}
                    alt={`Modal Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
