import express from 'express';
import ExchangeService from "../Services/ExchangeService";

class ExchangeController {
    static async rate(req: express.Request, res: express.Response) {
        const { pair } = req.params;
        const infoExchange = await ExchangeService.getRate(pair);

        res.json(infoExchange);
    }

    static async evolution(req: express.Request, res: express.Response) {
        const { pair } = req.params;
        const dailyEvolution = await ExchangeService.getEvolution(pair);

        res.json(dailyEvolution);
    }
}

export default ExchangeController;
