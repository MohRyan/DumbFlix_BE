import { Episode, Film } from "@prisma/client";
import db from "../lib/db";
import cloudinary from "../middlewares/Config/cloudinary";
import * as fs from "fs"

export const getFilm = async (id: number): Promise<Film[] | null> => {
    const user = await db.users.findUnique({
        where: {
            id,
        }
    });

    if (!user?.id) {
        throw new Error("User not found!!");
    }

    return db.film.findMany({
        where: {
            userId: id,
        },
    });
};

export const addFilm = async (
    id: number,
    body: Film,
    files: { [fieldname: string]: Express.Multer.File[] }
): Promise<Film | null> => {
    let admin = await db.users.findUnique({
        where: {
            id,
        },
    });
    // console.log("🚀 ~ admin:", admin)

    // Validasi admin
    if (!admin?.id) {
        throw new Error("User not found!!");
    }
    if (admin?.typeUsers !== "Admin") {
        throw new Error("User is not an Admin, cannot add film");
    }

    const { id: filmId, userId, ...filmData } = body;

    let thumbnailUrl = ""; // Inisialisasi thumbnailUrl

    if (files?.thumbnail) {
        const thumbnail = files?.thumbnail[0]?.path;
        const result = await cloudinary.uploader.upload(thumbnail, {
            folder: `dumbflix/${body.type === "Movie" ? "Movie" : "TVSeries"}`,
        });
        thumbnailUrl = result.secure_url; // Simpan URL thumbnail
        fs.unlinkSync(thumbnail);
    }

    // Buat film dengan thumbnail yang benar
    return await db.film.create({
        data: {
            ...filmData,
            year: 2024, // Pastikan ini adalah integer
            thumbnail: thumbnailUrl, // Gunakan URL thumbnail yang valid
            user: {
                connect: {
                    id: id,
                },
            },
        },
    });
};

export const addEpisode = async (
    id: number,
    body: Episode,
    files: { [fieldname: string]: Express.Multer.File[] }
) => {

    return await db.$transaction(async (db) => {
        let admin = await db.users.findUnique({
            where: {
                id,
            },
        });
        // console.log("🚀 ~ admin:", admin)

        // Validasi admin
        if (!admin?.id) {
            throw new Error("User not found!!");
        }
        if (admin?.typeUsers !== "Admin") {
            throw new Error("User is not an Admin, cannot add film");
        }

        if (!files) {
            return null
        } else {
            // check if multiple files are uploaded
            if (Array.isArray(files)) {
                console.log("test1")
                for (const file of files as Express.Multer.File[]) {
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: "dumbflix/TVSeries",
                    });
                    fs.unlinkSync(file.path);
                    return await db.episode.create({
                        data: {
                            ...body,
                            thumbnail_episode: result.secure_url,
                            filmId: 16
                        }
                    })
                }
            } else {
                console.log("test 2")
                console.log("🚀 ~ returnawaitdb.$transaction ~ files:", files)
                // single file uploaded
                const file = files as unknown as Express.Multer.File;
                const result = await cloudinary.uploader.upload((file as any).episode[0].path, {
                    folder: "dumbflix/TVSeries",
                });
                console.log("result", result.secure_url)
                fs.unlinkSync((file as any).episode[0].path);

                return await db.episode.create({
                    data: {
                        ...body,
                        thumbnail_episode: result.secure_url,
                        filmId: 16
                    }
                })
            }
        }
    })
};

