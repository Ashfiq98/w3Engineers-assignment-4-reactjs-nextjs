import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Amenities from "../Amenities"; // Adjust the import path accordingly
import '@testing-library/jest-dom';

// Mock data for testing
const hotelData = {
  hotelId: "123",
  slug: "vacation-home",
  images: ["image1.jpg", "image2.jpg"],
  title: "Juneau Vacation Home: Stunning View + Beach",
  description: "Escape to the mountains and enjoy the outdoors.",
  guestCount: 4,
  bedroomCount: 2,
  bathroomCount: 1,
  amenities: ["Barbecue grill", "Washer", "Outdoor Space", "Parking available"],
  host: { name: "John Doe", contact: "123-456-7890" },
  address: "123 Beach Ave, Juneau, AK",
  location: "Juneau, AK",
  coordinates: { latitude: 58.3019, longitude: -134.4197 },
  rooms: [
    { hotelSlug: "vacation-home", roomSlug: "room-1", roomImages: ["room1.jpg"], roomTitle: "Bedroom 1", bedroomCount: 1 },
    { hotelSlug: "vacation-home", roomSlug: "room-2", roomImages: ["room2.jpg"], roomTitle: "Bedroom 2", bedroomCount: 1 }
  ]
};

describe("Amenities component", () => {
  test("renders hotel information", () => {
    render(<Amenities HotelData={hotelData} />);
    
    expect(screen.getByText(/Juneau Vacation Home: Stunning View \+ Beach/i)).toBeInTheDocument();
    expect(screen.getByText(/Barbecue grill/i)).toBeInTheDocument();
    expect(screen.getByText(/Washer/i)).toBeInTheDocument();
    expect(screen.getByText(/Parking available/i)).toBeInTheDocument();
    expect(screen.getByText(/Sleep 4/i)).toBeInTheDocument();
  });

  test("opens map when clicking 'view in map' link", () => {
    render(<Amenities HotelData={hotelData} />);
    
    const mapLink = screen.getByText(/view in map/i);
    fireEvent.click(mapLink);
    
    expect(window.open).toHaveBeenCalledWith("https://www.google.com/maps?q=58.3019,-134.4197", "_blank");
  });

  test("handles traveler count modal visibility and incrementing/decrementing adults/children", async () => {
    render(<Amenities HotelData={hotelData} />);
    
    // Simulate clicking the "Travelers" button to show the modal
    const travelersButton = screen.getByText(/travelers/i);
    fireEvent.click(travelersButton);

    // Check if modal is visible
    expect(screen.getByText(/Travelers/i)).toBeInTheDocument();

    // Test incrementing and decrementing adult count
    const incrementAdultButton = screen.getByText(/increment adult/i); // You need to add buttons to test increment and decrement
    const decrementAdultButton = screen.getByText(/decrement adult/i);
    
    fireEvent.click(incrementAdultButton);
    await waitFor(() => expect(screen.getByText(/1 traveler/i)));

    fireEvent.click(decrementAdultButton);
    await waitFor(() => expect(screen.getByText(/0 travelers/i)));
  });

  test("renders property manager details", () => {
    render(<Amenities HotelData={hotelData} />);
    
    expect(screen.getByText(/Property Manager/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });
});
