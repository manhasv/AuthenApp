import express from "express";
import {  fetchAllUsers, retrieveProfileByID, deleteProfileByID, updateProfileByID } from "../controller/user.controller.js";

const router = express.Router();

// router.post("/", updateProfileByEmail);
// router.delete("/", deleteProfileByEmail);

// router.get("/", retrieveProfileByEmail);


router.put("/:uid", updateProfileByID);
router.delete("/:uid", deleteProfileByID);
router.get("/:uid", retrieveProfileByID);

router.get("/", fetchAllUsers);
export default router;