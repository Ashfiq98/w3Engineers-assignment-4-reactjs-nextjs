// Header.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '../Header'; // Adjust the import path accordingly
import '@testing-library/jest-dom'; // For matchers like toBeInTheDocument

// Mock images
const mockImages = [
  './images/header-1.jpg',
  './images/header-2.jpg',
  './images/header-3.jpg',
  './images/header-4.jpg',
  './images/header-5.jpg',
];

describe('Header Component', () => {

  it('renders the main image correctly', () => {
    render(<Header images={mockImages} />);

    // Verify the first image is rendered as the main image
    const mainImage = screen.getByAltText('Main Image');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', mockImages[0]);
  });

  it('renders the grid of four images', () => {
    render(<Header images={mockImages} />);

    // Verify the grid section is rendered with 4 images (other than the main image)
    const imageElements = screen.getAllByRole('img');
    expect(imageElements).toHaveLength(5); // 1 main image + 4 grid images
    expect(imageElements[1]).toHaveAttribute('src', mockImages[1]);
  });

  it('opens and closes the modal', async () => {
    render(<Header images={mockImages} />);

    // Click the button to open the modal
    const openModalButton = screen.getByText(/30+/i);
    fireEvent.click(openModalButton);

    // Verify the modal is open
    const modal = screen.getByText('×'); // Close button in modal
    expect(modal).toBeInTheDocument();

    // Close the modal
    fireEvent.click(modal);

    // Verify the modal is closed
    expect(modal).not.toBeInTheDocument();
  });

  it('navigates the carousel images on small screens', async () => {
    render(<Header images={mockImages} />);

    // Select carousel buttons
    const nextButton = screen.getByText('›');
    const prevButton = screen.getByText('‹');

    // Click the "next" button
    fireEvent.click(nextButton);

    // Wait for the image to change
    await waitFor(() => {
      const slideImage = screen.getByAltText(`Slide 1`);
      expect(slideImage).toHaveAttribute('src', mockImages[1]);
    });

    // Click the "prev" button
    fireEvent.click(prevButton);

    // Wait for the image to revert back to the first slide
    await waitFor(() => {
      const slideImage = screen.getByAltText(`Slide 0`);
      expect(slideImage).toHaveAttribute('src', mockImages[0]);
    });
  });

  it('displays the title correctly in the modal', async () => {
    const customTitle = 'Custom Vacation Home Title';
    render(<Header images={mockImages} title={customTitle} />);

    // Open the modal
    const openModalButton = screen.getByText(/30+/i);
    fireEvent.click(openModalButton);

    // Check if the title appears in the modal
    const titleElement = screen.getByText(customTitle);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the correct number of images in modal', async () => {
    render(<Header images={mockImages} />);

    // Open the modal
    const openModalButton = screen.getByText(/30+/i);
    fireEvent.click(openModalButton);

    // Check that the modal has the correct number of images
    const modalImages = screen.getAllByRole('img');
    expect(modalImages.length).toBeGreaterThan(1); // More than one image should be in the modal
  });
});
