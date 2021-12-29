import React from 'react';
import { Grid, TextField, Typography, Slider, } from "@mui/material";
import {useState} from "react";
import useStyles from '../../../Views/styles';
import WidgetTypeEnum from "../../../../Utils/Enums/WidgetTypeEnum";

export default function TemperatureSettingsForm({handleWidgetReq, widgetToUpdate}) {
    const classes = useStyles();

    const [city, setCity] = useState(widgetToUpdate ? widgetToUpdate.settings.city : '');
    const [frequency, setFrequency] = useState(widgetToUpdate ? widgetToUpdate.frequency : 15);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('');

        if (city === '') {
            setError('Invalid city name');
        } else {
            if (widgetToUpdate) {
                widgetToUpdate.settings.city = city;
                widgetToUpdate.frequency = frequency;
                handleWidgetReq(widgetToUpdate, true);
            } else {
                handleWidgetReq({
                    type: WidgetTypeEnum.WEATHER_TEMPERATURE,
                    settings: { city: city },
                    frequency: frequency
                });
            }
        }
    }

    return (
          <form noValidate autoComplete="off" id={`form${WidgetTypeEnum.WEATHER_TEMPERATURE}`} onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <TextField
                        onChange={(e) => setCity(e.target.value)}
                        label="City"
                        defaultValue={widgetToUpdate ? widgetToUpdate.settings.city : ''}
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
                      <Slider min={1} max={30} defaultValue={widgetToUpdate ? widgetToUpdate.frequency : 15} aria-label="Default" valueLabelDisplay="auto" onChange={(e) => setFrequency(e.target.value)}/>
                  </Grid>
              </Grid>
          </form>
    );
}
