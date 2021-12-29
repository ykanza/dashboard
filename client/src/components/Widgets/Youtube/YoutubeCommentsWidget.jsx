import React from 'react';
import { Grid, Typography, Card, CardContent, CardHeader, Avatar, CircularProgress, Divider, Box } from "@mui/material";
import {useEffect, useState} from "react";
import Draggable from 'react-draggable';
import {ApiService} from "../../Services/ApiService";
import { grey } from '@mui/material/colors';
import ActionButtons from "../ActionButtons";


export default function YoutubeCommentsWidget({widget, handleWidgetDeletion, getReadyWidgetUpdate}) {
    const [comments, setComments] = useState(null);
    const [error, setError] = useState(false);
    const nodeRef = React.useRef(null);

    useEffect(() => {
        async function fetchData() {
            const response = await ApiService.clientWrapper(`/youtube/video/comments/${widget.settings.name}`, true);

            if (!response.data.error)
                setComments(response.data.data);
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
                    title={'Youtube Comments'}
                />
                <Divider />
                {comments && !error ?
                    (<CardContent>
                    {comments.map((comment, key) => (
                            <Grid container spacing={3} key={key}>

                                <Grid item xs={2}>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, whiteSpace: 'inherit' }}>{comment}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                </Grid>
                            </Grid>
                        ))}
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
