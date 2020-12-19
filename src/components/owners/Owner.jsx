import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';

import {
  GiTrophy,
  GiPodiumSecond,
  GiPodiumThird,
} from 'react-icons/gi';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import MaterialTable from 'material-table';

import TabContainer from '../TabContainer';
import OwnerHeader from './OwnerHeader';

import LoadingSpinner from '../LoadingSpinner';
import { config } from '../../api';
import { OwnerAvatarLink } from '../materialTableElements';

export function streakEmoji(streak) {
  let final = '';
  let emoji = '🧊';
  if (streak > 0) {
    emoji = '🔥';
  }
  const times = Math.abs(streak);
  for (let i = 0; i < times; i += 1) {
    final += emoji;
  }
  return final;
}

const useStyles = makeStyles(() => ({
  statChip: {
    margin: 5,
  },
  panelTop: {
    borderBottom: 'grey solid 1px',
  },
  teamsArea: {
    display: 'block',
  },
  teamCard: {
    width: '98%',
    backgroundColor: '#4e5563',
    margin: '10px auto',
    display: 'flex',
    borderRadius: 15,
  },
  teamCardContent: {
    padding: '10px !important',
    display: 'flex',
    alignItems: 'baseline',
    width: '100%',
    flexWrap: 'wrap',
  },
  teamCardContentItem: {
    marginRight: 20,
  },
  teamName: {
    width: 230,
    textOverflow: 'ellipsis',
    flexGrow: 1,
  },
  resultIcon: {
    fontSize: 25,
    minWidth: 25,
  },
  grow: {
    flexGrow: 3,
  },
}));

function Owner({ match }) {
  const [owner, setOwner] = useState({});
  const [loading, setLoading] = useState(true);
  const { params } = match.params.id;
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${config}/owners/${id}.json`);
      setOwner((result && result.data && result.data.owner) || {});
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const fantasyTeams = owner.fantasyTeams || [];
  const cumulativeStats = owner.cumulativeStats || {};

  const cleanedVersusRecords = (owner.versusRecords || []).map(
    (record) =>
      Math.round(
        (record.wins / (record.wins + record.losses)) * 100,
      ) / 100,
  );

  return (
    <div>
      {loading && <LoadingSpinner isLoading={loading} />}
      {!loading && (
        <>
          <OwnerHeader
            owner={owner}
            cumulativeStats={cumulativeStats}
          />

          <TabContainer
            tabNames={['Teams', 'Versus Records']}
            tabs={[
              <TeamsTable fantasyTeams={fantasyTeams} />,
              <VersusTable versusRecords={cleanedVersusRecords} />,
            ]}
          />
        </>
      )}
    </div>
  );
}

function Trophy({ team }) {
  if (team['wonChampionship?']) {
    return <GiTrophy />;
  }
  if (team['madeFinals?']) {
    return <GiPodiumSecond />;
  }
  if (team['madePlayoffs?']) {
    return <GiPodiumThird />;
  }
  return null;
}

function TeamsTable(props) {
  const classes = useStyles();

  const { fantasyTeams } = props;

  return (
    <div className={classes.teamsArea}>
      {fantasyTeams.reverse().map((team) => (
        <Card className={classes.teamCard} key={team.year}>
          <CardContent className={classes.teamCardContent}>
            <Typography className={classes.teamCardContentItem}>
              {team.year}
            </Typography>
            <Typography
              // color="primary"
              className={clsx(
                classes.teamCardContentItem,
                classes.teamName,
              )}
            >
              {team.name}
            </Typography>
            <Typography
              className={clsx(
                classes.teamCardContentItem,
                classes.resultIcon,
              )}
            >
              <Trophy team={team} />
            </Typography>

            <Typography className={classes.teamCardContentItem}>
              ({team.seasonWins} - {team.seasonLosses})
            </Typography>
            <Typography
              className={clsx(
                classes.teamCardContentItem,
                classes.grow,
              )}
            >
              {Math.round(team.seasonPoints)} points
            </Typography>
            <Button
              color="primary"
              variant="contained"
              component={RouterLink}
              to={`/fantasyTeams/${team.id}`}
            >
              Go To Team
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function VersusTable(props) {
  const { versusRecords } = props;

  return (
    <div>
      <MaterialTable
        title="Versus Records"
        data={versusRecords}
        options={{
          padding: 'dense',
          paging: false,
          search: false,
          exportButton: true,
          exportAllData: true,
          showTitle: false,
        }}
        columns={[
          {
            title: 'Owner',
            field: 'name',
            render: (rowData) => (
              <OwnerAvatarLink
                id={rowData.id}
                ownerName={rowData.name}
              />
            ),
          },
          { title: 'Wins', field: 'wins' },
          { title: 'Losses', field: 'losses' },
          { title: 'Win Percentage', field: 'winPct' },
          {
            title: 'Current Streak',
            field: 'streak',
            render: (rowData) =>
              streakEmoji(parseInt(rowData.streak, 10)),
          },
        ]}
      />
    </div>
  );
}

export default Owner;
