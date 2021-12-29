import express from 'express';
import about from '../about';

class AboutController {
    static async getData(req: express.Request, res: express.Response) {
        about.client.host = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string;
        about.server.current_time = Math.floor(new Date().getTime() / 1000);

        res.json(about);
    }
}

export default AboutController;
