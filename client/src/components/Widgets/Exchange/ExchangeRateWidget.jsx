import React from 'react';
import { Grid, Typography, Box, Card, CardHeader, Avatar, Divider, CardContent, CircularProgress } from "@mui/material";
import {useEffect, useState} from "react";
import Draggable from 'react-draggable';
import {ApiService} from "../../Services/ApiService";
import { green } from "@mui/material/colors";
import { MonetizationOn } from "@mui/icons-material";
import ActionButtons from "../ActionButtons";

export default function ExchangeRateWidget({widget, handleWidgetDeletion, getReadyWidgetUpdate}) {
    const [price, setPrice] = useState();
    const nodeRef = React.useRef(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await ApiService.clientWrapper(`/exchange/rate/${widget.settings.pair}`, true);
            if (response.data.price != null) {
                setPrice(response.data.price);
            }
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
                    <Avatar sx={{ bgcolor: green[700] }}>
                        <MonetizationOn />
                    </Avatar>
                }
                action={
                    <ActionButtons
                      widget={widget}
                      getReadyWidgetUpdate={getReadyWidgetUpdate}
                      handleWidgetDeletion={handleWidgetDeletion}
                    />
                }
                title={`Exchange rate for pair ${widget.settings.pair}: `}
              />
              <Divider />
              {price && !error ?
                (<CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={10}>
                                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, whiteSpace: 'inherit' }}>{price} $</Typography>
                            </Grid>
                        </Grid>
                  </CardContent>
                )
                : (<Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {error ? (<div>Change not found</div>) : (<CircularProgress color="inherit" />)}
                  </Box>
                )
              }
          </Card>
      </Draggable>
    );
}
