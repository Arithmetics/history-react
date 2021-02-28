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

function createStats(card) {
  const isPpr = card.year > 2018;
  if (card.position === 'QB') {
    return [
      { field: 'Passing Yards', value: card.passingYards },
      { field: 'Passing TDs', value: card.passingTouchdowns },
      { field: 'Rushing Yards', value: card.rushingYards },
      { field: 'Rushing TDs', value: card.rushingTouchdowns },
      {
        field: 'Fantasy Points',
        value: isPpr ? card.fantasyPointsPpr : card.fantasyPointsReg,
      },
      {
        field: 'Positional Rank',
        value: isPpr ? card.rankPpr : card.rankReg,
      },
    ];
  }
  if (card.position === 'RB') {
    return [
      { field: 'Rushing Yards', value: card.rushingYards },
      { field: 'Rushing TDs', value: card.rushingTouchdowns },
      { field: 'Receiving Yards', value: card.receivingYards },
      { field: 'Receiving TDs', value: card.receivingTouchdowns },
      { field: 'Receptions', value: card.receptions },
      {
        field: 'Fantasy Points',
        value: isPpr ? card.fantasyPointsPpr : card.fantasyPointsReg,
      },
      {
        field: 'Positional Rank',
        value: isPpr ? card.rankPpr : card.rankReg,
      },
    ];
  }
  if (card.position === 'WR' || card.position === 'TE') {
    return [
      { field: 'Receiving Yards', value: card.receivingYards },
      { field: 'Receiving TDs', value: card.receivingTouchdowns },
      { field: 'Receptions', value: card.receptions },
      {
        field: 'Fantasy Points',
        value: isPpr ? card.fantasyPointsPpr : card.fantasyPointsReg,
      },
      {
        field: 'Positional Rank',
        value: isPpr ? card.rankPpr : card.rankReg,
      },
    ];
  }
  return {};
}

export default function LabCardBack({ card }) {
  const classes = useStyles();

  const stats = createStats(card);

  return (
    <div className={classes.innerCard}>
      <div className={classes.topCard}>
        <h2 className={classes.year}>
          {card.year} - {card.position}
        </h2>
        <img
          alt="player-profile-pic"
          className={classes.profileImage}
          src={`${NFL_IMAGE_URL}/${card.player.pictureId}`}
        />
        <h3 className={classes.playerName}>{card.player.name}</h3>
        <div className={classes.info}>
          <p>
            <i>Age: {Math.floor(card.ageAtSeason)}</i>
          </p>
          <p>
            <i>Experience: {card.experienceAtSeason}</i>
          </p>
          <p>
            <i>Auction: ${card.auctionPrice}</i>
          </p>
        </div>
      </div>
      <div className={classes.bottomCard}>
        {stats.map((stat) => (
          <div key={stat.field} className={classes.statLine}>
            <div className={classes.statField}>{stat.field}</div>
            <div className={classes.statMiddle}>-</div>
            <div className={classes.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
