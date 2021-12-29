import React from 'react';
import { Grid, Typography, Card, CardContent, CardHeader, Avatar, CircularProgress, Divider, Box } from "@mui/material";
import {useEffect, useState} from "react";
import Draggable from 'react-draggable';
import {ApiService} from "../../Services/ApiService";
import { red } from '@mui/material/colors';
import ActionButtons from '../ActionButtons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function YoutubeChannelStatsWidget({widget, handleWidgetDeletion, getReadyWidgetUpdate}) {
    const [stat, setStat] = useState(null);

    const [error, setError] = useState(false);
    const nodeRef = React.useRef(null);

    useEffect(() => {
        async function fetchData() {
            const response = await ApiService.clientWrapper(`/youtube/channel/stats/${widget.settings.name}`, true);
            if (!response.data.error)
                setStat(response.data.data);
            else {
                setError(true);
            }
        }
        fetchData();
        const interval = setInterval(async () => {
            await fetchData();
        }, widget.frequency * 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Draggable nodeRef={nodeRef} bounds="parent">
            <Card variant="outlined" style={{ width: 400, backgroundColor: 'white', color: 'inherit', cursor: 'move' }}>
                <CardHeader
                  avatar={
                    <Avatar src={'https://www.specialolympics.asso.fr/wp-content/uploads/2020/04/youtube-logo-icon-transparent-32-1536x1086.png'}>
                      </Avatar>
                  }
                  action={
                      <ActionButtons
                        widget={widget}
                        getReadyWidgetUpdate={getReadyWidgetUpdate}
                        handleWidgetDeletion={handleWidgetDeletion}
                      />
                    }
                    title={'Youtube Channel'}
                />
                <Divider />
                {stat && !error ?
                    (<CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                            <Avatar rounded alt="poster" src={stat.snippet.thumbnails.medium.url} style={{
                                    width: 50,
                                    height: 50,}} />
                            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, whiteSpace: 'inherit', fontSize: 15}}>{stat.snippet.title}</Typography>
                            </Grid>

                            <Grid item xs={10}>
                            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, whiteSpace: 'inherit', fontSize: 15}}>{stat.snippet.description}</Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={1}>
                        <Grid item xs={1}><AccountCircleIcon sx={{ color: red[500], marginTop: 0.5, width: 30}} /></Grid>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, whiteSpace: 'inherit' }} style={{fontSize: 13, marginTop: 13, marginLeft: 8,fontWeight:'bold'}}>{stat.statistics.subscriberCount + ' Subcribers'}</Typography>
                        </Grid>
                    </CardContent>
                    ) :
                    (<Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        {error ? (<div>Not found</div>) : (<CircularProgress color="inherit" />)}
                    </Box>
                    )
                }
            </Card>
        </Draggable>
    );
}
