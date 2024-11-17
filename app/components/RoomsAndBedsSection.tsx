import React from 'react'

export default function RoomsAndBedsSection() {
  return (
    <div className="rooms-and-beds-section space-y-4">
    <h2 className="room-bed-header text-xl font-semibold">Rooms & beds</h2>
    <h3 className="room-bed-header-h3 text-lg font-medium">2 bedrooms <small>(4 sleeps)</small></h3>

    <div className="bedroom flex gap-6">
      <div className="bed-1 w-1/2">
        <h5 className="font-medium">Bedroom 1</h5>
        <p>🛌🏼</p>
        <h5>1 Queen Bed</h5>
      </div>

      <div className="bed-2 w-1/2">
        <h5 className="font-medium">Bedroom 2</h5>
        <p>🛌🏼</p>
        <h5>1 Twin Bed</h5>
      </div>
    </div>

    <div className="bathroom space-y-2">
      <h3>1 bathroom</h3>
      <h5>Full Bathroom</h5>
    </div>

    <h2 className="spaces text-xl font-semibold">Spaces</h2>
    <div className="all-link">
      <a href="#" className="text-blue-600 hover:underline">See all rooms and beds details</a>
    </div>
  </div>
  )
}
