import React from 'react'

export default function ExploreAreaSection() {
  return (
    <div className="explore-area-section space-y-4">
    <h2 className="explore-area-header text-xl font-semibold">Explore the area</h2>

    <div className="explore flex gap-6">
      <div className="explore-card w-1/2">
        <div className="card-image">
          <img src="./resources/dhaka-map.png" alt="Map" className="w-full h-auto" />
        </div>
        <div className="card-content">
          <h4 className="card-title text-lg font-medium">Dhaka, Bangladesh</h4>
          <div className="all-link">
            <a href="#" className="text-blue-600 hover:underline">view in map</a>
          </div>
        </div>
      </div>

      <div className="text w-1/2">
        <div className="location-item flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>Auke Bay</span>
        </div>

        <div className="location-item flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>University of Alaska-Southeast</span>
        </div>

        <div className="location-item flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>Mendenhall Golf Course</span>
        </div>

        <div className="location-item flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
            <path d="M16 8L8 16" />
            <path d="M8 8l8 8" />
          </svg>
          <span>Juneau, AK (JNU-Juneau Intl.)</span>
        </div>
      </div>
    </div>

    <a href="#" className="see-all-link text-blue-600 hover:underline">See more about this area &gt;</a>
  </div>
  )
}
