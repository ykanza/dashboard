import express from 'express';
import WeatherService from "../Services/WeatherService";

class WeatherController {
    static async temperature(req: express.Request, res: express.Response) {
        const {city} = req.params;
        const data = await WeatherService.getTemperature(city);

        res.json(data);
    }
}

export default WeatherController;
