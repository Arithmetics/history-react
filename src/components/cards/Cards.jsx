import React from 'react';
import LabCard from './LabCard';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
}));

export default function Cards() {
  const classes = useStyles();
  return (
    <div className={classes.cardContainer}>
      <LabCard />
      <LabCard />
      <LabCard />
    </div>
  );
}
