import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function LoadingSpinner({ isLoading }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fade
        in={isLoading}
        style={{
          transitionDelay: isLoading ? '200ms' : '0ms',
        }}
        unmountOnExit
      >
        <CircularProgress />
      </Fade>
    </div>
  );
}

export default LoadingSpinner;
