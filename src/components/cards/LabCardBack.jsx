import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { NFL_IMAGE_URL } from '../../constants';

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
  },

  topCard: {
    height: '65%',
  },
  year: {
    marginBottom: 0,
  },
  profileImage: {
    borderRadius: 500,
    margin: '10px auto',
    display: 'block',
    border: '3px solid black',
    borderColor: theme.palette.primary.main,
    height: 150,
  },
  playerName: {
    textAlign: 'center',
    marginBottom: 5,
  },
  info: {
    display: 'flex',
    justifyContent: 'space-around',
    borderBottom: '1px solid white',
    '& > p': {
      margin: 5,
    },
  },
  bottomCard: {
    height: '36%',
  },
  statLine: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '16px',
  },
  statField: {
    textAlign: 'right',
    width: '60%',
  },
  statMiddle: {
    textAlign: 'center',
    width: '10%',
  },
  statValue: {
    textAlign: 'left',
    width: '30%',
  },
}));

const stats = [
  { field: 'Rushing Yards', value: 1324 },
  { field: 'Rushing TDs', value: 12 },
  { field: 'Receiving Yards', value: 1324 },
  { field: 'Receiving TDs', value: 5 },
  { field: 'Receptions', value: 104 },
  { field: 'Fantasy Points', value: 236 },
  { field: 'Positional Rank', value: 2 },
];

export default function LabCardBack() {
  const classes = useStyles();

  return (
    <div className={classes.innerCard}>
      <div className={classes.topCard}>
        <h2 className={classes.year}>2019 - WR</h2>
        <img
          alt="player-profile-pic"
          className={classes.profileImage}
          src={`${NFL_IMAGE_URL}/${'ify1tyrdfnh3oixudcuz'}`}
        />
        <h3 className={classes.playerName}>JuJu Smith-Schuster</h3>
        <div className={classes.info}>
          <p>
            <i>Age: 27</i>
          </p>
          <p>
            <i>Experience: 3</i>
          </p>
          <p>
            <i>Auction: $67</i>
          </p>
        </div>
      </div>
      <div className={classes.bottomCard}>
        {stats.map((stat) => (
          <div className={classes.statLine}>
            <div className={classes.statField}>{stat.field}</div>
            <div className={classes.statMiddle}>-</div>
            <div className={classes.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
