import express from "express";
import { retrieveProfile, updateProfile, deleteProfile } from "../controller/user.controller.js";

const router = express.Router();

router.post("/update-profile", updateProfile);
router.post("/delete-profile", deleteProfile);

router.get("/retrieve-profile", retrieveProfile);

export default router;