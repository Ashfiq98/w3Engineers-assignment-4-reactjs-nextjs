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
    const res = await fetch(`http://localhost:3001/hotel/${hotelId}`, {
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


