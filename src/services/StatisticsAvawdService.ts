import { Movie } from "../models/Movie";
import { Statistics } from "../repositories/IMoviesRepository";
import { MoviesRepository } from "../repositories/MoviesRepository";

class StatisticsAwardService {
    constructor(private moviesRepository: MoviesRepository) {}

    public async execute():Promise<any> {
        const winners = await this.moviesRepository.findWinners();

        const min:Statistics[] = [];
        const max:Statistics[] = [];

        min.push(winners[0]);
        max.push(winners[winners.length-1]);

        for(const winner of winners) {
            if(winner.interval == min[0].interval) {
                min.push(winner);
            }

            if(winner.interval == max[0].interval) {
                max.push(winner);
            }
        }

        return {min, max};
    }
}

export { StatisticsAwardService };