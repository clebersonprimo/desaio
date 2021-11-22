import { Movie } from "../models/Movie";
import { IMoviesRepository } from "../repositories/IMoviesRepository";

interface IRequest {
    year:number;
    title:string;
    studios:string;
    producers:string;
    winner:string;
}

class ListMovieService {

    constructor(private moviesRepository:IMoviesRepository) {}

    public async execute():Promise<Movie[]> {
        const movies = await this.moviesRepository.list();
        
        return movies;
    }
}

export { ListMovieService };