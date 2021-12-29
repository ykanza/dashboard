import React from 'react';
import {Grid, TextField, Typography, Slider} from '@mui/material';
import {useState} from "react";
import useStyles from '../../../Views/styles';
import WidgetTypeEnum from "../../../../Utils/Enums/WidgetTypeEnum";

export default function ExchangeRateSettingsForm({handleWidgetReq, widgetToUpdate}) {
    const classes = useStyles();

    const [pair, setPair] = useState('');
    const [frequency, setFrequency] = useState(50);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('');

        if (pair === '') {
            setError('Bad pair (Ex: BTCUSDT)');
        } else {
            if (widgetToUpdate) {
                widgetToUpdate.settings.pair = pair;
                widgetToUpdate.frequency = frequency;
                handleWidgetReq(widgetToUpdate, true);
            } else {
                handleWidgetReq({
                    type: WidgetTypeEnum.EXCHANGE_RATE,
                    settings: { pair: pair },
                    frequency: frequency
                });
            }
        }
    }

    return (
        <form noValidate id={`form${WidgetTypeEnum.EXCHANGE_RATE}`} autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography gutterBottom className={classes.typographyClass}>Exchange rate</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                      onChange={(e) => setPair(e.target.value)}
                      label="Pair"
                      fullWidth
                      required
                      error={Boolean(error)}
                      helperText={error}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography gutterBottom className={classes.typographyClass}>Frequency (seconds)</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Slider min={1} defaultValue={50} aria-label="Default" valueLabelDisplay="auto" onChange={(e) => setFrequency(e.target.value)}/>
                </Grid>
            </Grid>
        </form>
    );
}
