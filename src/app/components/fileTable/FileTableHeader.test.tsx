import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FileTableHeader, { FileTableHeaderProps } from "./FileTableHeader";

let defaultProps: FileTableHeaderProps;
let downloadClickHandler: jest.Mock;
let selectAllClickHandler: jest.Mock;

beforeEach(() => {
  downloadClickHandler = jest.fn();
  selectAllClickHandler = jest.fn();
  defaultProps = {
    checkedState: "unchecked",
    onDownloadClicked: downloadClickHandler,
    onSelectAllClicked: selectAllClickHandler,
    selectedFileCount: 0,
  };
});

describe("appearance", () => {
  it("should match the snapshot", () => {
    const { container } = render(
      <table>
        <FileTableHeader {...defaultProps} />
      </table>
    );
    expect(container).toMatchSnapshot();
  });
});

describe("interactions", () => {
  it("should call onDownloadClicked when download button is clicked", async () => {
    render(
      <table>
        <FileTableHeader {...defaultProps} />
      </table>
    );

    expect(downloadClickHandler).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button"));
    expect(downloadClickHandler).toHaveBeenCalled();
  });

  it("should call onSelecteAllClicked when checkbox is clicked", async () => {
    render(
      <table>
        <FileTableHeader {...defaultProps} />
      </table>
    );

    expect(selectAllClickHandler).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("checkbox"));
    expect(selectAllClickHandler).toHaveBeenCalled();
  });
});

describe("interactions", () => {
  it("should show the selected file count correctly", () => {
    render(
      <table>
        <FileTableHeader {...defaultProps} selectedFileCount={3} />
      </table>
    );
    expect(screen.getByText("Selected 3")).toBeInTheDocument();
  });
});
