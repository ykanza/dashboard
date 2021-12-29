import React from 'react';
import { Grid, Typography, Card, CardContent, CardHeader, Avatar, CircularProgress, Divider, Box } from "@mui/material";
import {useEffect, useState} from "react";
import Draggable from 'react-draggable';
import {ApiService} from "../../Services/ApiService";
import { grey } from '@mui/material/colors';
import ActionButtons from "../ActionButtons";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { blue, red } from '@material-ui/core/colors';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';


export default function YoutubeVideoStatsWidget({widget, handleWidgetDeletion, getReadyWidgetUpdate}) {
    const [stat, setStat] = useState();
    const [error, setError] = useState(false);
    const nodeRef = React.useRef(null);

    useEffect(() => {
        async function fetchData() {
            const response = await ApiService.clientWrapper(`/youtube/video/stats/${widget.settings.name}`, true);
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
                    title={'Youtube Video'}
                />
                <Divider />
                {stat && !error ?
                    (<CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={15}>
                            <Avatar variant={"rounded"} alt="poster" src={stat.thumbnailUrl} style={{
                                    width: 370,
                                    height: 200,}} />
                            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, whiteSpace: 'inherit' }} style={{fontSize: 20, marginTop: 10, fontWeight:'bold'}}>{stat.title + ' - ' + stat.channelTitle}</Typography>
                            </Grid>
                      
                        </Grid>
                        <Divider />
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, whiteSpace: 'inherit' }} style={{fontSize: 15, marginTop: 2, fontWeight:'bold', color: grey[700]}}>{stat.stats.viewCount + ' vues'}</Typography>
                            </Grid>
                            <Grid item xs={1}><ThumbUpIcon sx={{ color: blue[500], marginTop: 0.5, width: 20}} /></Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, whiteSpace: 'inherit', fontSize: 15, marginTop: 0.5}}>{stat.stats.likeCount}</Typography>
                            </Grid>
                            <Grid item xs={1}><ThumbDownIcon sx={{ color: red[500], marginTop: 0.5, width: 20}} /></Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, whiteSpace: 'inherit', fontSize: 15, marginTop: 0.5}}>{stat.stats.dislikeCount}</Typography>
                            </Grid>
                        </Grid>
               

                    </CardContent>
                    )
                    :
                    (<Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        {error ? (<div>Not found</div>) : (<CircularProgress color="inherit" />)}
                    </Box>
                    )
                }
            </Card>
        </Draggable>
    );
}
