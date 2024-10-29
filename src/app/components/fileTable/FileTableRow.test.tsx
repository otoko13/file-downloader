import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FileTableRow, { FileTableRowProps } from "./FileTableRow";

let defaultProps: FileTableRowProps;
let clickHandler: jest.Mock;

const renderTableWithRow = (props: FileTableRowProps) =>
  render(
    <table>
      <tbody>
        <FileTableRow {...props} />
      </tbody>
    </table>
  );

beforeEach(() => {
  defaultProps = {
    file: {
      name: "smss.exe",
      device: "Mario",
      path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
      status: "scheduled",
    },
    selected: false,
    onClick: clickHandler,
  };
});

describe("appearance", () => {
  it("should match the snapshot", () => {
    const { container } = renderTableWithRow(defaultProps);
    expect(container).toMatchSnapshot();
  });
});

describe("checkbox state", () => {
  it("should not be checked if the row is not selected", () => {
    renderTableWithRow(defaultProps);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.getAttribute("aria-checked")).toBe("false");
  });

  it("should be checked if the row is selected", () => {
    renderTableWithRow({ ...defaultProps, selected: true });
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.getAttribute("aria-checked")).toBe("true");
  });
});

describe("available marker", () => {
  it("should not be shown if the file is not available", () => {
    renderTableWithRow(defaultProps);
    expect(screen.getByLabelText("available")).not.toHaveClass("visible");
  });

  it("should be shown if the file is available", () => {
    renderTableWithRow({
      ...defaultProps,
      file: { ...defaultProps.file, status: "available" },
    });
    expect(screen.getByLabelText("available")).toHaveClass("visible");
  });

  it("should show Scheduled if scheduled", () => {
    renderTableWithRow(defaultProps);
    expect(screen.queryByText("Scheduled")).toBeInTheDocument();
  });

  it("should show Available if available", () => {
    renderTableWithRow({
      ...defaultProps,
      file: { ...defaultProps.file, status: "available" },
    });
    expect(screen.queryByText("Available")).toBeInTheDocument();
  });

  it("should show nothing if neither scheduled nor available", () => {
    renderTableWithRow({
      ...defaultProps,
      file: { ...defaultProps.file, status: "" as "available" },
      // need to do the cast to allow the bad value
    });
    expect(screen.queryByText("Available")).not.toBeInTheDocument();
    expect(screen.queryByText("Scheduled")).not.toBeInTheDocument();
  });
});
