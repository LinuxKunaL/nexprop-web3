export const getFileType = (filename: string | null): "file-word" | "file-pdf-box" => {
  const fileExtension = filename?.split("/")[1];
  if (fileExtension?.includes("msword") || fileExtension?.includes("doc")) {
    return "file-word";
  } else {
    return "file-pdf-box";
  }
};
