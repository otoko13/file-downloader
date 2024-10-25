export type DownloadableFile = {
  name: string;
  device: string;
  path: string;
  status: "available" | "scheduled";
};
