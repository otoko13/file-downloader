"use client";

import styles from "./page.module.css";
import files from "../testData.json";
import FileTable from "./components/fileTable/FileTable";
import { DownloadableFile } from "@/types";

export default function Home() {
  return (
    <div className={styles.page}>
      <FileTable files={files as DownloadableFile[]} />
    </div>
  );
}
