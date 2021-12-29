import React from 'react';
import { Grid, Typography, Card, CardContent, CardHeader, Avatar, CircularProgress, Divider, Box } from "@mui/material";
import {useEffect, useState} from "react";
import Draggable from 'react-draggable';
import {ApiService} from "../../Services/ApiService";
import { blue } from "@mui/material/colors";
import MovieIcon from '@mui/icons-material/Movie';
import ActionButtons from "../ActionButtons";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function MoviesWidget({widget, handleWidgetDeletion, getReadyWidgetUpdate}) {
    const [values, setValues] = useState([]);
    const nodeRef = React.useRef(null);

    useEffect(() => {
        async function fetchData() {
            const response = await ApiService.clientWrapper(`/cinema/${widget.settings.type}/${widget.settings.name}`, true);

            if (!response.data.error)
                setValues(response.data.data);
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
                      <Avatar sx={{ bgcolor: blue[700] }}>
                          <MovieIcon/>
                      </Avatar>
                  }
                  action={
                      <ActionButtons
                        widget={widget}
                        getReadyWidgetUpdate={getReadyWidgetUpdate}
                        handleWidgetDeletion={handleWidgetDeletion}
                      />
                  }
                  title={`Movies found for "${widget.settings.name}": `}
                />
                <Divider />
                {values ?
                    (<CardContent>
                        {values.map((value, key) => (
                            <Grid container spacing={3} key={key}>

                                <Grid item xs={2}>
                                <Avatar variant={"rounded"} alt="poster" src={value.Poster} style={{
                                    width: 50,
                                    height: 50,}} />
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, whiteSpace: 'inherit' }}>{value.Title + ' (' + value.Year + ')'}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                </Grid>
                            </Grid>
                        ))}
                    </CardContent>
                    )
                    : (<Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress color="inherit" />
                    </Box>
                    )
                }
            </Card>
        </Draggable>
    );
}
