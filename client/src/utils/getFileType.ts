export const getFileName = (filename: string): "doc" | "pdf" => {
  const fileExtension = filename.split("/")[1];
  if (fileExtension.includes("msword") || fileExtension.includes("doc")) {
    return "doc";
  } else {
    return "pdf";
  }
};
