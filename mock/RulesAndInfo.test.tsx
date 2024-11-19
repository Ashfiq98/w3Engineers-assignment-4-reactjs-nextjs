import { render, screen, fireEvent } from '@testing-library/react';
import RulesAndInfo from '../RulesAndInfo'; // Adjust the import path if necessary

// Mock title prop
const mockTitle = 'Juneau Vacation Home: Stunning View + Beach Access';

describe('RulesAndInfo Component', () => {
  it('renders house rules section by default', () => {
    render(<RulesAndInfo title={mockTitle} />);
    
    // Check if the house rules section is displayed initially
    expect(screen.getByText('House Rules')).toBeInTheDocument();
    expect(screen.getByText('Check in after')).toBeInTheDocument();
    expect(screen.getByText('Check out before')).toBeInTheDocument();
  });

  it('toggles section visibility on mobile view', () => {
    render(<RulesAndInfo title={mockTitle} />);

    // Ensure the section starts collapsed
    const toggleButton = screen.getByText('House Rules').closest('button');
    expect(toggleButton).toBeInTheDocument();

    // Open the house rules section
    fireEvent.click(toggleButton!);
    expect(screen.getByText('Check in after')).toBeInTheDocument();

    // Close the house rules section
    fireEvent.click(toggleButton!);
    expect(screen.queryByText('Check in after')).not.toBeInTheDocument();
  });

  it('shows the correct FAQ questions', () => {
    render(<RulesAndInfo title={mockTitle} />);

    // Test if FAQ section contains the right questions
    expect(screen.getByText(`Is ${mockTitle} pet-friendly?`)).toBeInTheDocument();
    expect(screen.getByText(`What time is check-in at ${mockTitle} ?`)).toBeInTheDocument();
    expect(screen.getByText(`What time is check-out at ${mockTitle} ?`)).toBeInTheDocument();
    expect(screen.getByText(`Where is ${mockTitle} located?`)).toBeInTheDocument();
  });

  it('handles desktop view correctly', () => {
    render(<RulesAndInfo title={mockTitle} />);

    // Simulate the desktop view (large screen)
    const sectionsNav = screen.getByRole('navigation');
    expect(sectionsNav).toBeInTheDocument();
    
    // Test clicking on a section
    const damageButton = screen.getByText('Damage and incidentals');
    fireEvent.click(damageButton);

    expect(screen.getByText('Damage and incidentals')).toBeInTheDocument();
    expect(screen.getByText('You will be responsible for any damage')).toBeInTheDocument();
  });

  it('defaults to houseRules section', () => {
    render(<RulesAndInfo title={mockTitle} />);

    // Ensure that the default active section is houseRules
    expect(screen.getByText('House Rules')).toHaveClass('text-blue-600 font-medium');
  });

  it('shows and hides sections in mobile view on button click', () => {
    render(<RulesAndInfo title={mockTitle} />);

    // Open the "Damage and incidentals" section
    const damageSectionToggle = screen.getByText('Damage and incidentals').closest('button');
    fireEvent.click(damageSectionToggle!);

    expect(screen.getByText('Damage and incidentals')).toBeInTheDocument();

    // Close the section
    fireEvent.click(damageSectionToggle!);
    expect(screen.queryByText('Damage and incidentals')).not.toBeInTheDocument();
  });
});
