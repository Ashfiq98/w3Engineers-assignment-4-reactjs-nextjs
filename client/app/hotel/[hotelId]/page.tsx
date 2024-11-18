'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Subheader from '@/app/components/Subheader';
import Header from '@/app/components/Header';
import Pagination from '@/app/components/Pagination';
import Amenities from '@/app/components/Amenities';

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

export default function HotelPage() {
  const router = useRouter();
  const [hotel, setHotel] = useState<HotelData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        // Extract hotelId from the URL
        const urlPath = window.location.pathname; // e.g., /hotel/<id>
        const hotelId = urlPath.split('/')[2] || 'b9e1a815-434f-48dd-b2c0-a43146c54d56'; // Default ID if none provided

        const response = await fetch(`http://localhost:3000/hotel/${hotelId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch hotel data');
        }

        const data = await response.json();
        console.log('Fetched Hotel Data:', data);

        setHotel(data.hotelData); // Update state with the hotelData property
        setError(null); // Clear any previous error
      } catch (err: any) {
        console.error('Error fetching hotel data:', err.message);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, []); // Runs once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto text-center mt-10">
        <p className="text-red-500 text-xl">Error: {error}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  if (!hotel) {
    return <div>No hotel data found.</div>;
  }

  return (<>
    <Navbar/>
    <Subheader/>
    <Header images={hotel.images}/>
    <Pagination/>
    {/* <Amenities/> */}
    {/* <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{hotel.title}</h1>
      <p className="text-gray-700 mb-4">{hotel.description}</p>
      <p className="text-gray-600 mb-2">Address: {hotel.address}</p>
      <p className="text-gray-600 mb-2">Location: {hotel.location}</p>
      <p className="text-gray-600 mb-2">Host: {hotel.host.name} ({hotel.host.contact})</p>

      <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
      <ul className="list-disc pl-6 mb-4">
        {hotel.amenities.map((amenity, index) => (
          <li key={index} className="text-gray-700">
            {amenity}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Images</h2>
      {hotel.images && hotel.images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotel.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Hotel Image ${index + 1}`}
              className="rounded-lg shadow"
            />
          ))}
        </div>
      ) : (
        <p>No images available for this hotel.</p>
      )}

      <h2 className="text-2xl font-semibold mb-4">Rooms</h2>
      {hotel.rooms.map((room, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-bold mb-2">{room.roomTitle}</h3>
          <p>Bedrooms: {room.bedroomCount}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {room.roomImages.map((roomImage, idx) => (
              <img
                key={idx}
                src={roomImage}
                alt={`Room ${index + 1} Image ${idx + 1}`}
                className="rounded-lg shadow"
              />
            ))}
          </div>
        </div>
      ))}
    </div> */}
    </>
  );
}
