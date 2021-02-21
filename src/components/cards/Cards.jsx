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

const card = {
  id: 1034,
  auctionPrice: 0,
  breakout: false,
  repeat: false,
  champion: false,
  year: 2020,
  passingYards: 0,
  passingTouchdowns: 0,
  rushingYards: 691,
  rushingTouchdowns: 2,
  receivingYards: 52,
  receivingTouchdowns: 0,
  receptions: 5,
  ageAtSeason: 23.57,
  experienceAtSeason: 2,
  position: 'RB',
  rankReg: 44,
  rankPpr: 50,
  fantasyPointsPpr: 88.8,
  fantasyPointsReg: 86.3,
  player: {
    id: 2562281,
    name: 'Damien Harris',
    nflUrlName: 'damien-harris',
    pictureId: 'fkm1w2mp3ocice26vuk4',
  },
  owner: { id: 1, name: 'Dagr' },
  users: [{ id: 3, name: 'Brock' }],
  colorOne: '#00ff04',
  colorTwo: '#090909',
  effectImage:
    'https://upload.wikimedia.org/wikipedia/commons/c/cc/Digital_rain_animation_medium_letters_shine.gif',
};

export default function Cards() {
  const classes = useStyles();
  return (
    <div className={classes.cardContainer}>
      <LabCard card={card} />
      <LabCard card={card} />
      <LabCard card={card} />
    </div>
  );
}
