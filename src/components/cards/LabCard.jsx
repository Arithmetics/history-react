import React, { useState } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';

import LabCardFront from './LabCardFront';
import LabCardBack from './LabCardBack';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 335,
    height: 485,
    backgroundColor: 'transparent',
    perspective: 1000,
    animation: `$holoCard 15s ease infinite`,
  },
  cardInner: {
    borderRadius: 15,
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
  },
  cardInnerFlipped: {
    transform: 'rotateY(-180deg)',
  },
  cardSide: {
    backgroundColor: '#868686',
    borderRadius: 15,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundImage:
      'linear-gradient(115deg, transparent 0%, rgb(0, 231, 255) 30%, rgb(255, 0, 231) 70%, transparent 100%)',
  },
  cardFront: {
    boxShadow: '0px 10vw 9vw -6vw rgba(0, 0, 0, 0.5)',

    color: '#191818',
    backgroundImage:
      'linear-gradient(115deg, transparent 0%, rgb(0, 231, 255) 30%, rgb(255, 0, 231) 70%, transparent 100%)',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      backgroundPosition: '0% 0%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '300% 300%',
      backgroundImage:
        'linear-gradient(115deg, transparent 0%, rgb(0, 231, 255) 30%, rgb(255, 0, 231) 70%, transparent 100%)',
      // mixBlendMode: 'color-dodge',
      opacity: 0.2,
      borderRadius: 15,
      zIndex: 1,
      animation: `$holoGradient 15s ease infinite`,
      boxShadow: '0px 0px 15px 5px rgba(83, 172, 188, .75)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      backgroundImage:
        'url(https://www.ignant.com/wp-content/uploads/2016/01/s%C3%B6derberg_gif-03i.gif)',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '180%',
      // mixBlendMode: 'color-dodge',
      opacity: 1,
      borderRadius: 15,
      zIndex: 2,
      animation: `$holoSparkle 15s ease infinite`,
    },
  },
  cardBack: {
    color: 'white',
    transform: 'rotateY(-180deg)',
    zIndex: 30,
  },
  flipButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    borderRadius: '50%',
    zIndex: 4,
    bottom: -4,
    right: -6,
    backfaceVisibility: 'hidden',
  },

  '@keyframes holoSparkle': {
    '0%, 5%': {
      opacity: 0.1,
    },
    '20%': {
      opacity: 0.2,
    },
    '100%': {
      opacity: 0.1,
    },
  },
  '@keyframes holoGradient': {
    '0%, 100%': {
      opacity: 0,
      backgroundPosition: '0% 0%',
    },
    '8%': {
      opacity: 0,
    },
    '10%': {
      backgroundPosition: '0% 0%',
    },
    '19%': {
      backgroundPosition: '100% 100%',
      opacity: 0.3,
    },
    '35%': {
      backgroundPosition: '100% 100%',
    },
    '55%': {
      backgroundPosition: '0% 0%',
      opacity: 0.2,
    },
    '75%': {
      opacity: 0,
    },
  },
  '@keyframes holoCard': {
    '0%': {
      transform: 'rotate3d(0,0,0,-20deg)',
    },
    '20%': {
      transform: 'rotate3d(1,1,0.2,30deg)',
    },
    '100%': {
      transform: 'rotate3d(0,0,0,-20deg)',
    },
  },
}));

function LabCard() {
  const classes = useStyles();

  const [flipped, setFlipped] = useState(false);

  const flipCard = () => setFlipped(!flipped);

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
  };

  return (
    <div className={classes.card}>
      <IconButton
        aria-label="flip"
        className={classes.flipButton}
        onClick={flipCard}
      >
        <FlipCameraAndroidIcon />
      </IconButton>
      <div
        className={clsx(
          classes.cardInner,
          flipped ? classes.cardInnerFlipped : undefined,
        )}
      >
        <div className={clsx(classes.cardSide, classes.cardFront)}>
          <LabCardFront card={card} />
        </div>
        <div className={clsx(classes.cardSide, classes.cardBack)}>
          <LabCardBack card={card} />
        </div>
      </div>
    </div>
  );
}

export default LabCard;
