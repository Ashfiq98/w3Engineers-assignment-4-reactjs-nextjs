"use client";
import { useEffect, useState } from "react";
interface HotelData {
  hotelId: string;
  slug: string;
  images: string[];
  title: string;
  description: string;
  guestCount: number;
  bedroomCount: number;
  bathroomCount: number;
  amenities: string[];
  host: {
    name: string;
    contact: string;
  };
  address: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  rooms: {
    hotelSlug: string;
    roomSlug: string;
    roomImages: string[];
    roomTitle: string;
    bedroomCount: number;
  }[];
}
interface AmenitiesProps {
  HotelData?: HotelData;
}

export default function Amenities({ HotelData }: AmenitiesProps) {

  const handleOpenMap = () => {
    // const mapUrl = `https://www.google.com/maps?q=${HotelData.coordinates.latitude},${HotelData.coordinates.longitude}`;
    const mapUrl = "https://maps.app.goo.gl/dgpJmYFtuWeWjxoFA";
    // const mapUrl=`https://www.google.com/maps`;
    window.open(mapUrl, "_blank");
  };
  // Amenities 
  const amenities = HotelData?.amenities || [];

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [adultCount, setAdultCount] = useState<number>(0);
  const [childCount, setChildCount] = useState<number>(0);

  useEffect(() => {
    // Load traveler counts from localStorage
    const storedAdultCount = parseInt(localStorage.getItem("adultCount") || "0");
    const storedChildCount = parseInt(localStorage.getItem("childCount") || "0");
    setAdultCount(storedAdultCount);
    setChildCount(storedChildCount);
  }, []);

  const handleTravelerChange = (type: "adult" | "child", action: "increment" | "decrement") => {
    if (type === "adult") {
      const newCount = action === "increment" ? adultCount + 1 : Math.max(adultCount - 1, 0);
      setAdultCount(newCount);
      localStorage.setItem("adultCount", newCount.toString());
    } else if (type === "child") {
      const newCount = action === "increment" ? childCount + 1 : Math.max(childCount - 1, 0);
      setChildCount(newCount);
      localStorage.setItem("childCount", newCount.toString());
    }
  };

  const handleDone = () => {
    const totalTravelers = adultCount + childCount;
    localStorage.setItem("totalTravelers", totalTravelers.toString());
    setModalVisible(false);
  };
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Main Content */}
      <div className="flex-grow">
        {/* Header */}
        <div className="mb-6">
          <h4 className="text-sm text-gray-600 mb-2">Entire home</h4>
          <h1 className="text-2xl font-bold mb-4">{HotelData?.title || "Juneau Vacation Home: Stunning View + Beach"}</h1>

          <div className="flex items-center gap-4 mb-4">
            <button className="bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center">
              9.8 &nbsp; <i className="fa-solid fa-star"></i>
            </button>
            <span className="text-gray-700">Exceptional</span>
          </div>

          <a href="#" className="text-blue-600 hover:underline">See all reviews <i className="fa solid fa "></i></a>
        </div>

        {/* Essential Amenities */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏠</span>
              <span>{HotelData?.bedroomCount || "2"} bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">👥</span>
              <span>Sleep {HotelData?.guestCount || "4"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🚾</span>
              <span>{HotelData?.bathroomCount || "1"} bathroom</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📏</span>
              <span>1155 sq ft</span>
            </div>
          </div>

          <h2 className="font-semibold text-lg mb-4">Popular Amenities</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🍖</span>
              <span>Barbecue grill</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🚿</span>
              <span>Washer</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏕</span>
              <span>Outdoor Space</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🚗</span>
              <span>Parking available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🍽️</span>
              <span>Kitchen</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🌡</span>
              <span>Dryer</span>
            </div>
          </div>

          <a href="#" className="text-blue-600 hover:underline block mt-4">See all amenities &gt;</a>
        </div>

        {/* Explore Area */}
        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-4">Explore the area</h2>
          <div className="flex gap-8">
            <div className="w-1/3">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img src="./images/dhaka-map.png" alt="Area map" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="font-medium mb-2">Dhaka, Bangladesh</h4>
                  <a href="#" onClick={handleOpenMap} className="text-blue-600 hover:underline">view in map</a>
                </div>
              </div>
            </div>

            <div className="w-1/3">
              <div className="space-y-4">
                {['Auke Bay', 'University of Alaska-Southeast', 'Mendenhall Golf Course', 'Juneau, AK (JNU-Juneau Intl.)'].map((location) => (
                  <div key={location} className="flex items-center gap-2">
                    {/* <MapPin className="w-5 h-5" /> */}
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{location}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-1/3">
              <div className="space-y-4">
                {['6 minutes drive', '10 minutes drive', '14 minutes drive', '14 minutes drive'].map((time, index) => (
                  <p key={index} className="text-gray-600">{time}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rooms and Beds */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Rooms & Beds</h2>
          <h3 className="text-lg font-semibold mb-2">
            {HotelData?.rooms.length} Bedrooms <small className="text-sm text-gray-600">({HotelData?.guestCount} sleeps)</small>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 rounded-md shadow-md">
              <h5 className="font-bold text-lg">Bedroom 1</h5>
              <p className="text-3xl my-2">🛌🏼</p>
              <h5 className="text-md text-gray-700">1 Queen Bed</h5>
            </div>
            <div className="p-4 bg-gray-100 rounded-md shadow-md">
              <h5 className="font-bold text-lg">Bedroom 2</h5>
              <p className="text-3xl my-2">🛌🏼</p>
              <h5 className="text-md text-gray-700">1 Twin Bed</h5>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">1 Bathroom</h3>
            <h5 className="text-md text-gray-700">Full Bathroom</h5>
          </div>
        </div>

        {/* Spaces */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Spaces</h2>
          <div className="space-y-2">
            <div className="flex items-center text-gray-800">
              🚿&nbsp;<span>Washer</span>
            </div>
            <div className="flex items-center text-gray-800">
              🚗&nbsp;<span>Parking available</span>
            </div>
            <div className="flex items-center text-gray-800">
              🌡&nbsp;<span>Dryer</span>
            </div>
          </div>
          <a href="#" className="text-blue-500 underline text-sm mt-4 block">
            See all rooms and beds details &gt;
          </a>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🏡</span>
              <span>Deck or patio</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🍳</span>
              <span>Kitchen</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🏊</span>
              <span>Balcony</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌳</span>
              <span>Garden</span>
            </div>
          </div>
          <a href="#" className="text-blue-500 underline text-sm">
            See all rooms and beds details &gt;
          </a>
        </div>

        {/* about  */}

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About this property</h2>
          <h3 className="text-lg font-semibold mb-4">
            {HotelData?.title || "Juneau Vacation Home: Stunning View + Beach"}
          </h3>
          <div className="bg-gray-100 p-4 text-gray-800 rounded-md text-sm font-sans leading-relaxed whitespace-pre-wrap">
            {`${HotelData?.description || "Escape to the mountains and experience the great outdoors at this lovely Juneau Vacation rental"} ! Perched on the shore of Lena Cove,
 this 2-bedroom, 1-bath home is the perfect getaway for those looking to enjoy a relaxing retreat surrounded by nature.
 Spend your day fishing for King Salmon, exploring Lena Beach and the rocky coastline, or hiking the nearby trails. 
 After your outdoor adventure, kick
 back on the private deck and admire the breathtaking panoramic views!

--THE PROPERTY--

CBJ1000104    | 1,115 Sq Ft | 2 Private Decks | Lena Cove & Mountain Views | 2 Bicycles Provided

Bedroom 1:    ${HotelData?.rooms[0].roomTitle || "Queen Bed, Full Floor Mattress"}

Bedroom 2:   ${HotelData?.rooms[1].roomTitle || "Extra Long Twin Bed"}
                
HOME HIGHLIGHTS: Flat-screen TV, dining table, washer/dryer
KITCHEN: Fridge, stove, coffee maker, microwave, cooking basics, toaster, dishware/flatware, trash bags/paper towels, Crockpot
GENERAL: Free WiFi, central heating, linens/towels, keyless entry, hair dryer, ceiling fans
FAQ: No A/C, stairs required to access
PARKING: Driveway (2 vehicles), RV parking allowed
                
--THE LOCATION--

${(HotelData?.address) ||
              `GREAT OUTDOORS: Lena Cove (on-site), Lena Beach Recreation Area (0.5 miles), Glacier Gardens Rainforest Adventure (10 miles),
 Mendenhall Glacier (10 miles), Twin Lakes (13 miles)
THINGS TO DO: Mendenhall Golf (8 miles), Dimond Park Aquatic Center (8 miles),
 Riverside Rotary Park (8 miles), Alaska State Museum (16 miles), Last Chance Mining Museum (18 miles), AJ Mine Gastineau Mill Tours (20 miles)
LOCAL FARE: Forbidden Peak Brewery (5 miles), The Grind Coffee Company (7 miles), Four Plates Cocina Peruana (7 miles), 
Sandbar & Grill (7 miles), Zerelda's Bistro (8 miles), Donna's Restaurant (9 miles), Alaskan Brewing Co. (13 miles)
AIRPORT: Juneau International Airport (9 miles)`}
                
--REST EASY WITH US--

Evolve makes it easy to find and book properties you'll never want to leave. You can relax knowing that our properties
 will always be ready for you and that we'll answer the phone 24/7. Even better, if anything is off about your stay, 
 we'll make it right. You can count on our homes and our people to make you feel welcome--because we know what vacation means to you.
                
--POLICIES--

- No smoking
- No pets allowed
- No events, parties, or large gatherings
- Must be at least 25 years old to book
- Additional fees and taxes may apply
- Photo ID may be required upon check-in
- NOTE: The property requires stairs to access
- NOTE: The property does not have air conditioning
- NOTE: The property sleeps 3 guests in 2 beds, with room for 4 total by using the full floor mattress`}
          </div>
        </div>


        {/* property manager */}

        <div className="manager-section flex flex-col items-center text-center mb-6">
          <div className="manager-icon mb-2">
            <img
              src="./images/property-logo.png"
              alt="Property Manager Logo"
              className="w-12 h-12"
            />
          </div>
          <div className="font-semibold text-gray-700">Property Manager</div>
          <div className="font-bold text-blue-600">{HotelData?.host.name}</div>
        </div>

        <div className="languages mb-6">
          <h2 className="text-lg font-bold mb-2 text-gray-800 ">Languages</h2>
          <div className="language-list text-gray-800">
            English, French, German, Spanish
          </div>
        </div>
        <a
          href="#"
          className="see-all-link text-blue-500 underline text-sm block mb-6"
        >
          See more...
        </a>
        {/* summary*/}
        <div className="amenities">
          <h2 className="text-lg font-bold mb-4">Amenities</h2>
          <div className="amenities-grid grid grid-cols-2 sm:grid-cols-2 gap-4">
            {amenities?.length > 0 ?
              (amenities?.map((amenity, index) => (
                <div key={index} className="amenity-item flex items-center gap-2">
                  <div className="feature-icon text-2xl">🍳</div>
                  <span className="text-gray-800">{amenity}</span>
                </div>
              ))) : (
                <div className="amenity-item flex items-center gap-2">
                  <div className="feature-icon text-2xl">🍳</div>
                  <span className="text-gray-800">Dryer</span>
                  <div className="amenity-item flex items-center gap-2">
                    <div className="feature-icon text-2xl">🌊</div>
                    <span className="text-gray-800">Washer</span>
                  </div>
                  <div className="amenity-item flex items-center gap-2">
                    <div className="feature-icon text-2xl">🔥</div>
                    <span className="text-gray-800">Dryer</span>
                  </div>
                  <div className="amenity-item flex items-center gap-2">
                    <div className="feature-icon text-2xl">🏖️</div>
                    <span className="text-gray-800">Outdoor Space</span>
                  </div>
                  <div className="amenity-item flex items-center gap-2">
                    <div className="feature-icon text-2xl">🅿️</div>
                    <span className="text-gray-800">Parking available</span>
                  </div>
                  <div className="amenity-item flex items-center gap-2">
                    <div className="feature-icon text-2xl">🏔️</div>
                    <span className="text-gray-800">Ocean view</span>
                  </div>
                </div>
              )}
          </div>
        </div>
        <a
          href="#"
          className="see-all-amenities text-blue-500 underline text-sm block mt-4"
        >
          See all 34 amenities
        </a>
      </div>

      {/* Booking Card */}
      <div className="p-4 border rounded-md shadow-md bg-white">
        {/* Member Banner */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-2 h-2 bg-gray-400 rounded-full"></div>
              ))}
            </div>
            <span className="text-gray-700">Members get our best prices when signed in!</span>
          </div>
          <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Sign in
          </button>
        </div>

        {/* Booking Card */}
        <div>
          <div className="text-lg font-bold">$134 <span className="text-sm font-normal">per night</span></div>
          <div className="mt-2 text-sm text-gray-600">
            ✓ Free cancellation <span className="text-gray-400">Before Mon, Nov 4</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">✓ Your dates are available</div>

          {/* Date Picker */}
          <div className="flex justify-between gap-4 mt-4">
            <div className="p-2 border rounded-md">
              <small className="block text-xs text-gray-500">Start date</small>
              <div>Nov 18</div>
            </div>
            <div className="p-2 border rounded-md">
              <small className="block text-xs text-gray-500">End date</small>
              <div>Nov 20</div>
            </div>
          </div>

          {/* Travelers Button */}
          <button
            onClick={() => setModalVisible(true)}
            className="w-full p-2 mt-4 border rounded-md text-left"
          >
            <small className="block text-xs text-gray-500">Travelers</small>
            <div><span className="count-traveler">{adultCount + childCount}</span> travelers</div>
          </button>

          {/* Modal */}
          {modalVisible && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="p-4 bg-white rounded-md shadow-md w-80">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Travelers</h2>
                  <button onClick={() => setModalVisible(false)} className="text-lg font-bold">×</button>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Adults</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTravelerChange("adult", "decrement")}
                      className="px-3 py-1 border rounded-md"
                    >-</button>
                    <input
                      type="text"
                      value={adultCount}
                      readOnly
                      className="w-12 text-center border rounded-md"
                    />
                    <button
                      onClick={() => handleTravelerChange("adult", "increment")}
                      className="px-3 py-1 border rounded-md"
                    >+</button>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Children (Ages 0 to 17)</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTravelerChange("child", "decrement")}
                      className="px-3 py-1 border rounded-md"
                    >-</button>
                    <input
                      type="text"
                      value={childCount}
                      readOnly
                      className="w-12 text-center border rounded-md"
                    />
                    <button
                      onClick={() => handleTravelerChange("child", "increment")}
                      className="px-3 py-1 border rounded-md"
                    >+</button>
                  </div>
                </div>
                <button
                  onClick={handleDone}
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {/* Total Section */}
          <div className="flex justify-between mt-4">
            <span>Total</span>
            <span>$543</span>
          </div>
          <div className="text-right text-sm text-gray-500">
            Total includes fees, not tax <a href="#" className="text-blue-500">Price details</a>
          </div>

          {/* Booking Button */}
          <button className="w-full p-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Book now
          </button>
          <div className="mt-2 text-sm text-gray-500">You will not be charged yet</div>

          {/* Contact Host */}
          <a href="#" className="block mt-4 text-sm text-blue-500">Contact host</a>
          <div className="mt-2 text-sm text-gray-400">Property # 9838104ha</div>
        </div>
      </div>

    </div>
  );
}