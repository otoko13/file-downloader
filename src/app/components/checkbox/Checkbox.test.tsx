import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Checkbox from "./Checkbox";

describe("appearance", () => {
  it("should match the snapshot", () => {
    const { container } = render(<Checkbox checkedState="checked" />);
    expect(container).toMatchSnapshot();
  });
});

describe("checked state", () => {
  it("should show aria-checked as true when fully checked", () => {
    render(<Checkbox checkedState="checked" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.getAttribute("aria-checked")).toBe("true");
  });

  it("should show aria-checked as mixes when parially checked", () => {
    render(<Checkbox checkedState="partial" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.getAttribute("aria-checked")).toBe("mixed");
  });

  it("should show aria-checked as false when not checked", () => {
    render(<Checkbox checkedState="unchecked" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.getAttribute("aria-checked")).toBe("false");
  });

  it("should show no icon when unchecked", () => {
    const { container } = render(<Checkbox checkedState="unchecked" />);
    const icons = container.querySelectorAll("i");
    expect(icons).toHaveLength(0);
  });

  it("should show a dash icon when partially checked", () => {
    const { container } = render(<Checkbox checkedState="partial" />);
    const icons = container.querySelectorAll("i");
    expect(icons).toHaveLength(1);
    expect(icons[0].className.includes("bi-dash"));
  });

  it("should show a check icon when fully checked", () => {
    const { container } = render(<Checkbox checkedState="checked" />);
    const icons = container.querySelectorAll("i");
    expect(icons).toHaveLength(1);
    expect(icons[0].className.includes("bi-check2"));
  });
});

describe("onClick", () => {
  it("should call onClick when clicked", async () => {
    const handler = jest.fn();
    render(<Checkbox checkedState="unchecked" onClick={handler} />);
    expect(handler).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("checkbox"));
    expect(handler).toHaveBeenCalled();
  });
});
