import { Request, Response } from "express";
import * as paymentServices from "../services/paymentServices";

export const createPayPremium = async (req: Request, res: Response) => {
    try {
        const { amount } = req.body;

        const dataPayment = await paymentServices.paymentPremiumService(+amount);

        res.status(200).json(dataPayment);
    } catch (error) {
        console.log("🚀 ~ getUser ~ error:", error);


        const err = error as unknown as Error;

        res.status(500).json({
            message: err.message,
        });
    }
}; 