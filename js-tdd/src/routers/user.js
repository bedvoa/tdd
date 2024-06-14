import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/list", userController.getAllUsers);
router.get("/:id", userController.getUserByIdController);
router.post("/", userController.createUserController);

export default router;
