// 'use client';

// import Amenities from '@/app/components/Amenities';
// import Footer from '@/app/components/Footer';
// import Header from '@/app/components/Header';
// import Navbar from '@/app/components/Navbar';
// import Pagination from '@/app/components/Pagination';
// import QuestionCard from '@/app/components/QuestionCard';
// import RulesAndInfo from '@/app/components/RulesAndInfo';
// import Subheader from '@/app/components/Subheader';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// interface HotelData {
//   hotelId: string;
//   slug: string;
//   images: string[];
//   title: string;
//   description: string;
//   guestCount: number;
//   bedroomCount: number;
//   bathroomCount: number;
//   amenities: string[];
//   host: {
//     name: string;
//     contact: string;
//   };
//   address: string;
//   location: string;
//   coordinates: {
//     latitude: number;
//     longitude: number;
//   };
//   rooms: {
//     hotelSlug: string;
//     roomSlug: string;
//     roomImages: string[];
//     roomTitle: string;
//     bedroomCount: number;
//   }[];
// }

// export default function HotelPage() {
//   const router = useRouter();
//   const [hotel, setHotel] = useState<HotelData | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHotel = async () => {
//       try {
//         // Extract hotelId from the URL
//         const urlPath = window.location.pathname; // e.g., /hotel/<id>
//         const hotelId = urlPath.split('/')[2] || 'b9e1a815-434f-48dd-b2c0-a43146c54d56'; // Default ID if none provided

//         const response = await fetch(`http://localhost:3000/hotel/${hotelId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch hotel data');
//         }

//         const data = await response.json();
//         console.log('Fetched Hotel Data:', data);

//         setHotel(data.hotelData); // Update state with the hotelData property
//         setError(null); // Clear any previous error
//       } catch (err: any) {
//         console.error('Error fetching hotel data:', err.message);
//         setError(err.message || 'Something went wrong');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHotel();
//   }, []); // Runs once on component mount

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto text-center mt-10">
//         <p className="text-red-500 text-xl">Error: {error}</p>
//         <button
//           onClick={() => router.push('/')}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Go Back to Home
//         </button>
//       </div>
//     );
//   }

//   if (!hotel) {
//     return <div>No hotel data found.</div>;
//   }

//   return (<>
//     <Navbar />
//     <Subheader />
//     <Header images={hotel.images} title={hotel.title} />
//     <Pagination />
//     <Amenities HotelData={hotel} />
//     <QuestionCard />
//     <RulesAndInfo />
//     <Footer host={hotel.host} />
//   </>
//   );
// }

// app/hotel/[hotelId]/page.tsx
// import Amenities from '@/app/components/Amenities';
// import Footer from '@/app/components/Footer';
// import Header from '@/app/components/Header';
// import Navbar from '@/app/components/Navbar';
// import Pagination from '@/app/components/Pagination';
// import QuestionCard from '@/app/components/QuestionCard';
// import RulesAndInfo from '@/app/components/RulesAndInfo';
// import Subheader from '@/app/components/Subheader';

// // Define the type for hotel data
// interface HotelData {
//   hotelId: string;
//   slug: string;
//   images: string[];
//   title: string;
//   description: string;
//   guestCount: number;
//   bedroomCount: number;
//   bathroomCount: number;
//   amenities: string[];
//   host: {
//     name: string;
//     contact: string;
//   };
//   address: string;
//   location: string;
//   coordinates: {
//     latitude: number;
//     longitude: number;
//   };
//   rooms: {
//     hotelSlug: string;
//     roomSlug: string;
//     roomImages: string[];
//     roomTitle: string;
//     bedroomCount: number;
//   }[];
// }

// // Fetch hotel data on the server
// async function fetchHotelData(hotelId: string): Promise<HotelData | null> {
//   try {
//     const res = await fetch(`http://localhost:3000/hotel/${hotelId}`, {
//       cache: 'no-store', // Ensure fresh data on every request
//     });

//     if (!res.ok) {
//       throw new Error('Failed to fetch hotel data');
//     }

//     const data = await res.json();
//     return data.hotelData || null;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// // `page` component for SSR
// export default async function HotelPage({ params }: { params: { hotelId: string } }) {
//   const hotelData = await fetchHotelData(params.hotelId);

//   if (!hotelData) {
//     return (
//       <div className="container mx-auto text-center mt-10">
//         <p className="text-red-500 text-xl">Error: Failed to load hotel data.</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <Subheader />
//       <Header images={hotelData.images} title={hotelData.title} />
//       <Pagination />
//       <Amenities HotelData={hotelData} />
//       <QuestionCard />
//       <RulesAndInfo />
//       <Footer host={hotelData.host} />
//     </>
//   );
// }
import Amenities from '@/app/components/Amenities';
import Custom404 from '@/app/components/Custom404';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import Navbar from '@/app/components/Navbar';
import Pagination from '@/app/components/Pagination';
import QuestionCard from '@/app/components/QuestionCard';
import RulesAndInfo from '@/app/components/RulesAndInfo';
import Subheader from '@/app/components/Subheader';

// Define the type for hotel data
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

// Fetch hotel data based on slug and hotelId
async function fetchHotelData(hotelId: string, slug: string): Promise<HotelData | null> {
  try {
    const res = await fetch(`http://localhost:3000/hotel/${hotelId}`, {
      cache: 'no-store', // Ensure fresh data on every request
    });

    // if (!res.ok) {
    //   throw new Error('Failed to fetch hotel data');
    // }
    if (!res.ok) {
      // Log the specific status and response
      console.error(`Error fetching hotel data: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return data.hotelData || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// `page` component for SSR
export default async function HotelPage({
  params,
}: {
  params: { slug: string; hotelId: string };
}) {
  const { slug, hotelId } = await params;

  const hotelData = await fetchHotelData(hotelId, slug);

  if (!hotelData?.hotelId || (hotelData.slug!=slug)) {
    return (
     <Custom404/>
    );
  }

  return (
    <>
      <Navbar />
      <Subheader />
      <Header images={hotelData.images} title={hotelData.title} />
      <Pagination />
      <Amenities HotelData={hotelData} />
      <QuestionCard />
      <RulesAndInfo title={hotelData.title} />
      <Footer host={hotelData.host} />
    </>
  );
}


