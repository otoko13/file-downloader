import { FunctionComponent } from "react";
import Checkbox from "../checkbox/Checkbox";
import { DownloadableFile } from "@/types";
import AvailableMarker from "./AvailableMarker";
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
      <td className="name">{file.name}</td>
      <td className="device">{file.device}</td>
      <td className="path">{file.path}</td>
      <td className="available">
        <AvailableMarker available={file.status === "available"} />
        {file.status}
      </td>
    </tr>
  );
};

export default FileTableRow;
