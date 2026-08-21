import multer from "multer";

export const fileSave = multer({
  storage: multer.memoryStorage(),
}).any();
