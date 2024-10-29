import classNames from "classnames";
import { FunctionComponent } from "react";
import Checkbox, { CheckedState } from "../checkbox/Checkbox";
import styles from "./fileTableHeader.module.scss";

export interface FileTableHeaderProps {
  checkedState: CheckedState;
  onSelectAllClicked: () => void;
  selectedFileCount: number;
  onDownloadClicked: () => void;
}

const FileTableHeader: FunctionComponent<FileTableHeaderProps> = ({
  checkedState,
  onSelectAllClicked,
  selectedFileCount,
  onDownloadClicked,
}) => {
  return (
    <thead className={styles["file-table-header"]}>
      <tr>
        <th colSpan={5}>
          <div className={styles["top-header"]}>
            <Checkbox
              ariaLabel="Select all"
              checkedState={checkedState}
              onClick={onSelectAllClicked}
            />
            <div className={styles["selected-count"]}>
              Selected {selectedFileCount}
            </div>
            <button
              className={styles["download-button"]}
              onClick={onDownloadClicked}
            >
              <i
                className={classNames("bi-download", styles["download-icon"])}
              />
              Download Selected
            </button>
          </div>
        </th>
      </tr>
      <tr>
        <th />
        <th>Name</th>
        <th>Device</th>
        <th>Path</th>
        <th className={styles["status-header"]}>Status</th>
      </tr>
    </thead>
  );
};
export default FileTableHeader;
