import { Router } from "express";
import * as paymenController from "../controllers/paymentController"

const paymentRouter = Router()

paymentRouter.post("/createTransaction", paymenController.createPayPremium)

export default paymentRouter