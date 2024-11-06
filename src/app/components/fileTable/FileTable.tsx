import { File } from "@/types";
import classNames from "classnames";
import { FunctionComponent, useCallback, useMemo, useState } from "react";
import { CheckedState } from "../checkbox/Checkbox";
import styles from "./fileTable.module.scss";
import FileTableHeader from "./FileTableHeader";
import FileTableRow from "./FileTableRow";

interface FileTableProps {
  className?: string;
  files: File[];
}

const FileTable: FunctionComponent<FileTableProps> = ({ className, files }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const availableFiles = useMemo(
    () => files.filter((file) => file.status === "available"),
    [files]
  );

  const handleSelectAllClicked = () => {
    const filesToSelect =
      selectedFiles.length === availableFiles.length ? [] : availableFiles;
    setSelectedFiles(filesToSelect);
  };

  const getSelectAllCheckedState = (): CheckedState => {
    if (selectedFiles.length === availableFiles.length) {
      return "checked";
    }
    if (selectedFiles.length === 0) {
      return "unchecked";
    }
    return "partial";
  };

  const handleFileSelectClicked = (file: File) => {
    const indexInSelected = selectedFiles.findIndex(
      (selectedFile) => selectedFile.path === file.path
    );
    if (indexInSelected < 0) {
      setSelectedFiles((files) => [...files, file]);
      return;
    }
    const updatedSelection = selectedFiles.filter(
      (selectedFile) => selectedFile.path !== file.path
    );
    setSelectedFiles(updatedSelection);
  };

  const handleDownloadClicked = useCallback(() => {
    if (!selectedFiles.length) {
      return;
    }
    const alertSegments = selectedFiles
      .filter((file) => file.status === "available")
      .map((file) => `${file.path} on device ${file.device}`);
    const alertText = `Downloading: ${alertSegments.join("\n")}`;
    alert(alertText);
  }, [selectedFiles]);

  return (
    <table className={classNames(styles["file-table"], className)}>
      <FileTableHeader
        checkedState={getSelectAllCheckedState()}
        onDownloadClicked={handleDownloadClicked}
        onSelectAllClicked={handleSelectAllClicked}
        selectedFileCount={selectedFiles.length}
      />
      <tbody>
        {files.map((file) => (
          <FileTableRow
            file={file}
            key={file.path}
            selected={selectedFiles.some(
              (selectedFile) => selectedFile.path === file.path
            )}
            onClick={() => handleFileSelectClicked(file)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default FileTable;
