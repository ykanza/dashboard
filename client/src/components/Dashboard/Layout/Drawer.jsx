import React from 'react';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import DrawerHeader from "./DrawerHeader";
import List from './List';

export default function Drawer({open, handleDrawerClose, setWidgetType, handleAllWidgetsDeletion}) {
    return (
        <MuiDrawer
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader handleDrawerClose={handleDrawerClose}/>
            <Divider />
            <Divider />
            <List handleDrawerClose={handleDrawerClose} setWidgetType={setWidgetType} handleAllWidgetsDeletion={handleAllWidgetsDeletion} />
        </MuiDrawer>
    );
}
