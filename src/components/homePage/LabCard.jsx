import React, { useState } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 335,
    height: 490,
    backgroundColor: 'transparent',
    perspective: 1000,
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
    borderRadius: 15,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    boxShadow:
      '-3px -3px 3px 0 rgba(#26e6f7, 0.6), 3px 3px 3px 0 rgba(#f759e4, 0.6), 0 0 6px 2px rgba(#ffe759, 0.6), 0 35px 25px -15px rgba(0, 0, 0, 0.5)',
    // animation: `$holoCard 15s ease infinite`,
  },
  cardFront: {
    backgroundColor: '#868686',
    color: 'black',
    backgroundImage:
      'linear-gradient(115deg, transparent 0%, rgb(0, 231, 255) 30%, rgb(255, 0, 231) 70%, transparent 100%)',
    '&::before': {
      content: '"some content"',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      backgroundImage:
        'linear-gradient(115deg, transparent 0%, rgb(0, 231, 255) 30%, rgb(255, 0, 231) 70%, transparent 100%)',
      backgroundPosition: '0% 0%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '300% 300%',
      mixBlendMode: 'color-dodge',
      opacity: 0.2,
      zIndex: 1,
      borderRadius: 15,
      // animation: `$holoGradient 15s ease infinite`,
    },
    '&::after': {
      content: '"some content"',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      backgroundImage:
        'url(https://media.giphy.com/media/12Eo7WogCAoj84/giphy.gif)',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '180%',
      mixBlendMode: 'color-dodge',
      opacity: 1,
      zIndex: 2,
      borderRadius: 15,
      animation: `$holoSparkle 15s ease infinite`,
    },
  },
  cardBack: {
    backgroundColor: 'dodgerblue',
    color: 'white',
    transform: 'rotateY(-180deg)',
    zIndex: 30,
  },
  playerPicture: {
    height: 400,
    width: 250,
    backgroundPosition: 'center',
    margin: '37px 53px',
    position: 'relative',
    backfaceVisibility: 'hidden',
  },
  coverShape: {
    position: 'absolute',
    backgroundColor: 'black',
    clipPath:
      'polygon(0 0, 93% 0, 100% 21%, 100% 100%, 7% 100%, 0 76%)',
    width: 300,
    height: 82,
    bottom: -43,
    left: -29,
  },
  leftCoverShape: {
    position: 'absolute',
    backgroundColor: 'black',
    clipPath: 'polygon(52% 0, 100% 0, 100% 100%, 0 100%, 0 5%)',
    left: -29,
    width: 35,
    bottom: 38,
    height: 362,
  },
  leftCoverInner: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  firstName: {
    color: 'white',
    textAlign: 'left',
    fontSize: 24,
    fontVariant: 'petite-caps',
    margin: 0,
    marginLeft: 30,
  },
  lastName: {
    color: 'white',
    textAlign: 'left',
    fontSize: 36,
    fontVariant: 'petite-caps',
    margin: 0,
    marginLeft: 44,
    marginTop: -10,
  },
  year: {
    color: '#fff',
    transform: 'rotate(-90deg)',
    fontSize: 20,
    position: 'absolute',
    top: 33,
    left: -3,
  },
  avatarPic: {
    width: 50,
    height: 50,
    position: 'absolute',
    borderRadius: '50%',
    zIndex: 4,
    right: 13,
    top: 16,
    border: '2px solid black',
    borderColor: theme.palette.primary.main,
    backfaceVisibility: 'hidden',
  },
  flipButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    borderRadius: '50%',
    zIndex: 4,
    bottom: 0,
    right: 0,
    backfaceVisibility: 'hidden',
  },

  '@keyframes holoSparkle': {
    '0%, 5%': {
      opacity: 0.1,
    },
    '20%': {
      opacity: 1,
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
      opacity: 0.5,
    },
    '35%': {
      backgroundPosition: '100% 100%',
    },
    '55%': {
      backgroundPosition: '0% 0%',
      opacity: 0.3,
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
          <img
            src="/ownerAvatars/50_x_50/13.png"
            className={classes.avatarPic}
            alt="owner-img"
          />
          <div
            className={classes.playerPicture}
            style={{ backgroundImage: 'url(/cards/2555224.jpg)' }}
          >
            <div className={classes.coverShape}>
              <p className={classes.firstName}>Ezekiel</p>
              <p className={classes.lastName}>Elliot</p>
            </div>
            <div className={classes.leftCoverShape}>
              <div className={classes.leftCoverInner}>
                <p className={classes.year}>2019</p>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(classes.cardSide, classes.cardBack)}>
          bbb
        </div>
      </div>
    </div>
  );
}

export default LabCard;
