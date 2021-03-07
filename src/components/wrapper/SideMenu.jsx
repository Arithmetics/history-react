import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import BuildIcon from '@material-ui/icons/Build';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import GavelIcon from '@material-ui/icons/Gavel';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import RecentActorsIcon from '@material-ui/icons/RecentActors';

const sideLinks = [
  {
    page: 'home',
    display: 'Home',
    icon: <HomeIcon />,
  },
  {
    page: 'owners',
    display: 'Owners',
    icon: <PeopleIcon />,
  },
  {
    page: 'auctions',
    display: 'Auctions',
    icon: <GavelIcon />,
  },
  {
    page: 'players',
    display: 'Players',
    icon: <DirectionsRunIcon />,
  },
  {
    page: 'podcasts',
    display: 'Podcasts',
    icon: <AudiotrackIcon />,
  },
  {
    page: 'cards',
    display: 'Cards',
    icon: <RecentActorsIcon />,
  },
  {
    page: 'admin',
    display: 'Admin',
    icon: <BuildIcon />,
    adminOnly: true,
  },
];

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
    [theme.breakpoints.down('sm')]: {
      width: 0,
      display: 'none',
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
}));

export default function SideMenu({ isOpen, handleDrawerClose }) {
  const classes = useStyles();

  const { user } = useSelector((state) => state.user);
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !isOpen && classes.drawerPaperClose,
        ),
      }}
      open={isOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {sideLinks.map((link) => {
          if (link.adminOnly && (!user || !user.isAdmin)) {
            return undefined;
          }
          if (link.userOnly && !user) {
            return undefined;
          }
          return (
            <ListItem
              key={link.page}
              button
              component={RouterLink}
              to={`/${link.page}`}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.page} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List />
    </Drawer>
  );
}
