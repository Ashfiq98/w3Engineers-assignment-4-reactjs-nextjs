"use client";
import { useState } from "react";

// Define props for the Header component
interface HeaderProps {
  images?: string[];
  title?: string; // Optional prop for images
}

export default function Header({ images, title }: HeaderProps) {
  // Static fallback images
  const defaultImages = [
    "./images/header-1.jpg",
    "./images/header-4.jpg",
    "./images/header-3.jpg",
    "./images/header-2.jpeg",
    "./images/header-7.jpg",
    "./images/header-3.jpg",
    "./images/header-2.jpeg",
    "./images/header-7.jpg"
  ];

  // Use images from props or fallback to default
  const activeImages = images && images.length > 0 ? images : defaultImages;
  const defaultTitle = "Juneau Vacation Home: Stunning View + Beach Access";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Modal handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Carousel navigation
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % activeImages.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + activeImages.length) % activeImages.length);

  // Calculate the number of remaining images
  const remainingImagesCount = activeImages.length - 5;

  return (
    <div className="container mx-auto px-4">
      {/* Grid container for larger screens */}
      <div className="hidden md:grid grid-cols-12 gap-2">
        {/* Single Photo Section */}
        <div className="col-span-6">
          <div className="relative h-100 w-full">
            <img
              src={activeImages[0]}
              alt="Main Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Four Photos Section */}
        <div className="col-span-6 grid grid-cols-2 gap-2">
          {activeImages.slice(1, 5).map((image, index) => (
            <div key={index} className="relative h-50 w-full">
              <img
                src={image}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              {index === 3 && remainingImagesCount > 0 && (
                <button
                  onClick={openModal}
                  className="absolute bottom-2 right-2 bg-black text-white py-2 px-4 rounded-full"
                >
                  {remainingImagesCount}+ <i className="fa-regular fa-images"></i>
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
            src={activeImages[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex justify-between items-center">
            {/* Prev Button */}
            <button
              onClick={prevSlide}
              className="bg-black text-white p-2 rounded-full z-10"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="bg-black text-white p-2 rounded-full z-10"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}

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
            <div className="relative h-80 w-full">
              <img
                src={activeImages[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex justify-between items-center">
                {/* Prev Button */}
                <button
                  onClick={prevSlide}
                  className="bg-black text-white p-2 ml-2 rounded z-10"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                {/* Next Button */}
                <button
                  onClick={nextSlide}
                  className="bg-black text-white p-2 mr-2 rounded z-10"
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
            {/* Image Information */}
            <div className="mt-4 flex justify-between items-center">
              {/* Title on the left */}
              <p className="text-gray-500 text-sm">
                {`${title || defaultTitle}`}
              </p>
              {/* Image number on the right */}
              <p className="text-gray-700">
                <strong>{currentSlide + 1}</strong> of <strong>{activeImages.length}</strong>
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
