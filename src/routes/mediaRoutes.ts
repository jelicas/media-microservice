import { Router } from "express";
import { mediaController } from "../controllers/mediaController";

const mediaRoutes = Router();

mediaRoutes.post("/upload", mediaController.upload);
mediaRoutes.get("/get", mediaController.getMedia);

export { mediaRoutes };
