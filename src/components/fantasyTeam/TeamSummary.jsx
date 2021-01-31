import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import MaterialTable from 'material-table';
import { lineGraphSettings } from '../nivoGraphHelpers';

import theme from '../../theme';
import LoadingSpinner from '../LoadingSpinner';
import { baseURLConfig } from '../../api';
import GameTable from './GameTable';
import TabContainer from '../TabContainer';
import { PlayerAvatarLink } from '../materialTableElements';

const useStyles = makeStyles(() => ({
  statChip: {
    margin: 5,
  },
  teamHeader: {
    marginBottom: 20,
  },
  expansion: {
    marginTop: 20,
  },
  panelTop: {
    borderBottom: 'grey solid 1px',
  },
  teamsArea: {
    padding: 10,
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
  graph: {
    height: 300,
  },
}));

export default function TeamSummary({ match }) {
  const classes = useStyles();
  const [fantasyTeam, setTeam] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teamID = match.params.id;
    const fetchData = async () => {
      const result = await axios(
        `${baseURLConfig}/fantasy_teams/${teamID}.json`,
      );
      setTeam(
        (result && result.data && result.data.fantasyTeam) || {},
      );
      setLoading(false);
    };
    fetchData();
  }, [match.params.id]);

  // const fantasyStartWeeks = (fantasyTeam && fantasyTeam.fantasyStarts) || {};
  const ownerName =
    (fantasyTeam && fantasyTeam.owner && fantasyTeam.owner.name) ||
    '';
  const fantasyTeamName = (fantasyTeam && fantasyTeam.name) || '';
  const year = (fantasyTeam && fantasyTeam.year) || '';
  const auction = (fantasyTeam && fantasyTeam.purchases) || [];
  const fantasyGames =
    (fantasyTeam && fantasyTeam.fantasyGames) || [];
  const cuumulativeStats =
    (fantasyTeam && fantasyTeam.cuumulativeStats) || {};
  const regularSeasonGames = fantasyGames.filter(
    (game) => game.week < 14,
  );
  const playoffGames = fantasyGames.filter((game) => game.week > 13);

  const ptsByPositionRegular =
    fantasyTeam &&
    fantasyTeam.positionalScoring &&
    fantasyTeam.positionalScoring.ptsByPositionRegular;
  const startsByPositionRegular =
    fantasyTeam &&
    fantasyTeam.positionalScoring &&
    fantasyTeam.positionalScoring.startsByPositionRegular;

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Team Summary
      </Typography>
      {!loading && (
        <div className={classes.teamHeader}>
          <Typography variant="h5" gutterBottom>
            {year}: {fantasyTeamName} ({ownerName})
          </Typography>

          <Chip
            className={classes.statChip}
            label={`Record: (${cuumulativeStats.seasonWins} - 
            ${cuumulativeStats.seasonLosses})`}
          />
          <Chip
            className={classes.statChip}
            label={`Season Points: ${Math.round(
              cuumulativeStats.seasonPoints,
            )}`}
          />
        </div>
      )}

      {loading && <LoadingSpinner isLoading={loading} />}
      {!loading && (
        <TabContainer
          tabNames={['Games', 'Auction', 'Positional Scoring']}
          tabs={[
            <TeamGameTable
              regularSeasonGames={regularSeasonGames}
              playoffGames={playoffGames}
              fantasyTeamName={fantasyTeamName}
            />,
            <AuctionTable auction={auction} />,
            <PositionScoring
              ptsByPositionRegular={ptsByPositionRegular}
              startsByPositionRegular={startsByPositionRegular}
            />,
          ]}
        />
      )}
    </div>
  );
}

function TeamGameTable(props) {
  const { regularSeasonGames, playoffGames, fantasyTeamName } = props;
  return (
    <>
      <GameTable
        regularSeason
        fantasyGames={regularSeasonGames}
        fantasyTeamName={fantasyTeamName}
      />
      {playoffGames.length > 0 && (
        <GameTable
          regularSeason={false}
          fantasyGames={playoffGames}
          fantasyTeamName={fantasyTeamName}
        />
      )}
    </>
  );
}

function AuctionTable(props) {
  const { auction } = props;
  // if (auction.length > 0) {
  //   return;
  // }

  return (
    <MaterialTable
      title="Auction"
      data={auction}
      options={{
        filtering: false,
        padding: 'dense',
        paging: false,
        search: false,
        exportButton: true,
        exportAllData: true,
        showTitle: true,
      }}
      columns={[
        {
          title: 'Player',
          field: 'player.name',
          render: (rowData) => (
            <PlayerAvatarLink
              id={rowData.player.id}
              playerName={rowData.player.name}
              pictureId={rowData.player.pictureId}
            />
          ),
        },
        {
          title: 'Position',
          field: 'position',
        },
        {
          title: 'Price',
          field: 'price',
        },
      ]}
    />
  );
}

function prepPositionalData(startsByPosition, ptsByPosition) {
  const data = [];
  Object.keys(startsByPosition).forEach((pos) => {
    data.push({
      id: pos,
      data: [{ x: startsByPosition[pos], y: ptsByPosition[pos] }],
    });
  });
  return data;
}

function PositionScoring({
  startsByPositionRegular,
  ptsByPositionRegular,
}) {
  const classes = useStyles();

  const data = prepPositionalData(
    startsByPositionRegular,
    ptsByPositionRegular,
  );

  return (
    <div className={classes.graph}>
      <ResponsiveScatterPlot
        data={data}
        theme={lineGraphSettings.theme}
        colors={Object.values(theme.palette.graph)}
        margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        xScale={{ type: 'linear', min: 0, max: 50 }}
        yScale={{ type: 'linear', min: 0, max: 1000 }}
        blendMode="normal"
        axisTop={null}
        axisRight={null}
        nodeSize={20}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'starts',
          legendPosition: 'middle',
          legendOffset: 46,
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 0,
          tickRotation: 0,
          legend: 'points',
          legendPosition: 'middle',
          legendOffset: -30,
        }}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 130,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 12,
            itemsSpacing: 5,
            itemDirection: 'left-to-right',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
