import AuthController from './Controllers/AuthController'
import WidgetController from './Controllers/WidgetController'
import express from 'express'
import cors from 'cors'
import WeatherController from "./Controllers/WeatherController";
import dotenv from 'dotenv';
import {AuthMiddleware} from "./Middlewares/AuthMiddleware";
import ExchangeController from "./Controllers/ExchangeController";
import YoutubeController from './Controllers/YoutubeController';
import CinemaController from './Controllers/CinemaController';
import SteamController from './Controllers/SteamController';
import RedditController from './Controllers/RedditController';
import AboutController from "./Controllers/AboutController";

dotenv.config({path: '../.env'});
const app = express()
const router = express.Router()
const port = 8080

app.use(cors({origin: ['http://localhost:3000']}))
app.use(express.json())

router.get('/about.json', AboutController.getData);

router.get('/api/cinema/:type/:name', AuthMiddleware, CinemaController.listByName);
router.get('/api/steam/:id', AuthMiddleware, SteamController.playerCount);

router.get('/api/reddit/:subreddit', AuthMiddleware, RedditController.post);

router.get('/api/youtube/channel/stats/:name', AuthMiddleware, YoutubeController.channelStats);
router.get('/api/youtube/video/stats/:name', AuthMiddleware, YoutubeController.videoStats);
router.get('/api/youtube/video/comments/:name', AuthMiddleware, YoutubeController.comments);

router.get('/api/weather/:city', AuthMiddleware, WeatherController.temperature);

router.get('/api/exchange/rate/:pair', AuthMiddleware, ExchangeController.rate);
router.get('/api/exchange/evolution/:pair', AuthMiddleware, ExchangeController.evolution);

router.post('/api/widget', AuthMiddleware, WidgetController.createWidget);
router.delete('/api/widget/:id', AuthMiddleware, WidgetController.deleteWidget);
router.put('/api/widget', AuthMiddleware, WidgetController.updateWidget);
router.get('/api/widget', AuthMiddleware, WidgetController.getWidgets);

router.delete('/api/clear', AuthMiddleware, WidgetController.deleteAllWidgets);

router.post('/api/auth/register', AuthController.register);
router.post('/api/auth/login', AuthController.login);

router.post('/api/auth/google/login', AuthController.googleLogin);

app.use(router);
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})
