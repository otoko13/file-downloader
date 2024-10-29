import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import testFiles from "../../../testData.json";
import FileTable from "./FileTable";
import { DownloadableFile } from "@/types";

const files = testFiles as DownloadableFile[];

const clickSelectAllCheckbox = async () => {
  await userEvent.click(screen.getByLabelText("Select all"));
};

const clickRowCheckbox = async (row: number) => {
  await userEvent.click(screen.getAllByRole("checkbox")[row]);
};

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
    await clickRowCheckbox(1);
    await clickRowCheckbox(2);
    await userEvent.click(
      screen.getByRole("button", { name: "Download Selected" })
    );
    expect(windowAlertMock).toHaveBeenCalledWith(
      "Downloading: \\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe on device Mario\n\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe on device Luigi"
    );
  });
});

describe("selecting rows", () => {
  it("should update the selected count indicator", async () => {
    render(<FileTable files={files} />);
    await clickRowCheckbox(1);
    expect(screen.getByText("Selected 1")).toBeInTheDocument();
    await clickRowCheckbox(2);
    expect(screen.getByText("Selected 2")).toBeInTheDocument();
  });

  it("should change the status of the select all checkbox to mixed", async () => {
    render(<FileTable files={files} />);
    const selectAllCheckbox = screen.getByLabelText("Select all");
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("false");
    await clickRowCheckbox(1);
    await clickRowCheckbox(2);
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("mixed");
    await clickRowCheckbox(3);
    await clickRowCheckbox(4);
    await clickRowCheckbox(5);
    await clickRowCheckbox(6);
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("true");
  });

  it("should allow deselection", async () => {
    render(<FileTable files={files} />);
    await clickRowCheckbox(1);
    expect(screen.getByText("Selected 1")).toBeInTheDocument();
    await clickRowCheckbox(1);
    expect(screen.getByText("Selected 0")).toBeInTheDocument();
  });
});

describe("select all checkbox", () => {
  it("should start unchecked", () => {
    render(<FileTable files={files} />);
    const selectAllCheckbox = screen.getByLabelText("Select all");
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("false");
  });

  it("should select all if none are checked", async () => {
    render(<FileTable files={files} />);
    const selectAllCheckbox = screen.getByLabelText("Select all");
    await clickSelectAllCheckbox();
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("true");
  });

  it("should select all if none are checked", async () => {
    render(<FileTable files={files} />);
    const selectAllCheckbox = screen.getByLabelText("Select all");
    await clickSelectAllCheckbox();
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("true");
  });

  it("should select all if some are checked", async () => {
    render(<FileTable files={files} />);
    const selectAllCheckbox = screen.getByLabelText("Select all");
    await clickRowCheckbox(3);
    await clickRowCheckbox(4);
    await clickSelectAllCheckbox();
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("true");
  });

  it("should deselect all if all are checked", async () => {
    render(<FileTable files={files} />);
    const selectAllCheckbox = screen.getByLabelText("Select all");
    await clickSelectAllCheckbox();
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("true");
    await clickSelectAllCheckbox();
    expect(selectAllCheckbox.getAttribute("aria-checked")).toBe("false");
  });
});
