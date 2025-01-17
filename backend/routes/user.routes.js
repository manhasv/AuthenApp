import express from "express";
import {  fetchAllUsers, retrieveProfileByID } from "../controller/user.controller.js";

const router = express.Router();

// router.post("/", updateProfileByEmail);
// router.delete("/", deleteProfileByEmail);

// router.get("/", retrieveProfileByEmail);

// router.post("/:uid", updateProfileByEmail);
// router.delete("/:uid", deleteProfileByEmail);

router.get("/fetch/:uid", retrieveProfileByID);

router.get("/fetch", fetchAllUsers);
export default router;