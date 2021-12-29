import React from 'react';
import TemperatureSettingsForm from "../Forms/Settings/Weather/TemperatureSettingsForm";
import WidgetTypeEnum from "../../Utils/Enums/WidgetTypeEnum";
import ExchangeRateSettingsForm from "../Forms/Settings/Exchange/ExchangeRateSettingsForm";
import ExchangeRateEvolutionSettingsForm from "../Forms/Settings/Exchange/ExchangeRateEvolutionSettingsForm";
import Wrapper from "../Forms/Settings/Wrapper";
import SteamSettingsForm from "../Forms/Settings/Steam/SteamSettingsForm";
import CinemaMoviesSettingsForm from "../Forms/Settings/Cinema/CinemaMoviesSettingsForm";
import RedditSettingsForm from "../Forms/Settings/Reddit/RedditSettingsForm";
import YoutubeVideoStatsSettingsForm from "../Forms/Settings/Youtube/YoutubeVideoStatsSettingsForm";
import YoutubeChannelStatsSettingsForm from "../Forms/Settings/Youtube/YoutubeChannelStatsSettingsForm";
import YoutubeCommentsSettingsForm from "../Forms/Settings/Youtube/YoutubeCommentsSettingsForm";

const widgetSettingsFormsTab = [
  { type: WidgetTypeEnum.WEATHER_TEMPERATURE, factory: (props) => <TemperatureSettingsForm {...props} /> },
  { type: WidgetTypeEnum.EXCHANGE_RATE, factory: (props) => <ExchangeRateSettingsForm {...props} /> },
  { type: WidgetTypeEnum.EXCHANGE_RATE_EVOLUTION, factory: (props) => <ExchangeRateEvolutionSettingsForm {...props} /> },
  { type: WidgetTypeEnum.PLAYER_COUNT, factory: (props) => <SteamSettingsForm {...props} /> },
  { type: WidgetTypeEnum.CINEMA_MOVIES, factory: (props) => <CinemaMoviesSettingsForm {...props} /> },
  { type: WidgetTypeEnum.SUBREDDIT, factory: (props) => <RedditSettingsForm {...props} /> },
  { type: WidgetTypeEnum.YOUTUBE_VIDEO_STATS, factory: (props) => <YoutubeVideoStatsSettingsForm {...props} /> },
  { type: WidgetTypeEnum.YOUTUBE_CHANNEL_STATS, factory: (props) => <YoutubeChannelStatsSettingsForm {...props} /> },
  { type: WidgetTypeEnum.YOUTUBE_COMMENTS, factory: (props) => <YoutubeCommentsSettingsForm {...props} /> }
];

export default function WidgetSettingsForms({reqWidgetType, resetWidgetType, handleWidgetReq, widgetToUpdate}) {
    return (
      <div>
        {widgetSettingsFormsTab.map((form, key) => (
          <Wrapper open={reqWidgetType === form.type}
                   resetWidgetType={resetWidgetType}
                   type={form.type}
                   key={key}
          >
            {form.factory({handleWidgetReq, widgetToUpdate})}
          </Wrapper>
        ))}
      </div>
    );
}
