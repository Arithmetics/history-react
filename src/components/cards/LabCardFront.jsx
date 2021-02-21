import React, { useState } from 'react';
import clsx from 'clsx';
import { GiTrophy } from 'react-icons/gi';
import { BsFillLightningFill } from 'react-icons/bs';

import { makeStyles } from '@material-ui/core/styles';

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
  playerPicture: {
    height: 400,
    width: 250,
    backgroundPosition: 'center',
    margin: '23px 47px',
    position: 'relative',
    backfaceVisibility: 'hidden',
  },
  coverShape: {
    position: 'absolute',
    backgroundColor: '#191818',
    clipPath:
      'polygon(0 0, 93% 0, 100% 21%, 100% 100%, 7% 100%, 0 76%)',
    width: 300,
    height: 82,
    bottom: -43,
    left: -29,
  },
  leftCoverShape: {
    position: 'absolute',
    backgroundColor: '#191818',
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
    marginLeft: 32,
    zIndex: 10,
  },
  lastName: {
    color: 'white',
    textAlign: 'left',
    fontSize: 36,
    fontVariant: 'petite-caps',
    margin: 0,
    marginLeft: 44,
    marginTop: -10,
    zIndex: 10,
  },
  year: {
    color: '#fff',
    transform: 'rotate(-90deg)',
    fontSize: 20,
    position: 'absolute',
    top: 33,
    left: -3,
  },
  avatars: {
    position: 'absolute',
    zIndex: 2,
    right: 11,
    top: 9,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  avatarPic: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    border: '2px solid black',
    borderColor: theme.palette.primary.main,
    backfaceVisibility: 'hidden',
  },
  smallAvatar: {
    width: 30,
    height: 30,
    marginTop: 5,
    borderRadius: '50%',
    border: '2px solid black',
    borderColor: theme.palette.primary.main,
    backgroundColor: 'black',
    color: theme.palette.primary.main,
    marginRight: 2,
    paddingTop: 2,
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

function LabCardFront() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.avatars}>
        <img
          src="/ownerAvatars/50_x_50/13.png"
          className={classes.avatarPic}
          alt="owner-img"
        />

        <div className={classes.smallAvatar}>
          <GiTrophy />
        </div>
        <div className={classes.smallAvatar}>R</div>
        <div className={classes.smallAvatar}>
          <BsFillLightningFill />
        </div>
      </div>

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
    </>
  );
}

export default LabCardFront;
