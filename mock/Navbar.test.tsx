// __tests__/page.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navbar from '../Navbar'; // Adjust import based on your file structure
import '@testing-library/jest-dom';

// Mocking localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn().mockImplementation((key) => {
    if (key === 'selectedRegion') return 'US';
    if (key === 'regionText') return 'United States';
    if (key === 'selectedCurrency') return 'USD';
    return null;
  });
  Storage.prototype.setItem = jest.fn();
});

test('renders Navbar with correct default values', async () => {
  render(<Navbar />);

  // Check if region text is rendered correctly
  expect(screen.getByText('United States')).toBeInTheDocument();

  // Check if the menu items are rendered
  expect(screen.getByText('Trip Boards')).toBeInTheDocument();
  expect(screen.getByText('List your property')).toBeInTheDocument();
  expect(screen.getByText('Help')).toBeInTheDocument();
  expect(screen.getByText('My trips')).toBeInTheDocument();
  expect(screen.getByText('Sign in')).toBeInTheDocument();
});

test('opens and closes the modal when clicking on the globe icon', async () => {
  render(<Navbar />);

  // Initially, the modal should not be open
  expect(screen.queryByText('Select Region and Currency')).not.toBeInTheDocument();

  // Open the modal by clicking the globe icon
  fireEvent.click(screen.getByText('United States'));

  // Wait for the modal to appear
  await waitFor(() => screen.getByText('Select Region and Currency'));
  expect(screen.getByText('Select Region and Currency')).toBeInTheDocument();

  // Close the modal
  fireEvent.click(screen.getByText('Close'));

  // Ensure the modal is closed
  expect(screen.queryByText('Select Region and Currency')).not.toBeInTheDocument();
});

test('changes region and currency when a new region is selected', async () => {
  render(<Navbar />);

  // Open the modal to change region
  fireEvent.click(screen.getByText('United States'));

  // Change the region to Spain
  fireEvent.change(screen.getByLabelText('Region'), { target: { value: 'ES' } });

  // Check if the currency has updated
  expect(screen.getByDisplayValue('EURO')).toBeInTheDocument();

  // Save the region and currency
  fireEvent.click(screen.getByText('Save'));

  // Check if the region text is updated after saving
  expect(screen.getByText('Spain')).toBeInTheDocument();

  // Check if localStorage was updated
  expect(localStorage.setItem).toHaveBeenCalledWith('selectedRegion', 'ES');
  expect(localStorage.setItem).toHaveBeenCalledWith('regionText', 'Spain');
  expect(localStorage.setItem).toHaveBeenCalledWith('selectedCurrency', 'EURO');
});

test('does not open modal if it is already open', async () => {
  render(<Navbar />);

  // Open the modal
  fireEvent.click(screen.getByText('United States'));

  // Try clicking the globe icon again
  fireEvent.click(screen.getByText('United States'));

  // Ensure the modal remains open
  expect(screen.getByText('Select Region and Currency')).toBeInTheDocument();
});

test('checks the region dropdown', async () => {
  render(<Navbar />);

  // Open the modal
  fireEvent.click(screen.getByText('United States'));

  // Check if all region options are available
  expect(screen.getByText('United States')).toBeInTheDocument();
  expect(screen.getByText('Spain')).toBeInTheDocument();
  expect(screen.getByText('United Kingdom')).toBeInTheDocument();
  expect(screen.getByText('Germany')).toBeInTheDocument();
});
