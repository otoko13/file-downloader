import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FileTableRow, { FileTableRowProps } from "./FileTableRow";
import userEvent from "@testing-library/user-event";

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
  clickHandler = jest.fn();
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

describe("onClick", () => {
  it("should be called when a row is clicked", async () => {
    renderTableWithRow(defaultProps);
    await userEvent.click(screen.getByRole("row"));
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});

describe("columns", () => {
  beforeEach(() => {
    renderTableWithRow(defaultProps);
  });

  it("should render a checkbox in the first column", () => {
    expect(screen.getAllByRole("cell")[0]).toContainElement(
      screen.getByRole("checkbox")
    );
  });

  it("should render name in the second column", () => {
    expect(screen.getAllByRole("cell")[1]).toHaveTextContent("smss.exe");
  });

  it("should render device in the third column", () => {
    expect(screen.getAllByRole("cell")[2]).toHaveTextContent("Mario");
  });

  it("should render path in the fourth column", () => {
    expect(screen.getAllByRole("cell")[3]).toHaveTextContent(
      "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe"
    );
  });

  it("should render status in the fifth column", () => {
    expect(screen.getAllByRole("cell")[4]).toHaveTextContent("Scheduled");
  });
});
