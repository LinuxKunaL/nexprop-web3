import { Router } from "express";
import controller from "@/api/controllers/auth.controller.ts";

const router = Router();

router.post("/", controller.createAccount);
router.post("/verify-signature",controller.verifySignature)

export default router;
