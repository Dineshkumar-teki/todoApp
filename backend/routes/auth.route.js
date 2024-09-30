import express from "express";
import User from "../modal/user.modal.js";
import { signup, signin } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/", async (request, response) => {
  try {
    const user = await User.find({});
    response.status(200).json(...user);
  } catch (error) {
    response.status(500).json(err);
  }
});

export default router;
