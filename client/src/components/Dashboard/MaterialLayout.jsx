import { Paper, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from '../Header';
import Footer from '../Footer';

import { theme, useStyle } from './styles';
import logo from "../../logo.png";

export default function MaterialLayout(props) {
    const { children } = props;
    const classes = useStyle();

    return (
        <ThemeProvider theme={theme}>
            <div style={{position: 'absolute', left: '5%', height: '100%', width: '50%', backgroundImage: 'url('+logo+')', backgroundSize:'contain', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}></div>
            <div style={{position: 'absolute', top: '20%', left: '50%', height: '50%', width: '50%'}}>
            <CssBaseline />
            <div className={classes.root}>
                <Paper className={classes.paper}>{children}</Paper>
            </div>
            </div>
        </ThemeProvider>
    );
}
