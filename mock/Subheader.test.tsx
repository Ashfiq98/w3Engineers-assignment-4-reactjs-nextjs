import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Subheader from '../Subheader'; // Adjust the import according to your file structure

// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn().mockReturnValue('false'); // Mocking localStorage
  Storage.prototype.setItem = jest.fn();
});

describe('Subheader Component', () => {
  test('should render Subheader with buttons', () => {
    render(<Subheader />);

    // Check if the necessary elements are in the document
    expect(screen.getByText('See all properties')).toBeInTheDocument();
    expect(screen.getByText('Share')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('should open modal when Share button is clicked', () => {
    render(<Subheader />);

    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);

    // Check if modal is open
    expect(screen.getByText('Share')).toBeInTheDocument();
    expect(screen.getByText('Tell us about your trip!')).toBeInTheDocument();
  });

  test('should close modal when close button is clicked', () => {
    render(<Subheader />);

    const shareButton = screen.getByText('Share');
    fireEvent.click(shareButton);

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    // Check if modal is closed
    expect(screen.queryByText('Share')).not.toBeInTheDocument();
  });

  test('should toggle love status and save it to localStorage', () => {
    render(<Subheader />);

    const saveButton = screen.getByText('Save');
    expect(localStorage.setItem).not.toHaveBeenCalled();

    // Initially not loved
    expect(screen.getByRole('img')).toHaveClass('fa-regular fa-heart');

    // Toggle love status
    fireEvent.click(saveButton);
    expect(localStorage.setItem).toHaveBeenCalledWith('isLoved', 'true');
    expect(screen.getByRole('img')).toHaveClass('fa-heart fill-love');

    // Toggle back
    fireEvent.click(saveButton);
    expect(localStorage.setItem).toHaveBeenCalledWith('isLoved', 'false');
    expect(screen.getByRole('img')).toHaveClass('fa-regular fa-heart');
  });

  test('should copy the vacation URL to clipboard when Copy link button is clicked', async () => {
    render(<Subheader />);

    const copyButton = screen.getByText('Copy link');
    fireEvent.click(copyButton);

    // Wait for the clipboard copied message to appear
    await waitFor(() => screen.getByText('Link copied to clipboard!'));

    // Check if copied message appears
    expect(screen.getByText('Link copied to clipboard!')).toBeInTheDocument();
  });
});
