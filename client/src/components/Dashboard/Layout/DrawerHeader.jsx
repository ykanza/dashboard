import React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';

const StyledDrawerHeader = styled('div') (({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function DrawerHeader({handleDrawerClose}) {
    const theme = useTheme();
    return (
      <StyledDrawerHeader>
          <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
      </StyledDrawerHeader>
    );
}
