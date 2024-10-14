import { Router } from "express";
import * as filmController from "../controllers/filmController"
import authentication from "../middlewares/authentication";
import uploadMiddleware from "../middlewares/uploads";

const filmRouter = Router()

filmRouter.get("/listFilm", authentication, filmController.getFilm)
filmRouter.post("/addFilm", uploadMiddleware("thumbnail"), authentication, filmController.addFilm)
filmRouter.post("/addEpisode", uploadMiddleware("episode"), authentication, filmController.addEpisode)
filmRouter.delete("/deleteFilm/:id",)
filmRouter.put("/editFilm/:id",)

export default filmRouter