import { v4 as uuidv4 } from 'uuid';

class Movie {
    id?: string;
    year:number;
    title:string;
    studios:string;
    producers:string;
    winner:string;
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidv4();
        }
    }
}

export { Movie };