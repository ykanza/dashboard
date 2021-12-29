import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { IconButton, Button, Typography, Toolbar } from "@mui/material";
import {Menu} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";

const drawerWidth = 240;
const StyledAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function AppBar({open, handleDrawerOpen}) {
    const navigate = useNavigate();

    return (
        <StyledAppBar position="fixed" open={open} style={{backgroundColor: '#6c63ff'}}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <Menu />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Dashboard
                </Typography>
                <Button style={{marginLeft: 'auto'}} color="inherit" onClick={() => {
                    localStorage.removeItem('accessToken');

                    navigate('/login', {replace: true});
                }}>
                    Logout
                </Button>
            </Toolbar>
        </StyledAppBar>
    );
}
