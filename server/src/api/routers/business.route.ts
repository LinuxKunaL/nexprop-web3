import { Router } from "express";
import controller from "@/api/controllers/business.controller.ts";

const router = Router();

router.post("/", controller.createBusiness);

export default router;
