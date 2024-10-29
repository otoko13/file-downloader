import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AvailableMarker from "./AvailableMarker";

describe("appearance", () => {
  it("should match the snapshot", () => {
    const { container } = render(<AvailableMarker available />);
    expect(container).toMatchSnapshot();
  });
});

describe("visibility", () => {
  it("should be marked visible when available", () => {
    render(<AvailableMarker available />);
    expect(screen.getByLabelText("available")).toHaveClass("visible");
  });

  it("should be marked hidden when not available", () => {
    render(<AvailableMarker />);
    expect(screen.getByLabelText("available")).not.toHaveClass("visible");
  });
});
