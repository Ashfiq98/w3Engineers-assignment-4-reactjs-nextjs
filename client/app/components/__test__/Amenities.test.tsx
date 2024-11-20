import { render, screen, fireEvent } from "@testing-library/react";
import Amenities from "../Amenities"; // Adjust the import path to match your project structure

describe("Amenities Component", () => {
  const mockHotelData = {
    hotelId: "1",
    slug: "mock-hotel",
    images: [],
    title: "Mock Hotel Title",
    description: "Mock description",
    guestCount: 4,
    bedroomCount: 2,
    bathroomCount: 1,
    amenities: ["Wi-Fi", "Parking", "Pool"],
    host: {
      name: "John Doe",
      contact: "john@example.com",
    },
    address: "123 Mock Street",
    location: "Mock City",
    coordinates: {
      latitude: 40.7128,
      longitude: -74.006,
    },
    rooms: [],
  };

  it("renders with default values when no HotelData is provided", () => {
    render(<Amenities />);
    expect(
      screen.getByText(/Juneau Vacation Home: Stunning View \+ Beach/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Entire home")).toBeInTheDocument();
  });

  it("renders the provided hotel title", () => {
    render(<Amenities HotelData={mockHotelData} />);
    expect(screen.getByText(mockHotelData.title)).toBeInTheDocument();
  });

  it("renders amenities correctly", () => {
    render(<Amenities HotelData={mockHotelData} />);
    mockHotelData.amenities.forEach((amenity) => {
      expect(screen.getByText(amenity)).toBeInTheDocument();
    });
  });

  it("opens Google Maps with correct coordinates when map is clicked", () => {
    global.open = jest.fn(); // Mock window.open
    render(<Amenities HotelData={mockHotelData} />);
    const mapButton = screen.getByText("9.8"); // Assuming this triggers the map
    fireEvent.click(mapButton);
    expect(global.open).toHaveBeenCalledWith(
      `https://www.google.com/maps?q=${mockHotelData.coordinates.latitude},${mockHotelData.coordinates.longitude}`,
      "_blank"
    );
  });

  it("updates traveler count and stores in localStorage", () => {
    render(<Amenities HotelData={mockHotelData} />);

    // Initial count
    const adultIncrementButton = screen.getByText("+"); // Adjust based on your increment button
    const childIncrementButton = screen.getByText("+"); // Adjust based on your increment button

    // Increment adult count
    fireEvent.click(adultIncrementButton);
    expect(localStorage.getItem("adultCount")).toBe("1");

    // Increment child count
    fireEvent.click(childIncrementButton);
    expect(localStorage.getItem("childCount")).toBe("1");
  });

  it("handles done button correctly", () => {
    render(<Amenities HotelData={mockHotelData} />);

    const doneButton = screen.getByText("Done"); // Adjust to match your button text
    fireEvent.click(doneButton);
    expect(localStorage.getItem("totalTravelers")).toBe("2"); // Adjust based on adult + child counts
  });
});
const EssentialAmenities = ({ HotelData }: { HotelData?: { bedroomCount?: number; guestCount?: number; bathroomCount?: number } }) => (
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
          <span className="text-xl">
            <i className="fa-solid fa-shower"></i>
          </span>
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
  
      <a href="#" className="text-blue-600 hover:underline block mt-4">
        See all amenities &gt;
      </a>
    </div>
  );
  
  describe("Essential Amenities Component", () => {
    it("renders all essential amenities with default values when no data is provided", () => {
      render(<EssentialAmenities />);
  
      // Default Bedroom, Guest, and Bathroom Count
      expect(screen.getByText("2 bedrooms")).toBeInTheDocument();
      expect(screen.getByText("Sleep 4")).toBeInTheDocument();
      expect(screen.getByText("1 bathroom")).toBeInTheDocument();
      expect(screen.getByText("1155 sq ft")).toBeInTheDocument();
  
      // Popular Amenities
      expect(screen.getByText("Barbecue grill")).toBeInTheDocument();
      expect(screen.getByText("Washer")).toBeInTheDocument();
      expect(screen.getByText("Outdoor Space")).toBeInTheDocument();
      expect(screen.getByText("Parking available")).toBeInTheDocument();
      expect(screen.getByText("Kitchen")).toBeInTheDocument();
      expect(screen.getByText("Dryer")).toBeInTheDocument();
  
      // "See all amenities" link
      const seeAllLink = screen.getByText("See all amenities >");
      expect(seeAllLink).toBeInTheDocument();
      expect(seeAllLink).toHaveAttribute("href", "#");
    });
  
    it("renders dynamic data when provided in HotelData", () => {
      const hotelData = {
        bedroomCount: 3,
        guestCount: 6,
        bathroomCount: 2,
      };
  
      render(<EssentialAmenities HotelData={hotelData} />);
  
      expect(screen.getByText("3 bedrooms")).toBeInTheDocument();
      expect(screen.getByText("Sleep 6")).toBeInTheDocument();
      expect(screen.getByText("2 bathrooms")).toBeInTheDocument();
      expect(screen.getByText("1155 sq ft")).toBeInTheDocument(); // Static Value
    });
  
    it("renders fallback values when some fields in HotelData are missing", () => {
      const partialHotelData = {
        bedroomCount: 4,
      };
  
      render(<EssentialAmenities HotelData={partialHotelData} />);
  
      expect(screen.getByText("4 bedrooms")).toBeInTheDocument();
      expect(screen.getByText("Sleep 4")).toBeInTheDocument(); // Default value
      expect(screen.getByText("1 bathroom")).toBeInTheDocument(); // Default value
      expect(screen.getByText("1155 sq ft")).toBeInTheDocument(); // Static Value
    });
  });
  const ExploreArea = ({
    mapImage,
    HotelData,
    handleOpenMap,
  }: {
    mapImage?: string;
    HotelData?: { guestCount?: number; rooms?: { name: string; bedType: string }[] };
    handleOpenMap?: () => void;
  }) => (
    <div>
      {/* Explore Area */}
      <div className="mb-8">
        <h2 className="font-semibold text-lg mb-4">Explore the area</h2>
        <div className="flex gap-8">
          <div className="w-1/3">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={mapImage}
                alt="Area map"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-medium mb-2">Dhaka, Bangladesh</h4>
                <a href="#" onClick={handleOpenMap} className="text-blue-600 hover:underline">
                  view in map
                </a>
              </div>
            </div>
          </div>
  
          <div className="w-1/3">
            <div className="space-y-4">
              {["Auke Bay", "University of Alaska-Southeast", "Mendenhall Golf Course", "Juneau, AK (JNU-Juneau Intl.)"].map(
                (location) => (
                  <div key={location} className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{location}</span>
                  </div>
                )
              )}
            </div>
          </div>
  
          <div className="w-1/3">
            <div className="space-y-4">
              {["6 minutes drive", "10 minutes drive", "14 minutes drive", "14 minutes drive"].map(
                (time, index) => (
                  <p key={index} className="text-gray-600">{time}</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
  
      {/* Rooms and Beds */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Rooms & Beds</h2>
        <h3 className="text-lg font-semibold mb-2">
          {HotelData?.rooms?.length || 2} Bedrooms{" "}
          <small className="text-sm text-gray-600">({HotelData?.guestCount || 4} sleeps)</small>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HotelData?.rooms?.map((room, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-md shadow-md">
              <h5 className="font-bold text-lg">{room.name}</h5>
              <p className="text-3xl my-2">🛌🏼</p>
              <h5 className="text-md text-gray-700">{room.bedType}</h5>
            </div>
          ))}
        </div>
      </div>
  
      {/* Spaces */}
      <div className="my-8">
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
    </div>
  );
  
  describe("Explore Area Component", () => {
    it("renders the Explore Area section with the map and locations", () => {
      const handleOpenMapMock = jest.fn();
      render(<ExploreArea mapImage="/path/to/map.jpg" handleOpenMap={handleOpenMapMock} />);
  
      // Check Map
      const mapImage = screen.getByAltText("Area map");
      expect(mapImage).toHaveAttribute("src", "/path/to/map.jpg");
  
      // Check Locations
      ["Auke Bay", "University of Alaska-Southeast", "Mendenhall Golf Course", "Juneau, AK (JNU-Juneau Intl.)"].forEach(
        (location) => {
          expect(screen.getByText(location)).toBeInTheDocument();
        }
      );
  
      // Check Driving Times
      ["6 minutes drive", "10 minutes drive", "14 minutes drive", "14 minutes drive"].forEach((time) => {
        expect(screen.getByText(time)).toBeInTheDocument();
      });
  
      // Check "View in map" link
      const viewMapLink = screen.getByText("view in map");
      expect(viewMapLink).toBeInTheDocument();
      viewMapLink.click();
      expect(handleOpenMapMock).toHaveBeenCalled();
    });
  
    it("renders the Rooms and Beds section with dynamic data", () => {
      const hotelData = {
        guestCount: 6,
        rooms: [
          { name: "Bedroom 1", bedType: "1 Queen Bed" },
          { name: "Bedroom 2", bedType: "1 Twin Bed" },
        ],
      };
  
      render(<ExploreArea HotelData={hotelData} />);
  
      // Check Guest Count and Bedrooms
      expect(screen.getByText("2 Bedrooms")).toBeInTheDocument();
      expect(screen.getByText("(6 sleeps)")).toBeInTheDocument();
  
      // Check Room Details
      hotelData.rooms.forEach((room) => {
        expect(screen.getByText(room.name)).toBeInTheDocument();
        expect(screen.getByText(room.bedType)).toBeInTheDocument();
      });
    });
  
    it("renders the Spaces section", () => {
      render(<ExploreArea />);
  
      // Check Spaces
      expect(screen.getByText("Washer")).toBeInTheDocument();
      expect(screen.getByText("Parking available")).toBeInTheDocument();
      expect(screen.getByText("Dryer")).toBeInTheDocument();
  
      // Check "See all rooms and beds details" link
      const detailsLink = screen.getByText("See all rooms and beds details >");
      expect(detailsLink).toBeInTheDocument();
      expect(detailsLink).toHaveAttribute("href", "#");
    });
  });