"use client";

import { useState } from 'react';

export default function Pagination() {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ["Overview", "Amenities", "Policies"];
    return (
        <div className="container mx-auto px-4">
        <div className="pagination-container flex justify-start gap-4 border-b-2 border-gray-300">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab px-5 py-2 text-base cursor-pointer 
                ${
                  activeTab === index
                    ? "text-blue-600 font-medium border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-500"
                }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
    )
}
