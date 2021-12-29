import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, Paper } from "@mui/material";
import Draggable from "react-draggable";
import { Check } from "@mui/icons-material";

function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
          <Paper {...props} />
      </Draggable>
    );
}

export default function Wrapper({open, resetWidgetType, type, children}) {
    return (
        <Dialog
          open={open}
          onClose={resetWidgetType}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={resetWidgetType}>Cancel</Button>
                <Button form={`form${type}`}
                        type="submit"
                        color="primary"
                        variant="contained"
                        endIcon={<Check />}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
