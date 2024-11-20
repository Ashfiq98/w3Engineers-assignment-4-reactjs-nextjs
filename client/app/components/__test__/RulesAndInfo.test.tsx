import { render, screen, fireEvent } from "@testing-library/react";
import RulesAndInfo from "../RulesAndInfo"; // Adjust the path as per your project structure

describe("RulesAndInfo Component", () => {
  const mockTitle = "Mock Vacation Home";

  it("renders the component with default active section", () => {
    render(<RulesAndInfo title={mockTitle} />);
    expect(screen.getByText("House Rules")).toBeInTheDocument();
    expect(screen.getByText("Check in after")).toBeInTheDocument(); // Default content of "House Rules"
  });

  it("renders all section titles in the navigation", () => {
    render(<RulesAndInfo title={mockTitle} />);
    const sections = [
      "House Rules",
      "Damage and incidentals",
      "Cancellation",
      "Important information",
      "Frequently asked questions",
    ];
    sections.forEach((sectionTitle) => {
      expect(screen.getByText(sectionTitle)).toBeInTheDocument();
    });
  });

  it("switches to a different section when clicked", () => {
    render(<RulesAndInfo title={mockTitle} />);
    
    const damageSectionButton = screen.getByText("Damage and incidentals");
    fireEvent.click(damageSectionButton);

    // Check that the damage section content is displayed
    expect(
      screen.getByText(
        "You will be responsible for any damage to the rental property caused by you or your party during your stay."
      )
    ).toBeInTheDocument();

    // Check that the house rules content is no longer displayed
    expect(screen.queryByText("Check in after")).not.toBeInTheDocument();
  });

  it("renders FAQ section with dynamically generated questions based on title", () => {
    render(<RulesAndInfo title={mockTitle} />);
    
    const faqSectionButton = screen.getByText("Frequently asked questions");
    fireEvent.click(faqSectionButton);

    // Verify FAQ questions based on the provided title
    expect(
      screen.getByText(`Is ${mockTitle} pet-friendly?`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`What time is check-in at ${mockTitle} ?`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`What time is check-out at ${mockTitle} ?`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Where is ${mockTitle} located?`)
    ).toBeInTheDocument();
  });

  it("toggles content visibility in mobile view", () => {
    render(<RulesAndInfo title={mockTitle} />);
    
    // Simulate clicking on a section in mobile view
    const importantInfoButton = screen.getByText("Important information");
    fireEvent.click(importantInfoButton);

    // Check that the important info content is displayed
    expect(screen.getByText("You need to know")).toBeInTheDocument();

    // Check that house rules content is not displayed anymore
    expect(screen.queryByText("Check in after")).not.toBeInTheDocument();
  });

  it("displays default FAQ questions when no title is provided", () => {
    render(<RulesAndInfo />);
    
    const faqSectionButton = screen.getByText("Frequently asked questions");
    fireEvent.click(faqSectionButton);

    // Verify default FAQ questions
    const defaultTitle = "Juneau Vacation Home: Stunning View + Beach Access";
    expect(
      screen.getByText(`Is ${defaultTitle} pet-friendly?`)
    ).toBeInTheDocument();
  });
});
