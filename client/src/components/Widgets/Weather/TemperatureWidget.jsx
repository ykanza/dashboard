import React from 'react';
import { Grid, Typography, Card, CardContent, CardHeader, Avatar, CircularProgress, Divider, Box } from "@mui/material";
import {useEffect, useState} from "react";
import { WbSunny, Thermostat} from "@mui/icons-material";
import Draggable from 'react-draggable';
import {ApiService} from "../../Services/ApiService";
import { grey, yellow } from "@mui/material/colors";
import ActionButtons from "../ActionButtons";


export default function TemperatureWidget({widget, handleWidgetDeletion, getReadyWidgetUpdate}) {
    const [temp, setTemp] = useState();
    const [error, setError] = useState(false);
    const nodeRef = React.useRef(null);

    useEffect(() => {
        async function fetchData() {
            const response = await ApiService.clientWrapper(`/weather/${widget.settings.city}`, true);
            if (!response.data.error)
                setTemp(response.data.temp);
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
            <Card variant="outlined" style={{ width: 300, backgroundColor: 'white', color: 'inherit', cursor: 'move' }}>
                <CardHeader
                  avatar={
                      <Avatar sx={{ bgcolor: yellow[900] }}>
                          <WbSunny />
                      </Avatar>
                  }
                  action={
                      <ActionButtons
                        widget={widget}
                        getReadyWidgetUpdate={getReadyWidgetUpdate}
                        handleWidgetDeletion={handleWidgetDeletion}
                      />
                  }
                  title={widget.settings.city}
                />
                <Divider />
                {temp && !error ?
                  (<CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={2}><Thermostat sx={{ color: grey[400] }} /></Grid>
                            <Grid item xs={10}>
                                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, whiteSpace: 'inherit' }}>{temp} °C</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                  ) :
                  (<Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {error ? (<div>City found</div>) : (<CircularProgress color="inherit" />)}
                    </Box>
                  )}
            </Card>
        </Draggable>
    );
}
