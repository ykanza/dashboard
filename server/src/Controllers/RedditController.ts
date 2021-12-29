import express from 'express';
import axios from "axios";
import RedditService from '../Services/RedditService';

class RedditController {
    static async post(req: express.Request, res: express.Response) {
        const { subreddit } = req.params;
        const data = await RedditService.getPost(subreddit);
        res.json(data);
    }
}

export default RedditController;
