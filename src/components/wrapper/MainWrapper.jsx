import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Copyright from './Copyright';
import TopToolBar from './TopToolBar';
import SideMenu from './SideMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
}));

export default function MainWrapper({ children }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const handleDrawerOpen = () => {
    setIsOpen(true);
  };
  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={classes.root}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />

      <CssBaseline />

      <TopToolBar
        handleDrawerOpen={handleDrawerOpen}
        isOpen={isOpen}
      />
      <SideMenu
        handleDrawerClose={handleDrawerClose}
        isOpen={isOpen}
      />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
