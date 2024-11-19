import { render, screen } from '@testing-library/react';
import Footer from '../Footer';  // Adjust the import path if necessary

// Mock host data for testing
const mockHost = {
  name: 'John Doe',
  contact: 'john.doe@example.com'
};

describe('Footer Component', () => {
  it('renders review section correctly', () => {
    render(<Footer host={mockHost} />);
    
    // Check if the review rating is displayed
    expect(screen.getByText('9.8/10')).toBeInTheDocument();
    expect(screen.getByText('Exceptional')).toBeInTheDocument();
    expect(screen.getByText('24 reviews')).toBeInTheDocument();
    
    // Check if the individual review cards are rendered
    expect(screen.getByText('10/10 Excellent')).toBeInTheDocument();
    expect(screen.getByText('Kyle G.')).toBeInTheDocument();
    expect(screen.getByText('Sep 25, 2024')).toBeInTheDocument();
  });

  it('displays host information correctly', () => {
    render(<Footer host={mockHost} />);
    
    // Check if host name is displayed correctly
    expect(screen.getByText('Hosted by John Doe')).toBeInTheDocument();
  });

  it('shows languages section correctly', () => {
    render(<Footer host={mockHost} />);
    
    // Check if languages section is present and has correct content
    expect(screen.getByText('Languages:')).toBeInTheDocument();
    expect(screen.getByText('English, French, German, Spanish')).toBeInTheDocument();
  });

  it('renders the contact section with correct contact information', () => {
    render(<Footer host={mockHost} />);
    
    // Check if the contact button is rendered with the correct contact info
    const contactButton = screen.getByText('Contact john.doe@example.com');
    expect(contactButton).toBeInTheDocument();
    expect(contactButton.closest('a')).toHaveAttribute('href', '#');
  });

  it('renders without host prop gracefully', () => {
    render(<Footer host={undefined} />);
    
    // Check that the host section displays a fallback message when no host is provided
    expect(screen.queryByText('Hosted by')).not.toBeInTheDocument();
  });

  it('renders all review cards', () => {
    render(<Footer host={mockHost} />);
    
    // Check that multiple review cards are rendered
    const reviews = screen.getAllByText('10/10 Excellent');
    expect(reviews.length).toBe(3);
  });
});
