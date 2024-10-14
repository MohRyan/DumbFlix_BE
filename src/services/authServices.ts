import { Users } from "@prisma/client";
import registerSchema from "../lib/validation/registerValidation";
import { ERROR_MESSAGE } from "../utils/constant/error";
import * as userService from "./userServices";
import bycrpt from "bcrypt";
import loginSchema from "../lib/validation/loginVlidation";
import jwt from "jsonwebtoken";

const register = async (body: Users): Promise<{ id: number }> => {
  // 1. untuk mengvalidasi atau konfirmasi type data dari form Users
  const { error, value } = registerSchema.validate(body);
  if (error?.details) {
    console.log("🚀 ~ register ~ error:", error);

    throw new Error(ERROR_MESSAGE.WRONG_INPUT);
  }

  // 2. untuk mengecek emailnya ada atau tidak
  const existEmail = await userService.getSingleUser({
    email: value.email,
  });

  // 3. untuk meng encryptkan password menggunakan bycrpt ( hash )
  const hashedPassword = await bycrpt.hash(value.password, 10);

  const user = await userService.insertUser({
    ...value,
    password: hashedPassword,
  });

  return { id: user.id };
};

const login = async (body: Users): Promise<{ token: string, user: Users }> => {
  // 1. untuk meng validate atau mengkonfirmasi inputan dari form login
  const { error, value } = loginSchema.validate(body);

  if (error?.details) {
    console.log("🚀 ~ login ~ error:", error);

    throw new Error(ERROR_MESSAGE.WRONG_INPUT);
  }

  // 2. untuk mengecek adanya email atau tidak
  const existEmail = await userService.getSingleUser({
    email: value.email,
  });

  if (!existEmail) {
    throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
  }

  // 3. untuk mengecek password yang sudah dihash ( mencocokkan password compare dengan password hash )
  const isMatch = await bycrpt.compare(
    value.password,
    existEmail.password as string
  );
  if (!isMatch) {
    throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
  }

  const token = jwt.sign(existEmail, process.env.SECRET_KEY!, {
    expiresIn: "2d",
  });

  return {
    token,
    user: existEmail
  };
};

const checkToken = async (id: string) => {
  // untuk mengecek adanya email atau tidak


  const existUser = await userService.SingleUser({
    id: id,
  });

  if (!existUser) {
    throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
  }

  return {
    userLogin: existUser
  };
};


export { register, login, checkToken };
