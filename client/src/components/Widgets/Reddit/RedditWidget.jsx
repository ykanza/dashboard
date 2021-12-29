import React from 'react';
import { Grid, Typography, Card, CardContent, CardHeader, Avatar, CircularProgress, Divider, Box } from "@mui/material";
import {useEffect, useState} from "react";
import Draggable from 'react-draggable';
import {ApiService} from "../../Services/ApiService";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { blue, green } from '@mui/material/colors';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ActionButtons from "../ActionButtons";


export default function RedditWidget({widget, handleWidgetDeletion, getReadyWidgetUpdate}) {
    const [sub, setSub] = useState(null);
    const nodeRef = React.useRef(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await ApiService.clientWrapper(`/reddit/${widget.settings.name}`, true);
            if (!response.data.error)
                setSub(response.data);
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
                    <Avatar src={'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png'}>
                      </Avatar>
                  }
                  action={
                      <ActionButtons
                        widget={widget}
                        getReadyWidgetUpdate={getReadyWidgetUpdate}
                        handleWidgetDeletion={handleWidgetDeletion}
                      />
                  }
                  title={'r/'+ widget.settings.name}
                />
                <Divider />
                {!sub ?
                  (<Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {error ? (<div>Subreddit not found</div>) : (<CircularProgress color="inherit" />)}
                    </Box>
                  ) :
                    (<CardContent>
                          <Grid container spacing={3}>
                          <Grid item xs={5}>
                          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, whiteSpace: 'inherit' }}>{sub.sub} Members</Typography>
                          </Grid>
                            <Grid item xs={1}><FiberManualRecordIcon sx={{ color: green[500], marginTop: 0.5}} /></Grid>
                              <Grid item xs={5}>
                                  <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, whiteSpace: 'inherit' }}>{sub.online} Online</Typography>
                              </Grid>
                          </Grid>
                        <Divider />
                        <Grid container spacing={5}>
                            <Grid item xs={2}>
                                {sub.type === 'public' ? <LockOpenIcon sx={{ color: blue[500], marginTop: 4}}  /> : <LockOutlinedIcon sx={{ color: blue[500], marginTop: 4}}  />}
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 0, whiteSpace: 'inherit', marginTop: 3.5}}>{sub.type}</Typography>
                        </Grid>
                        </Grid>

                      </CardContent>
                    )}
            </Card>
        </Draggable>
    );
}
