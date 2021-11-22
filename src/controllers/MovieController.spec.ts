import request from "supertest";
import fs from "fs";
import { app } from "../app";
import path from "path";

describe('POST /movies/import', () => {

    // const filePath = `${__dirname}\\movielist.csv`;
    const filePath = path.join(__dirname, '..', '..', 'movielist.csv');
    it('should import the test file', async () => {
        if(!fs.existsSync(filePath)) {
            throw new Error('file does not exist'); 
        }
        
        const response = await request(app).post('/movies/import').attach('file', filePath)

        expect(response.status).toBe(201);
    })
});

describe("GET /movies/statistics", () => {
    it("should be able to get statisics from Golden Raspbery Awards", async () => {
        const response = await request(app).get("/movies/statistics");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("min");
        expect(response.body).toHaveProperty("max");
    });
});