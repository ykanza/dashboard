import React from 'react';
import {
    Grid,
    Typography,
    Card,
    CardContent,
    CardHeader, Avatar, CircularProgress, Divider, Box
} from "@mui/material";
import {useEffect, useState} from "react";
import Draggable from 'react-draggable';
import {ApiService} from "../../Services/ApiService";
import ActionButtons from "../ActionButtons";


export default function SteamWidget({widget, handleWidgetDeletion, getReadyWidgetUpdate}) {
    const [value, setValue] = useState();
    const nodeRef = React.useRef(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await ApiService.clientWrapper(`/steam/${widget.settings.name}`, true);
            if (!response.data.error)
                setValue(response.data.count);
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
                      <Avatar src={'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/langfr-440px-Steam_icon_logo.svg.png'}>
                      </Avatar>
                  }
                  action={
                      <ActionButtons
                        widget={widget}
                        getReadyWidgetUpdate={getReadyWidgetUpdate}
                        handleWidgetDeletion={handleWidgetDeletion}
                      />
                  }
                  title={"Player online : "}
                />
                <Divider />
                {value && !error ?
                    (<CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={10}>
                                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, whiteSpace: 'inherit' }}>{value}</Typography>
                                </Grid>
                            </Grid>
                    </CardContent>
                    )
                    : (<Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {error ? (<div>Game not found</div>) : (<CircularProgress color="inherit" />)}
                    </Box>
                    )
                }
            </Card>
        </Draggable>
    );
}
