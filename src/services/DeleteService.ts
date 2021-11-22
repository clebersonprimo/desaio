import { Movie } from "../models/Movie";
import { IMoviesRepository } from "../repositories/IMoviesRepository";

class DeleteService {

    constructor(private moviesRepository:IMoviesRepository) {}

    public async execute():Promise<void> {
        await this.moviesRepository.deleteAll();
    }
}

export { DeleteService };