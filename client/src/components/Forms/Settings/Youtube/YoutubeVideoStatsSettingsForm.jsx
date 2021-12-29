import React from 'react';
import {Grid, TextField, Typography, Slider} from '@mui/material';
import {useState} from "react";
import useStyles from '../../../Views/styles';
import WidgetTypeEnum from "../../../../Utils/Enums/WidgetTypeEnum";

export default function YoutubeVideoStatsSettingsForm({handleWidgetReq, widgetToUpdate}) {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState(50);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('');

        if (name === '') {
            setError('Bad video name');
        } else {
            if (widgetToUpdate) {
                widgetToUpdate.settings.name = name;
                widgetToUpdate.frequency = frequency;
                handleWidgetReq(widgetToUpdate, true);
            } else {
                handleWidgetReq({
                    type: WidgetTypeEnum.YOUTUBE_VIDEO_STATS,
                    settings: { name: name },
                    frequency: frequency
                });
            }
        }
    }

    return (
        <form noValidate id={`form${WidgetTypeEnum.YOUTUBE_VIDEO_STATS}`} autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography gutterBottom className={classes.typographyClass}>Find your Youtube Video</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                      onChange={(e) => setName(e.target.value)}
                      label="Youtube Video"
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
