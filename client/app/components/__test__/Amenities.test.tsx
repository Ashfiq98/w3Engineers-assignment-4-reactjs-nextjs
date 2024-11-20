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
