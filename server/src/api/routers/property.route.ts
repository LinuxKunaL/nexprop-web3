import { Router } from "express";
import controller from "@/api/controllers/property.controller.ts";
import multer from "multer";

const router = Router();

router.get("/home-screen", controller.getHomeScreenProperties);
router.get("/list", controller.getProperties);

router.get("/by-business", controller.getPropertiesByBusiness);

router.post("/metadata",controller.uploadMetadeta);

export default router;
