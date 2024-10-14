import { Request, Response } from "express";
import * as filmService from "../services/filmServices"

export const getFilm = async (req: Request, res: Response) => {
    try {
        const { id } = res.locals.userId
        // console.log("🚀 ~ getFilm ~ id:", id)

        const dataUser = await filmService.getFilm(id);

        res.status(200).json(dataUser);
    } catch (error) {
        console.log("🚀 ~ getUser ~ error:", error);

        const err = error as unknown as Error;

        res.status(500).json({
            message: err.message,
        });
    }
};

export const addFilm = async (req: Request, res: Response) => {
    try {
        const { id } = res.locals.userId
        const film = req.body
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const dataFilm = await filmService.addFilm(id, film, files);

        res.status(200).json(dataFilm);
    } catch (error) {
        // console.log("🚀 ~ getUser ~ error:", error);
        const err = error as unknown as Error;

        res.status(500).json({
            message: err.message,
            halo: "hakii"
        });
    }
};

export const addEpisode = async (req: Request, res: Response) => {
    try {
        const { id } = res.locals.userId
        const episode = req.body
        console.log("first")
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        console.log("second", files)

        const dataEpisode = await filmService.addEpisode(id, episode, files);
        console.log("third", dataEpisode)

        res.status(200).json(dataEpisode);
    } catch (error) {
        // console.log("🚀 ~ getUser ~ error:", error);
        const err = error as unknown as Error;

        res.status(500).json({
            message: err.message,
            halo: "episode"
        });
    }
};