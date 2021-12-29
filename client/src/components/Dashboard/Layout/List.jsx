import React, {useState} from 'react';
import { ListItemButton, ListItemIcon, Collapse, ListSubheader, ListItemText, Button } from "@mui/material";
import MuiList from '@mui/material/List';
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import widgetsModel from "../../../Datasets/widgetsModel";
import { red } from "@mui/material/colors";

export default function List({handleDrawerClose, setWidgetType, handleAllWidgetsDeletion}) {
    const [subMenuState, setSubMenuState] = useState(Array(widgetsModel.length).fill(false));
    const toggleSubMenu = (e, i) => {
        e.preventDefault()
        const newState = subMenuState.slice(0)
        newState[i] = !newState[i]
        setSubMenuState(newState)
    }

    return (
      <>
          <MuiList
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                      Widget List
                  </ListSubheader>
              }
          >
              {widgetsModel.map((model, index) => (
                  <div key={index}>
                      <ListItemButton button="true" onClick={e => toggleSubMenu(e, index)}>
                          <ListItemIcon>
                              {model.icon()}
                          </ListItemIcon>
                          <ListItemText primary={model.label} />
                          {subMenuState[index] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={subMenuState[index]} timeout="auto" unmountOnExit>
                          <MuiList component="div" disablePadding>
                              {model.submenu.map((info, index) => (
                                  <ListItemButton key={index} button="true" sx={{ pl: 4 }} onClick={() => {
                                    handleDrawerClose();
                                    setWidgetType(info.type)
                                  }}>
                                      <ListItemIcon>
                                      {info.icon()}
                                      </ListItemIcon>
                                      <ListItemText primary={info.label} />
                                  </ListItemButton>
                              ))}
                          </MuiList>
                      </Collapse>
                  </div>
              ))}
          </MuiList>
        <Button style={{color: red[800]}} onClick={handleAllWidgetsDeletion}>Delete all widgets</Button>
      </>
    );
}
