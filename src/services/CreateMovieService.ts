import { AppError } from "../errors/AppError";
import { Movie } from "../models/Movie";
import { IMoviesRepository } from "../repositories/IMoviesRepository";
import "express-async-errors";

interface IRequest {
    year:number;
    title:string;
    studios:string;
    producers:string;
    winner:string;
}

class CreateMovieService {

    constructor(private moviesRepository:IMoviesRepository) {}

    public async execute({ year, title, studios, producers, winner }:IRequest):Promise<Movie> {
        const movieAlreadyExists = await this.moviesRepository.findMovieAward(title, year);

        if(movieAlreadyExists) {
            throw new AppError("Movie already exists", 400);
        }

        return this.moviesRepository.create({ year, title, studios, producers, winner });
    }
}

export { CreateMovieService };