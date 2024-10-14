import { typeUsers, Users } from "@prisma/client";
import db from "../lib/db";
import { ERROR_MESSAGE } from "../utils/constant/error";
import cloudinary from "../middlewares/Config/cloudinary";
import * as fs from "fs"

export const getUser = async (id: number): Promise<Users | null> => {
  return db.users.findFirst({
    where: {
      id,
    },
  });
};


export const insertUser = async (body: Users): Promise<Users> => {
  return db.users.create({
    data: {
      ...body,
      typeUsers: body.typeUsers === "User" ? typeUsers.User : typeUsers.Admin
    }
  });
};

export const deleteUsers = async (id: number): Promise<string> => {
  const existUser = await db.users.findFirst({
    where: {
      id,
    },
  });

  if (!existUser) {
    throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
  }

  await db.users.delete({
    where: {
      id,
    },
  });

  return " Sukses delete user dengan id " + id;
};

export const updateUser = async (
  id: number,
  body: Users,
  files: { [fieldname: string]: Express.Multer.File[] }
): Promise<Users | Error> => {
  const existUser = await db.users.findFirst({
    where: {
      id,
    },
  });

  if (!existUser) {
    throw new Error("User not found!!");
  }

  if (files?.profile) {
    const profile = files?.profile[0]?.path
    const result = await cloudinary.uploader.upload(profile, {
      folder: "dumbflix/profile",
    });
    await db.users.update({
      where: {
        id: id
      },
      data: {
        profile: result.secure_url
      }
    })
    fs.unlinkSync(profile);
  } else {
    const oldThreadData = await db.users.findUnique({
      where: { id: id },
      select: { profile: true },
    });

    const publicId = oldThreadData?.profile?.split("upload").pop()?.slice(13).split(".").shift();
    cloudinary.uploader.destroy(publicId as string);
    await db.users.update({
      where: {
        id: id
      },
      data: {
        profile: body.profile!
      }
    })
  }

  return db.users.update({
    where: {
      id,
    },
    data: body
  });
  // return existUser
};



// update untuk versi function

// export function updateUserFUNC(id: string, body: Users): Promise<Users> {
//     return db.users.update({
//         where: {
//             id
//         },
//         data: body
//     })
// }

export const getSingleUser = async (condition: {
  [key: string]: string;
}): Promise<Users | null> => {
  return db.users.findFirst({
    where: condition,
  });
};

export const SingleUser = async (condition: {
  [key: string]: string;
}) => {
  return db.users.findFirst({
    where: condition,
    select: {
      id: true,
      fullname: true,
      email: true,
      profile: true,
      gender: true,
      phone: true,
      address: true,
      active: true,
    }
  });
};

