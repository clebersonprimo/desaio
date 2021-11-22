import { Movie } from "../models/Movie";

interface IMovieDTO {
    year:number;
    title:string;
    studios:string;
    producers:string;
    winner:string;
}

interface Statistics {
    producer:string;
    previousWin:number;
    followingWin:number;
    interval:number;
}

interface IMoviesRepository {
    list():Promise<Movie[]>;
    findMovieAward(title:string, year:number):Promise<Movie[]>;
    findWinners():Promise<Statistics[]>;
    create({year, title, studios, producers, winner}:IMovieDTO):Promise<Movie>;
    createBatch(movies:Movie[]):Promise<boolean>;
    deleteAll():Promise<void>;
}

export { IMoviesRepository, IMovieDTO, Statistics };