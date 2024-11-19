import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";

describe("Header Component", () => {
  const defaultImages = [
    "./images/header-1.jpg",
    "./images/header-4.jpg",
    "./images/header-3.jpg",
    "./images/header-2.jpeg",
    "./images/header-7.jpg",
    "./images/header-3.jpg",
    "./images/header-2.jpeg",
    "./images/header-7.jpg",
  ];

  test("renders default images when no images prop is provided", () => {
    render(<Header />);
    const displayedImage = screen.getByAltText("Main Image");
    expect(displayedImage).toHaveAttribute("src", defaultImages[0]);
  });

  test("renders provided images when images prop is passed", () => {
    const customImages = [
      "./custom/image1.jpg",
      "./custom/image2.jpg",
      "./custom/image3.jpg",
    ];
    render(<Header images={customImages} />);
    const displayedImage = screen.getByAltText("Main Image");
    expect(displayedImage).toHaveAttribute("src", customImages[0]);
  });

  test("opens modal when the button is clicked", () => {
    render(<Header />);
    const button = screen.getByText(/30\+/i);
    fireEvent.click(button);
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
  });

  test("closes modal when close button is clicked", () => {
    render(<Header />);
    const button = screen.getByText(/30\+/i);
    fireEvent.click(button);
    const closeButton = screen.getByText("\u00D7"); // Close button
    fireEvent.click(closeButton);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("navigates to the next slide in the modal", () => {
    render(<Header />);
    const button = screen.getByText(/30\+/i);
    fireEvent.click(button);
    const nextButton = screen.getByRole("button", { name: /arrow-right/i });
    fireEvent.click(nextButton);
    const modalImage = screen.getByAltText(/Slide 2/i);
    expect(modalImage).toBeInTheDocument();
  });

  test("navigates to the previous slide in the modal", () => {
    render(<Header />);
    const button = screen.getByText(/30\+/i);
    fireEvent.click(button);
    const prevButton = screen.getByRole("button", { name: /arrow-left/i });
    fireEvent.click(prevButton);
    const modalImage = screen.getByAltText(/Slide 8/i); // Last image due to wraparound
    expect(modalImage).toBeInTheDocument();
  });

  test("displays the title prop if provided", () => {
    const customTitle = "Custom Title";
    render(<Header title={customTitle} />);
    const titleText = screen.getByText(customTitle);
    expect(titleText).toBeInTheDocument();
  });

  test("uses the default title when title prop is not provided", () => {
    const defaultTitle = "Juneau Vacation Home: Stunning View + Beach Access";
    render(<Header />);
    const titleText = screen.getByText(defaultTitle);
    expect(titleText).toBeInTheDocument();
  });
});
