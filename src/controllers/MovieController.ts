import { Request, Response } from "express";
import { CreateMovieService } from "../services/CreateMovieService";
import { DeleteService } from "../services/DeleteService";
import { ImportMovieService } from "../services/ImportMovieService";
import { ListMovieService } from "../services/ListMoviesService";
import { StatisticsAwardService } from "../services/StatisticsAvawdService";
import path from "path";
import fs from "fs";
import { ReadFileService } from "../services/ReadFileService";


class MovieController {
    constructor(
        private createMovieService: CreateMovieService,
        private listMovieService: ListMovieService,
        private importMovieService: ImportMovieService,
        private statisticsAwardService: StatisticsAwardService,
        private deleteService: DeleteService,
        private readFileService: ReadFileService,
    ){}
        
    public async createMovieAward(request:Request, response:Response): Promise<Response>{
        const created = await this.createMovieService.execute(request.body);

        return response.status(201).json(created);
    }
    
    public async list(request:Request, response:Response): Promise<Response>{
        const movies = await this.listMovieService.execute();
        return response.json(movies);
    }

    public async import(request:Request, response:Response) {
        const { file } = request;

        const movies = await this.importMovieService.execute(file);

        return response.status(201).send();
    }
    
    public async statistics(request:Request, response:Response) {
        const statistics = await this.statisticsAwardService.execute();

        return response.json(statistics);
    }

    public async delete(request:Request, response:Response) {
        await this.deleteService.execute();

        return response.status(204).send();
    }

    public async readFile() {
        const filePath = path.join(__dirname, '..', '..', 'movielist.csv');

        if(!fs.existsSync(filePath)) {
            return true;
        }

        const data = fs.readFileSync(filePath);

        const movies = await this.readFileService.execute(filePath);
    }

}

export { MovieController };