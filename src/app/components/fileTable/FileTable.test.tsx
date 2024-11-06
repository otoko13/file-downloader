import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import testFiles from "../../../testData.json";
import FileTable from "./FileTable";
import { File } from "@/types";

const files = testFiles as File[];

const clickSelectAllCheckbox = async () => {
  await userEvent.click(screen.getByLabelText("Select all"));
};

const clickRowCheckbox = async (row: number) => {
  await userEvent.click(screen.getAllByRole("checkbox")[row]);
};

const getRowCheckbox = (row: number) => screen.getAllByRole("checkbox")[row];

describe("apperance", () => {
  it("should match the snapshot", () => {
    const { container } = render(<FileTable files={files} />);
    expect(container).toMatchSnapshot();
  });
});

describe("clicking download", () => {
  let windowAlertMock: jest.Mock;

  beforeEach(() => {
    windowAlertMock = jest.fn();
    window.alert = windowAlertMock;
  });

  it("should not trigger an alert if no files selected", async () => {
    render(<FileTable files={files} />);
    await userEvent.click(
      screen.getByRole("button", { name: "Download Selected" })
    );
    expect(windowAlertMock).not.toHaveBeenCalled();
  });

  it("should trigger an alert if files are selected", async () => {
    render(<FileTable files={files} />);
    await clickRowCheckbox(2);
    await clickRowCheckbox(3);
    await userEvent.click(
      screen.getByRole("button", { name: "Download Selected" })
    );
    expect(windowAlertMock).toHaveBeenCalledWith(
      "Downloading: \\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe on device Luigi\n\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll on device Peach"
    );
  });
});

describe("selecting rows", () => {
  it("should update the selected count indicator", async () => {
    render(<FileTable files={files} />);
    await clickRowCheckbox(2);
    expect(screen.getByText("Selected 1")).toBeInTheDocument();
    await clickRowCheckbox(3);
    expect(screen.getByText("Selected 2")).toBeInTheDocument();
  });

  it("should not update the selected count indicator if an unavailable row is clicked", async () => {
    render(<FileTable files={files} />);
    await clickRowCheckbox(2);
    expect(screen.getByText("Selected 1")).toBeInTheDocument();
    await clickRowCheckbox(1);
    expect(screen.getByText("Selected 1")).toBeInTheDocument();
  });

  it("should change the status of the select all checkbox", async () => {
    render(<FileTable files={files} />);
    const selectAllCheckbox = screen.getByLabelText("Select all");
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("false");
    await clickRowCheckbox(2);
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("mixed");
    await clickRowCheckbox(3);
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("true");
  });

  it("should not change the status of the select all checkbox if an unavailble row is clicked", async () => {
    render(<FileTable files={files} />);
    const selectAllCheckbox = screen.getByLabelText("Select all");
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("false");
    await clickRowCheckbox(2);
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("mixed");
    await clickRowCheckbox(1);
    await clickRowCheckbox(4);
    await clickRowCheckbox(5);
    await clickRowCheckbox(6);
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("mixed");
  });

  it("should allow deselection", async () => {
    render(<FileTable files={files} />);
    await clickRowCheckbox(2);
    expect(screen.getByText("Selected 1")).toBeInTheDocument();
    await clickRowCheckbox(2);
    expect(screen.getByText("Selected 0")).toBeInTheDocument();
  });
});

describe("select all checkbox", () => {
  it("should start unchecked", () => {
    render(<FileTable files={files} />);
    const selectAllCheckbox = screen.getByLabelText("Select all");
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("false");
  });

  it("should select all available files if none are checked", async () => {
    render(<FileTable files={files} />);
    const selectAllCheckbox = screen.getByLabelText("Select all");
    await clickSelectAllCheckbox();
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("true");
    expect(getRowCheckbox(1)).not.toBeChecked();
    expect(getRowCheckbox(2)).toBeChecked();
    expect(getRowCheckbox(3)).toBeChecked();
    expect(getRowCheckbox(4)).not.toBeChecked();
    expect(getRowCheckbox(5)).not.toBeChecked();
    expect(getRowCheckbox(6)).not.toBeChecked();
  });

  it("should select all available files if some are checked", async () => {
    render(<FileTable files={files} />);
    const selectAllCheckbox = screen.getByLabelText("Select all");
    await clickRowCheckbox(3);
    await clickSelectAllCheckbox();
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("true");
    expect(getRowCheckbox(1)).not.toBeChecked();
    expect(getRowCheckbox(2)).toBeChecked();
    expect(getRowCheckbox(3)).toBeChecked();
    expect(getRowCheckbox(4)).not.toBeChecked();
    expect(getRowCheckbox(5)).not.toBeChecked();
    expect(getRowCheckbox(6)).not.toBeChecked();
  });

  it("should deselect all if all available files are checked", async () => {
    render(<FileTable files={files} />);
    const selectAllCheckbox = screen.getByLabelText("Select all");
    await clickSelectAllCheckbox();
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("true");
    await clickSelectAllCheckbox();
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("false");
    expect(getRowCheckbox(1)).not.toBeChecked();
    expect(getRowCheckbox(2)).not.toBeChecked();
    expect(getRowCheckbox(3)).not.toBeChecked();
    expect(getRowCheckbox(4)).not.toBeChecked();
    expect(getRowCheckbox(5)).not.toBeChecked();
    expect(getRowCheckbox(6)).not.toBeChecked();
  });
});
