import express from "express";
import User from "../modal/user.modal.js";
import { signup, signin } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/", async (request, response) => {
  try {
    const user = await User.find({});
    const userObj = { ...user };
    response.status(200).json(userObj);
  } catch (error) {
    response.status(400).send(error);
  }
});

export default router;
