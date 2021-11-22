import { Movie } from "../models/Movie";
import { IMovieDTO, IMoviesRepository, Statistics } from "./IMoviesRepository";
import sqlite3 from "sqlite3";

class MoviesRepository implements IMoviesRepository {

    private movies: Movie[];
    private db: any;
    private static INSTANCE: MoviesRepository;

    private constructor() {
        this.movies = [];
        this.db = new sqlite3.Database("database.db");
        this.db.run(`CREATE TABLE if not exists movie_awards (
            id TEXT,
            year INT,
            title TEXT,
            studios TEXT,
            producers TEXT,
            winner TEXT,
            created_at TEXT
            )`);
    }

    public static getInstance(): MoviesRepository {
        if(!MoviesRepository.INSTANCE) {
            MoviesRepository.INSTANCE = new MoviesRepository();
        }

        return MoviesRepository.INSTANCE;
    }

    public async findMovieAward(title:string, year:number):Promise<Movie[]> {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT *
                           FROM movie_awards
                          where title = ?
                            AND year = ?
                          ORDER BY year asc
                        `, [title, year], (err, rows) => {
                if(err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
    
    public async findWinners():Promise<Statistics[]> {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT *, (main.followingWin - main.previousWin) as interval FROM (
                          SELECT m.id
                               , m.producers as producer
                               , m.title
                               , (select min(ma.year)
                                    from movie_awards ma
                                   where ma.producers = m.producers
                                 ) as previousWin
                               , (select max(ma.year)
                                    from movie_awards ma
                                   where ma.producers = m.producers
                                 ) as followingWin
                            FROM movie_awards m
                           WHERE m.winner = ?) as main
                          WHERE (main.followingWin - main.previousWin) > 0
                          ORDER BY (main.followingWin - main.previousWin) asc

                        `, ["yes"], (err, rows) => {
                if(err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    public async create({
        year,
        title,
        studios,
        producers,
        winner,
    }:IMovieDTO):Promise<Movie> {
        const movie:Movie = new Movie();
        Object.assign(movie, {
            year,
            title,
            studios,
            producers,
            winner,
            created_at: new Date()
        })
        this.movies.push(movie);

        return movie;
    }
    
    public async createBatch(movies:Array<IMovieDTO>):Promise<boolean> {

        const statement = this.db.prepare(`INSERT INTO movie_awards (
            id,
            year,
            title,
            studios,
            producers,
            winner,
            created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`);
        for(const movie of movies) {
            const movieAlreadyExists = await this.findMovieAward(movie.title, movie.year);

            if(movieAlreadyExists.length == 0) {
                const objMovie:Movie = new Movie();
                
                const splitProducers = objMovie.producers.replace(" and ", ", ").split(", ");
                
                splitProducers.map(producer => {
                    Object.assign(objMovie, {...movie, ...{created_at: new Date()}});
                    statement.run(
                        objMovie.id,
                        objMovie.year,
                        objMovie.title,
                        objMovie.studios,
                        producer,
                        objMovie.winner,
                        objMovie.created_at
                    );
                });
            }
        };

        statement.finalize();

        return true;
    }

    public async deleteAll():Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run("DELETE FROM movie_awards", [], (err, rows) => {
                if(err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    public async list():Promise<Movie[]> {

        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM movie_awards", [], (err, rows) => {
                if(err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

}

export { MoviesRepository };