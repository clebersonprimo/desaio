import { app } from "./app";
import { movieController } from './controllers';

app.listen(8000, () => { console.log("Server running!!!"); movieController.readFile() });