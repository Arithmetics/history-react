import React from 'react';
import { GiTrophy } from 'react-icons/gi';
import { BsFillLightningFill } from 'react-icons/bs';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
}));

function LabCardFront({ card }) {
  const classes = useStyles();

  const firstName = card.player.name.substr(
    0,
    card.player.name.indexOf(' '),
  );
  const lastName = card.player.name.substr(
    card.player.name.indexOf(' ') + 1,
  );

  return (
    <>
      <div className={classes.avatars}>
        <img
          src={`/ownerAvatars/50_x_50/${card.owner.id}.png`}
          className={classes.avatarPic}
          alt="owner-img"
        />

        {card.champion && (
          <div className={classes.smallAvatar}>
            <GiTrophy />
          </div>
        )}
        {card.experienceAtSeason === 1 && (
          <div className={classes.smallAvatar}>R</div>
        )}
        {card.breakout && (
          <div className={classes.smallAvatar}>
            <BsFillLightningFill />
          </div>
        )}
        {card.repeat && (
          <div className={classes.smallAvatar}>
            <WhatshotIcon />
          </div>
        )}
      </div>

      <div
        className={classes.playerPicture}
        style={{ backgroundImage: 'url(/cards/2555224.jpg)' }}
      >
        <div className={classes.coverShape}>
          <p className={classes.firstName}>{firstName}</p>
          <p className={classes.lastName}>{lastName}</p>
        </div>
        <div className={classes.leftCoverShape}>
          <div className={classes.leftCoverInner}>
            <p className={classes.year}>{card.year}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LabCardFront;
