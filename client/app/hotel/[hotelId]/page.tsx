'use client';

import Amenities from '@/app/components/Amenities';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import Navbar from '@/app/components/Navbar';
import Pagination from '@/app/components/Pagination';
import QuestionCard from '@/app/components/QuestionCard';
import RulesAndInfo from '@/app/components/RulesAndInfo';
import Subheader from '@/app/components/Subheader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    <Navbar />
    <Subheader />
    <Header images={hotel.images} title={hotel.title} />
    <Pagination />
    <Amenities HotelData={hotel} />
    <QuestionCard />
    <RulesAndInfo />
    <Footer host={hotel.host} />
  </>
  );
}
