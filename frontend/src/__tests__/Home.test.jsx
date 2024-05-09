import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

it("should have browse audio files", () => {
  render(<Home />);
  const message = screen.queryByText(/Browse Audio Files/i);
  expect(message).toBeVisible();
});
