import React, {useEffect, useState} from 'react';
import {Box, CssBaseline} from '@mui/material';
import AppBar from './Layout/AppBar';
import DrawerHeader from './Layout/DrawerHeader';
import Main from './Layout/Main';
import WidgetTypeEnum from "../../Utils/Enums/WidgetTypeEnum";
import TemperatureWidget from "../Widgets/Weather/TemperatureWidget";
import {ApiService} from "../Services/ApiService";
import WidgetSettingsForms from "./WidgetSettingsForms";
import Drawer from "./Layout/Drawer";
import widgetTypeEnum from "../../Utils/Enums/WidgetTypeEnum";
import ExchangeRateWidget from "../Widgets/Exchange/ExchangeRateWidget";
import SteamWidget from "../Widgets/Steam/SteamWidget";
import MoviesWidget from "../Widgets/Cinema/MoviesWidget";
import SubredditWidget from "../Widgets/Reddit/RedditWidget";
import YoutubeVideoStatsWidget from "../Widgets/Youtube/YoutubeVideoStatsWidget";
import YoutubeChannelStatsWidget from "../Widgets/Youtube/YoutubeChannelStatsWidget";
import YoutubeCommentsWidget from "../Widgets/Youtube/YoutubeCommentsWidget";
import ExchangeRateEvolutionWidget from "../Widgets/Exchange/ExchangeRateEvolutionWidget";

const widgetComponents = {
    [WidgetTypeEnum.WEATHER_TEMPERATURE]: (props) => <TemperatureWidget {...props} />,
    [WidgetTypeEnum.EXCHANGE_RATE]: (props) => <ExchangeRateWidget {...props} />,
    [WidgetTypeEnum.EXCHANGE_RATE_EVOLUTION]: (props) => <ExchangeRateEvolutionWidget {...props} />,
    [WidgetTypeEnum.PLAYER_COUNT]: (props) => <SteamWidget {...props} />,
    [WidgetTypeEnum.CINEMA_MOVIES]: (props) => <MoviesWidget {...props} />,
    [WidgetTypeEnum.SUBREDDIT]: (props) => <SubredditWidget {...props} />,
    [WidgetTypeEnum.YOUTUBE_VIDEO_STATS]: (props) => <YoutubeVideoStatsWidget {...props} />,
    [WidgetTypeEnum.YOUTUBE_CHANNEL_STATS]: (props) => <YoutubeChannelStatsWidget {...props} />,
    [WidgetTypeEnum.YOUTUBE_COMMENTS]: (props) => <YoutubeCommentsWidget {...props} />,
};

export default function DashboardComponent() {
    const [open, setOpen] = useState(false);
    const [widgetType, setWidgetType] = useState(WidgetTypeEnum.DEFAULT);
    const [widgets, setWidgets] = useState([]);
    const [widgetToUpdate, setWidgetToUpdate] = useState(null);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const fetchWidgets = async () => {
        const response = await ApiService.clientWrapper('/widget', true);
        setWidgets(response.data);
    }

    const handleWidgetDeletion = async (widgetId) => {
        const response = await ApiService.clientWrapper(`/widget/${widgetId}`, true, 'delete');
        await fetchWidgets();
    }

    const handleWidgetReq = async (values, update = false) => {
        const method = update ? 'put' : 'post';
        const response = await ApiService.clientWrapper('/widget', true, method, values);

        setWidgetToUpdate(null);
        setWidgetType(WidgetTypeEnum.DEFAULT);
        setOpen(false);
        await fetchWidgets();
    }

    const getReadyWidgetUpdate = (widget) => {
        setWidgetToUpdate(widget);
        setWidgetType(widget.type);
    }

    const handleAllWidgetsDeletion = async () => {
        const response = await ApiService.clientWrapper(`/clear`, true, 'delete');
        await fetchWidgets();
    }

    useEffect(() => {
        (async function fetchWidgetsOnMount() {
            await fetchWidgets();
        })();
    }, []);

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                  open={open}
                  handleDrawerOpen={handleDrawerOpen}
                />
                <Drawer
                  open={open}
                  handleDrawerClose={handleDrawerClose}
                  setWidgetType={setWidgetType}
                  handleAllWidgetsDeletion={handleAllWidgetsDeletion}
                />
                <Main open={open}>
                    <DrawerHeader handleDrawerClose={handleDrawerClose}/>
                </Main>
            </Box>
            <WidgetSettingsForms
              reqWidgetType={widgetType}
              resetWidgetType={() => {
                  setWidgetType(widgetTypeEnum.DEFAULT);
                  setWidgetToUpdate(null);
                }
              }
              handleWidgetReq={handleWidgetReq}
              widgetToUpdate={widgetToUpdate}
            />
            <div className="bg" style={{
                position:'absolute',
                width:'100%',
                top:'7.0%',
                height:'93%',
                backgroundImage: 'url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/a6ebd221d8b013c3d2d526c0b401e93c/photo-1630495325532-815f8d91a31e.jpg)',
                backgroundSize: 'cover',
            }}></div>
            <div className="container" style={{
                position:'absolute',
                width:'100%',
                top:'7.0%',
                height:'93%',
            }}>
                {widgets.map((widget, key) => (
                  widgetComponents[widget.type]({widget, key, handleWidgetDeletion, getReadyWidgetUpdate})
                ))}
            </div>
        </div>
    );
}
