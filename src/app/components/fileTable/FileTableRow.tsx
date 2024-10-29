import { FunctionComponent, useMemo } from "react";
import Checkbox from "../checkbox/Checkbox";
import { DownloadableFile } from "@/types";
import AvailableMarker from "../availableMarker/AvailableMarker";
import styles from "./fileTableRow.module.scss";
import classNames from "classnames";

interface FileTableRowProps {
  file: DownloadableFile;
  selected: boolean;
  onClick: () => void;
}

const FileTableRow: FunctionComponent<FileTableRowProps> = ({
  file,
  selected,
  onClick,
}) => {
  const statusText = useMemo(() => {
    switch (file.status) {
      case "available":
        return "Available";
      case "scheduled":
        return "Scheduled";
      default:
        return "";
    }
  }, [file.status]);

  return (
    <tr
      className={classNames(styles["file-table-row"], {
        [styles.selected]: selected,
      })}
      onClick={onClick}
    >
      <td className="selected">
        <Checkbox checkedState={selected ? "checked" : "unchecked"} />
      </td>
      <td>{file.name}</td>
      <td>{file.device}</td>
      <td>{file.path}</td>
      <td>
        <div className={styles["status-cell"]}>
          <AvailableMarker available={file.status === "available"} />
          {statusText}
        </div>
      </td>
    </tr>
  );
};

export default FileTableRow;
