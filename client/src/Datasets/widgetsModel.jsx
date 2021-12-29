import WidgetTypeEnum from "../Utils/Enums/WidgetTypeEnum";
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import GamepadOutlinedIcon from '@mui/icons-material/GamepadOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CommentIcon from '@mui/icons-material/Comment';

const widgetsModel = [
    {
        label: 'Weather',
        icon: () => <WbSunnyOutlinedIcon/>,
        submenu: [
            {
                icon: () => <DeviceThermostatOutlinedIcon/>,
                type: WidgetTypeEnum.WEATHER_TEMPERATURE,
                label: 'Temperature'
            }
        ]
    },
    {
        label: 'Exchange',
        icon: () => <AccountBalanceWalletOutlinedIcon/>,
        submenu: [
            {
                icon: () => <CurrencyExchangeOutlinedIcon/>,
                type: WidgetTypeEnum.EXCHANGE_RATE,
                label: 'Exchange rate'
            },
            {
                icon: () => <AttachMoneyOutlinedIcon/>,
                type: WidgetTypeEnum.EXCHANGE_RATE_EVOLUTION,
                label: 'Daily evolution'
            }
        ]
    },
    {
        label: 'Cinema',
        icon: () => <MovieCreationOutlinedIcon/>,
        submenu: [
            {
                icon: () => <LiveTvOutlinedIcon/>,
                type: WidgetTypeEnum.CINEMA_MOVIES,
                label: 'Movie series List'
            }
        ]
    },
    {
        label: 'Steam',
        icon: () => <GamepadOutlinedIcon/>,
        submenu: [
            {
                icon: () => <SportsEsportsOutlinedIcon/>,
                type: WidgetTypeEnum.PLAYER_COUNT,
                label: 'Game'
            }
        ]
    },
    {
        label: 'Reddit',
        icon: () => <SmartToyOutlinedIcon/>,
        submenu: [
            {
                icon: () => <QuestionAnswerOutlinedIcon/>,
                type: WidgetTypeEnum.SUBREDDIT,
                label: 'Subreddit'
            }
        ]
    },
    {
        label: 'Youtube',
        icon: () => <PlayArrowOutlinedIcon/>,
        submenu: [
            {
                icon: () => <QueryStatsOutlinedIcon/>,
                type: WidgetTypeEnum.YOUTUBE_VIDEO_STATS,
                label: 'Video Stats'
            },
            {
                icon: () => <AccountBoxIcon/>,
                type: WidgetTypeEnum.YOUTUBE_CHANNEL_STATS,
                label: 'Channel Stats'
            },
            {
                icon: () => <CommentIcon/>,
                type: WidgetTypeEnum.YOUTUBE_COMMENTS,
                label: 'Video Comments'
            }
        ]
    }

];

export default widgetsModel;
