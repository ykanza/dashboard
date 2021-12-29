import express from 'express';
import CinemaService from '../Services/CinemaService';

class CinemaController {
    static async listByName(req: express.Request, res: express.Response) {
        const { type, name } = req.params;
        const data = await CinemaService.getListByName(type, name);

        res.json(data);
    }
}

export default CinemaController;
