import { MoviesRepository } from "../repositories/MoviesRepository";
import { CreateMovieService } from "../services/CreateMovieService";
import { DeleteService } from "../services/DeleteService";
import { ImportMovieService } from "../services/ImportMovieService";
import { ListMovieService } from "../services/ListMoviesService";
import { ReadFileService } from "../services/ReadFileService";
import { StatisticsAwardService } from "../services/StatisticsAvawdService";
import { MovieController } from "./MovieController";


const moviesRepository = MoviesRepository.getInstance();
const createMovieService = new CreateMovieService(moviesRepository);
const listMovieService = new ListMovieService(moviesRepository);
const importMovieService = new ImportMovieService(moviesRepository);
const statisticsAwardService = new StatisticsAwardService(moviesRepository);
const deleteService = new DeleteService(moviesRepository);
const readFileService = new ReadFileService(moviesRepository);

const movieController = new MovieController(
    createMovieService,
    listMovieService,
    importMovieService,
    statisticsAwardService,
    deleteService,
    readFileService
);


export { movieController };