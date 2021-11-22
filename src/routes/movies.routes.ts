import { Router } from 'express';
import { movieController } from '../controllers';
import multer from 'multer';

const movieRoute = Router();

const upload = multer({
    dest: "./tmp"
});

movieRoute.post("/", async (request, response) => {
    return await movieController.createMovieAward(request, response);
});

movieRoute.post("/import", upload.single("file"), async (request, response) => {
    return await movieController.import(request, response);
});

movieRoute.get("/", async (request, response) => {
    return await movieController.list(request, response);
});

movieRoute.get("/statistics", async (request, response) => {
    return await movieController.statistics(request, response);
});

movieRoute.delete("/", async (request, response) => {
    return await movieController.delete(request, response);
});

export { movieRoute };