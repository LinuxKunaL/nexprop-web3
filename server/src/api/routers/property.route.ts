import { Router } from "express";
import controller from "@/api/controllers/property.controller.ts";
import { parseMulter, uploadFiles } from "@/middlewares/multer-middleware.ts";

const router = Router();

router.get("/home-screen", controller.getHomeScreenProperties);
router.get("/list", controller.getProperties);

router.get("/by-business", controller.getPropertiesByBusiness);

router.post("/metadata", parseMulter, uploadFiles, controller.uploadMetadeta);

export default router;
``;
