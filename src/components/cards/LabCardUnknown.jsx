import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { GiCardRandom } from 'react-icons/gi';

const useStyles = makeStyles((theme) => ({
  innerCard: {
    width: '90%',
    height: '93%',
    margin: '5%',
    borderRadius: 15,
    backgroundColor: 'black',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    transition: 'color 0.4s',
    zIndex: 40,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  labIcon: {
    height: '30%',
    padding: 20,
    zIndex: 40,
  },
  bottomIcon: {
    height: '70%',
    fontSize: 200,
    zIndex: 40,
  },
}));

export default function LabCardUnknown({ revealCard }) {
  const classes = useStyles();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={classes.innerCard} onClick={revealCard}>
      <img
        className={classes.labIcon}
        src="/the_lab_logo-white.svg"
        alt="site-logo"
      />
      <div className={classes.bottomIcon}>
        <GiCardRandom />
      </div>
    </div>
  );
}
