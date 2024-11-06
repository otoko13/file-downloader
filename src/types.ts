export type FileStatus = "available" | "scheduled";

export type File = {
  name: string;
  device: string;
  path: string;
  status: FileStatus;
};
