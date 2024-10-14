import { Router } from "express";
import * as userController from "../controllers/userController";
import authentication from "../middlewares/authentication";
import uploadMiddleware from "../middlewares/uploads";

const userRouter = Router();

userRouter.get("/:userId", authentication, userController.getUser);
userRouter.post("/", userController.createUser);
userRouter.delete("/:userId", userController.deleteUser);
userRouter.put("/", uploadMiddleware("profile"), authentication, userController.updateUser);
// userRouter.put("/", authentication, userController.updateUser);

export default userRouter;
