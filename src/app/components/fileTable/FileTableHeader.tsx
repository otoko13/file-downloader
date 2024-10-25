import { FunctionComponent } from "react";
import Checkbox, { CheckedState } from "../checkbox/Checkbox";

interface FileTableHeaderProps {
  checkedState: CheckedState;
  onSelectAllClicked: () => void;
  selectedFileCount: number;
}

const FileTableHeader: FunctionComponent<FileTableHeaderProps> = ({
  checkedState,
  onSelectAllClicked,
  selectedFileCount,
}) => {
  return (
    <thead>
      <tr>
        <th>
          <Checkbox checkedState={checkedState} onClick={onSelectAllClicked} />
        </th>
        <th>Selected {selectedFileCount}</th>
        <th colSpan={3}>
          <i className="bi-download download-icon" />
          Download Selected
        </th>
      </tr>
      <tr>
        <th />
        <th>Name</th>
        <th>Device</th>
        <th>Path</th>
        <th>Status</th>
      </tr>
    </thead>
  );
};
export default FileTableHeader;
