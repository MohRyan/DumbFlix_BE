import { Request, Response } from "express";
import * as authService from "../services/authServices";
import { Users } from "@prisma/client";
import { errorHandler } from "../utils/errorHandler";

export const register = async (req: Request, res: Response) => {
  try {
    const dataRegister = await authService.register(req.body as Users);
    res.status(200).json(dataRegister);
  } catch (error) {
    console.log("🚀 ~ register ~ error:", error);

    return errorHandler(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const dataLogin = await authService.login(req.body as Users);
    res.status(200).json(dataLogin);
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);

    return errorHandler(error, res);
  }
};

export const checkToken = async (req: Request, res: Response) => {
  try {

    const { id } = res.locals.userId
    const dataLogin = await authService.checkToken(id);
    res.status(200).json(dataLogin);
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);

    return errorHandler(error, res);
  }
};
