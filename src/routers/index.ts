import { Router } from "express";
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import paymentRouter from "./paymentRouter";
import filmRouter from "./filmRouter";

const indexRouter = Router();

indexRouter.use("/user", userRouter);
indexRouter.use(authRouter);
indexRouter.use(paymentRouter)
indexRouter.use(filmRouter);

export default indexRouter;
