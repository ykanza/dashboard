import express from 'express';
import axios from "axios";
import SteamService from '../Services/SteamService';

class SteamController {
    static async playerCount(req: express.Request, res: express.Response) {
        const { id } = req.params;
        const data = await SteamService.getplayerCount(id);
        res.json(data);
    }
}

export default SteamController;
