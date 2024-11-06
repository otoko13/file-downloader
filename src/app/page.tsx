"use client";

import styles from "./page.module.css";
import files from "../testData.json";
import FileTable from "./components/fileTable/FileTable";
import { File } from "@/types";

const testFiles: File[] = files.map((file) => file as File);

export default function Home() {
  return (
    <div className={styles.page}>
      <FileTable files={testFiles} />
    </div>
  );
}
