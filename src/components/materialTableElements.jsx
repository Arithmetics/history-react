import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';

import { NFL_IMAGE_URL } from '../constants';

const titleRowLookup = {
  YEAR: 'Year',
  POS: 'Position',
  OWN: 'Owner',
  TEAM: 'Team',
  PRC: 'Price',
  PDR: 'Preseason Draft Rank',
  FSR: 'Final Season Rank',
  FSRP: 'Final Season Rank PPR',
  RSP: 'Regular Season Points',
  RSG: 'Regular Season Games',
  RSW: 'Regular Season Wins',
  PPG: 'Points per Game',
  PP: 'Playoff Points',
  PG: 'Playoff Games',
  PW: 'Playoff Wins',
  PPPG: 'Playoff Points per Game',
  TS: 'Total Starts',
  FP: 'Finals Points',
  CMP: 'Championships',
  TAD: 'Total Auction Dollars',
  MAP: 'Max Auction Price',
  BSP: 'Best Start Points',
  BPDR: 'Best Preseason Draft Rank',
  BFR: 'Best Final Rank',
  BFRP: 'Best Final Rank PPR',
  PN: 'Player Name',
  GP: 'Games Played',
  AGE: 'Age',
  EXP: 'Experience',
  FPR: 'Fantasy Points Regular',
  FPP: 'Fantasy Points PPR',
  PTS: 'Fantasy Points',
};

const useStyles = makeStyles({
  cell: { border: 'none' },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatarLink: {
    whiteSpace: 'nowrap',
  },
  avatarPic: {
    width: 40,
    height: 28,
    borderRadius: '50%',
  },
  teamAvatarPic: {
    borderRadius: '50%',
    marginRight: 5,
    width: 30,
    height: 30,
  },
  scoredAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  scoredAvatarGrade: {
    height: 22,
    width: 22,
    fontSize: 12,
  },
});

export function HeaderCellWithTooltip(props) {
  const classes = useStyles();
  const { abbr } = props;
  return (
    <div>
      <Tooltip title={titleRowLookup[abbr]} placement="top">
        <TableCell className={classes.cell}>{abbr}</TableCell>
      </Tooltip>
    </div>
  );
}

export function PlayerAvatarLink(props) {
  const classes = useStyles();
  const { id, playerName, pictureId } = props;
  return (
    <div className={classes.avatarContainer}>
      <img
        src={`${NFL_IMAGE_URL}/${pictureId}`}
        className={classes.avatarPic}
        alt="player-img"
      />

      <Link
        className={classes.avatarLink}
        component={RouterLink}
        to={`/players/${id}`}
      >
        {playerName}
      </Link>
    </div>
  );
}

export function TeamAvatarLink(props) {
  const classes = useStyles();
  const { id, teamName, pictureUrl } = props;
  return (
    <div className={classes.avatarContainer}>
      <img
        src={pictureUrl}
        className={classes.teamAvatarPic}
        alt="team-img"
      />

      <Link
        className={classes.avatarLink}
        component={RouterLink}
        to={`/fantasyTeams/${id}`}
      >
        {teamName}
      </Link>
    </div>
  );
}

export function OwnerAvatarLink(props) {
  const classes = useStyles();
  const { id, ownerName } = props;
  return (
    <div className={classes.avatarContainer}>
      <img
        src={`/ownerAvatars/50_x_50/${id}.png`}
        className={classes.teamAvatarPic}
        alt="owner-img"
      />

      <Link
        className={classes.avatarLink}
        component={RouterLink}
        to={`/owners/${id}`}
      >
        {ownerName}
      </Link>
    </div>
  );
}

export function GradedScore(props) {
  const classes = useStyles();
  const { score, grade } = props;

  return (
    <div className={classes.scoredAvatar}>
      {score}
      <Avatar className={classes.scoredAvatarGrade}>{grade}</Avatar>
    </div>
  );
}
