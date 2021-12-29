import express from 'express';
import YoutubeService from "../Services/YoutubeService";

class YoutubeController {
    static async channelStats(req: express.Request, res: express.Response) {
        const { name } = req.params;
        const data = await YoutubeService.getChannelStats(name);

        return res.json(data);
    }

    static async videoStats(req: express.Request, res: express.Response) {
        const { name } = req.params;
        const data = await YoutubeService.getVideoStats(name);

        return res.json(data);
    }

    static async comments(req: express.Request, res: express.Response) {
        const { name } = req.params;
        const data = await YoutubeService.getComments(name);

        return res.json(data);
    }
}

export default YoutubeController;
