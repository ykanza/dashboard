import React from 'react';
import { IconButton } from "@mui/material";
import { Clear, Settings, } from "@mui/icons-material";


export default function ActionButtons({widget, getReadyWidgetUpdate, handleWidgetDeletion}) {

  return (
      <>
        <IconButton aria-label="settings" style={{ color: 'inherit' }} onClick={() => getReadyWidgetUpdate(widget)}>
          <Settings />
        </IconButton>
        <IconButton aria-label="clear" style={{ color: 'inherit' }} onClick={() => handleWidgetDeletion(widget.id)}>
          <Clear />
        </IconButton>
      </>
  );
}
