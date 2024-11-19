import * as React from 'react';
import { render } from '@testing-library/react';
import * as RTL from '@testing-library/react';
import '@testing-library/jest-dom';
import HotelPage from '../../hotel-details/[slug]/[hotelId]/page';

// Mock all child components
jest.mock('@/app/components/Navbar', () => {
  return function MockNavbar() {
    return <div data-testid="mock-navbar">Navbar</div>;
  };
});

jest.mock('@/app/components/Subheader', () => {
  return function MockSubheader() {
    return <div data-testid="mock-subheader">Subheader</div>;
  };
});

jest.mock('@/app/components/Header', () => {
  return function MockHeader({ images, title }: { images: string[]; title: string }) {
    return <div data-testid="mock-header">{title}</div>;
  };
});

jest.mock('@/app/components/Pagination', () => {
  return function MockPagination() {
    return <div data-testid="mock-pagination">Pagination</div>;
  };
});

jest.mock('@/app/components/Amenities', () => {
  return function MockAmenities({ HotelData }: { HotelData: any }) {
    return <div data-testid="mock-amenities">Amenities</div>;
  };
});

jest.mock('@/app/components/QuestionCard', () => {
  return function MockQuestionCard() {
    return <div data-testid="mock-question-card">QuestionCard</div>;
  };
});

jest.mock('@/app/components/RulesAndInfo', () => {
  return function MockRulesAndInfo({ title }: { title: string }) {
    return <div data-testid="mock-rules-info">{title}</div>;
  };
});

jest.mock('@/app/components/Footer', () => {
  return function MockFooter({ host }: { host: any }) {
    return <div data-testid="mock-footer">{host.name}</div>;
  };
});

jest.mock('@/app/components/Custom404', () => {
  return function Mock404() {
    return <div data-testid="mock-404">404 Page</div>;
  };
});

// Mock sample hotel data
const mockHotelData = {
  hotelId: 'test-id',
  slug: 'test-slug',
  images: ['image1.jpg', 'image2.jpg'],
  title: 'Test Hotel',
  description: 'Test Description',
  guestCount: 2,
  bedroomCount: 1,
  bathroomCount: 1,
  amenities: ['wifi', 'parking'],
  host: {
    name: 'Test Host',
    contact: 'test@example.com',
  },
  address: 'Test Address',
  location: 'Test Location',
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  rooms: [
    {
      hotelSlug: 'test-slug',
      roomSlug: 'room-1',
      roomImages: ['room1.jpg'],
      roomTitle: 'Test Room',
      bedroomCount: 1,
    },
  ],
};

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ hotelData: mockHotelData }),
  })
) as jest.Mock;

describe('HotelPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders hotel page with all components when data is successfully fetched', async () => {
    const params = { slug: 'test-slug', hotelId: 'test-id' };
    const { getByTestId } = render(await HotelPage({ params }));

    expect(getByTestId('mock-navbar')).toBeInTheDocument();
    expect(getByTestId('mock-subheader')).toBeInTheDocument();
    expect(getByTestId('mock-header')).toBeInTheDocument();
    expect(getByTestId('mock-pagination')).toBeInTheDocument();
    expect(getByTestId('mock-amenities')).toBeInTheDocument();
    expect(getByTestId('mock-question-card')).toBeInTheDocument();
    expect(getByTestId('mock-rules-info')).toBeInTheDocument();
    expect(getByTestId('mock-footer')).toBeInTheDocument();
  });

  it('renders 404 page when hotel data is not found', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ hotelData: null }),
      })
    );

    const params = { slug: 'invalid-slug', hotelId: 'invalid-id' };
    const { getByTestId } = render(await HotelPage({ params }));

    expect(getByTestId('mock-404')).toBeInTheDocument();
  });

  it('renders 404 page when API request fails', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    );

    const params = { slug: 'test-slug', hotelId: 'test-id' };
    const { getByTestId } = render(await HotelPage({ params }));

    expect(getByTestId('mock-404')).toBeInTheDocument();
  });

  it('calls fetch with correct URL and parameters', async () => {
    const params = { slug: 'test-slug', hotelId: 'test-id' };
    render(await HotelPage({ params }));

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:3000/hotel/${params.hotelId}`,
      expect.objectContaining({
        cache: 'no-store',
      })
    );
  });
});