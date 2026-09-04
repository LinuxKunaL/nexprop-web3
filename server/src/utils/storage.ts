import multer from "multer";

export const storage = () => {
  return multer.diskStorage({});
};
