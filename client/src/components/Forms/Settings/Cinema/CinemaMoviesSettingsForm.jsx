import React from 'react';
import {
    Grid,
    TextField,
    Typography,
    Slider,
    FormControl,
    FormLabel, RadioGroup, FormControlLabel, Radio
} from "@mui/material";
import {useState} from "react";
import useStyles from '../../../Views/styles';
import WidgetTypeEnum from "../../../../Utils/Enums/WidgetTypeEnum";

export default function CinemaMoviesSettingsForm({handleWidgetReq, widgetToUpdate}) {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [type, setType] = useState('movie');
    const [frequency, setFrequency] = useState(50);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('');
        if (name === '') {
            setError('Bad name (Ex: Asterix)');
        } else {
            if (widgetToUpdate) {
                widgetToUpdate.settings = { type: type, name: name };
                widgetToUpdate.frequency = frequency;
                handleWidgetReq(widgetToUpdate, true);
            } else {
                handleWidgetReq({
                    type: WidgetTypeEnum.CINEMA_MOVIES,
                    settings: { type: type, name: name },
                    frequency: frequency
                });
            }
        }
    }

    return (
        <form noValidate id={`form${WidgetTypeEnum.CINEMA_MOVIES}`} autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography gutterBottom className={classes.typographyClass}>Find {type}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                      onChange={(e) => setName(e.target.value)}
                      label={type === 'movie' ? 'Movie' : 'Series'}
                      fullWidth
                      required
                      error={Boolean(error)}
                      helperText={error}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Search type</FormLabel>
                        <RadioGroup
                          aria-label="type"
                          defaultValue="movie"
                          value={type}
                          name="radio-buttons-group"
                          onChange={(e) => setType(e.target.value)}
                        >
                            <FormControlLabel value="movie" control={<Radio />} label="Movies" />
                            <FormControlLabel value="series" control={<Radio />} label="Series" />
                        </RadioGroup>
                    </FormControl>
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
