import type { NextFunction, Request, Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";
import multer from "multer";
import { generateEncryptedFileName } from "@/utils/generateEncryptedFileName.ts";

const UPLOAD_DIR = {
  document: path.join(process.cwd(), "uploads", "documents"),
  media: path.join(process.cwd(), "uploads", "media"),
};

export const parseMulter = multer({
  storage: multer.memoryStorage(),
}).fields([
  {
    name: "documents",
    maxCount: 6,
  },
  {
    name: "media",
    maxCount: 5,
  },
]);

export const uploadFiles = async (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  try {
    const files = req.files as {
      documents?: Express.Multer.File[];
      media?: Express.Multer.File[];
    };

    const documents = files.documents ?? [];
    const media = files.media ?? [];

    await fs.mkdir(UPLOAD_DIR.document, {
      recursive: true,
    });

    await fs.mkdir(UPLOAD_DIR.media, {
      recursive: true,
    });

    for (const file of media) {
      const filePath = path.join(
        UPLOAD_DIR.media,
        `${Date.now()}-${file.originalname}`,
      );

      await fs.writeFile(filePath, file.buffer);
    }

    for (const file of documents) {
      const filename = generateEncryptedFileName();

      const filePath = path.join(UPLOAD_DIR.document, filename);
      await fs.writeFile(filePath, file.buffer);
    }

    console.log(req.body);

    next();
  } catch (error) {
    next(error);
  }
};
