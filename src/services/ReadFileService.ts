import fs from "fs";
import { parse } from "csv-parse";
import { MoviesRepository } from "../repositories/MoviesRepository";
import { IMovieDTO } from "../repositories/IMoviesRepository";
import { AppError } from "../errors/AppError";



class ReadFileService {

    constructor(private moviesRepository: MoviesRepository) {}

    private async loadMovies(file:string):Promise<IMovieDTO[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file);
            const movies:IMovieDTO[] = [];
        
            const parseFile = parse({delimiter: ";", columns: true});

            stream.pipe(parseFile);

            parseFile.on("data", async line => {
                movies.push(line);

            }).on("end", () => {
                resolve(movies);
            })
            .on("error", (err) => {
                reject(err);
            });
        });
    }

    public async execute(file:string):Promise<void> {
        const movies = await this.loadMovies(file);

        if(movies.length > 0) {
            const line = movies[0];
            const keys = Object.keys(line);
    
            for(const key of keys) {
                if(["year","title","studios","producers","winner"].indexOf(key) == -1) {
                    throw new AppError("Incorrect data format", 400);
                }
            }
    
            await this.moviesRepository.createBatch(movies);
        }
    }
}

export { ReadFileService };