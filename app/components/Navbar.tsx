"use client";

import { useState, useEffect } from "react";
import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("US");
  const [regionText, setRegionText] = useState("United States");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  // Temporary state to hold changes before saving
  const [tempRegion, setTempRegion] = useState("US");
  const [tempCurrency, setTempCurrency] = useState("USD");

  const regionCurrencyMapping: Record<
    string,
    { regionText: string; currency: string }
  > = {
    US: { regionText: "United States", currency: "USD" },
    ES: { regionText: "Spain", currency: "EURO" },
    UK: { regionText: "United Kingdom", currency: "GBP" },
    DE: { regionText: "Germany", currency: "EURO" },
  };

  useEffect(() => {
    const savedRegion = localStorage.getItem("selectedRegion");
    const savedRegionText = localStorage.getItem("regionText");
    const savedCurrency = localStorage.getItem("selectedCurrency");

    setSelectedRegion(savedRegion || "US");
    setRegionText(savedRegionText || "United States");
    setSelectedCurrency(savedCurrency || "USD");
  }, []);

  const handleRegionChange = (region: string) => {
    // Update only the temporary state without saving to localStorage
    setTempRegion(region);
    setTempCurrency(regionCurrencyMapping[region].currency);
  };

  const saveRegion = () => {
    // Save the selected region and currency to the main state and localStorage
    setSelectedRegion(tempRegion);
    setRegionText(regionCurrencyMapping[tempRegion].regionText);
    setSelectedCurrency(tempCurrency);

    localStorage.setItem("selectedRegion", tempRegion);
    localStorage.setItem("regionText", regionCurrencyMapping[tempRegion].regionText);
    localStorage.setItem("selectedCurrency", tempCurrency);

    // Close the modal after saving
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex md:flex-row-reverse justify-between items-center p-4">
          {/* Left Side Links */}
          <div className="flex items-center space-x-6">
            {/* Globe Icon and Region Text */}
            <a
              href="#"
              className={`flex items-center text-gray-600 hover:text-gray-800 ${
                isModalOpen ? "pointer-events-none" : ""
              }`}
              onClick={() => {
                if (!isModalOpen) {
                  setIsModalOpen(true); // Open modal when clicking the globe icon
                }
              }}
            >
              <i className="fa-solid fa-globe"></i>
              &nbsp;{regionText}
            </a>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Trip Boards
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                List your property
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Help
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                My trips
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Sign in
              </a>
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
        {isOpen && !isModalOpen && (
          <div className="md:hidden bg-white shadow-md z-10">
            <div className="space-y-2 p-4">
              <a href="#" className="block text-gray-600 hover:text-gray-800">
                Trip Boards
              </a>
              <a href="#" className="block text-gray-600 hover:text-gray-800">
                List your property
              </a>
              <a href="#" className="block text-gray-600 hover:text-gray-800">
                Help
              </a>
              <a href="#" className="block text-gray-600 hover:text-gray-800">
                My trips
              </a>
              <a href="#" className="block text-gray-600 hover:text-gray-800">
                Sign in
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Region and Currency Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Select Region and Currency</h2>

            {/* Region Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Region</label>
              <select
                value={tempRegion} // Use the temporary state
                onChange={(e) => handleRegionChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="US">United States</option>
                <option value="ES">Spain</option>
                <option value="UK">United Kingdom</option>
                <option value="DE">Germany</option>
              </select>
            </div>

            {/* Currency Display */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Currency</label>
              <input
                type="text"
                value={tempCurrency} // Use the temporary state
                disabled
                className="w-full p-2 border border-gray-300 rounded bg-gray-200"
              />
            </div>

            {/* Save and Close Buttons */}
            <div className="flex justify-between">
              <button
                onClick={saveRegion}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
