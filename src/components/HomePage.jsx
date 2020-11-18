import React, { useState, useEffect } from "react";
import axios from "axios";
import { firstBy } from "thenby";
import Typography from "@material-ui/core/Typography";

import MaterialTable from "material-table";
import LoadingSpinner from "./LoadingSpinner";
import { config } from "../api";
import { streakEmoji } from "./owners/Owner";
import {
  PlayerAvatarLink,
  TeamAvatarLink,
  OwnerAvatarLink,
} from "./materialTableElements";
import TabContainer from "./TabContainer";
import Leverage from "./homePage/Leverage";

export default function HomePage() {
  const [versusRecords, setVersusRecords] = useState([]);
  const [scheduledGames, setScheduledGames] = useState([]);
  const [firstStarts, setFirstStarts] = useState([]);
  const [standings, setStandings] = useState([]);
  const [playoffOdds, setPlayoffOdds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${config}/home/show.json`);
      setVersusRecords(
        (result && result.data && result.data.versusRecords) || []
      );
      setScheduledGames(
        (result && result.data && result.data.scheduledGames) || []
      );
      setFirstStarts((result && result.data && result.data.firstStarts) || []);

      setStandings((result && result.data && result.data.standings) || []);
      setPlayoffOdds((result && result.data && result.data.playoffOdds) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const currentWeek =
    (scheduledGames && scheduledGames.length > 0 && scheduledGames[0].week) ||
    0;

  return (
    <>
      <Typography variant="h3">The 97062 Lab</Typography>
      <br></br>
      {loading && <LoadingSpinner isLoading={loading} />}
      {!loading && (
        <TabContainer
          tabNames={[
            `Week ${currentWeek} Preview`,
            `Week ${currentWeek - 1} New Players`,
            `Week ${currentWeek} Leverage`,
            `Standings`,
          ]}
          tabs={[
            <UpcomingGames
              scheduledGames={scheduledGames}
              currentWeek={currentWeek}
              versusRecords={versusRecords}
            />,
            <NewPlayers firstStarts={firstStarts} />,
            <Leverage playoffOdds={playoffOdds} />,
            <Standings standings={standings} playoffOdds={playoffOdds} />,
          ]}
        />
      )}
    </>
  );
}

function UpcomingGames(props) {
  const { scheduledGames, currentWeek, versusRecords } = props;

  const getStreakVs = (owner1ID, owner2ID) => {
    const recordSet = versusRecords.filter((record) => record.id === owner1ID);
    const recordFinal = recordSet[0].versusRecords.filter(
      (record) => record.id === owner2ID
    );
    return recordFinal && recordFinal[0] ? recordFinal[0].streak : 0;
  };

  const getVersusRecord = (owner1ID, owner2ID) => {
    const recordSet = versusRecords.filter((record) => record.id === owner1ID);
    const recordFinal = recordSet[0].versusRecords.filter(
      (record) => record.id === owner2ID
    );
    if (recordFinal.length === 0) {
      return "0 - 0";
    }
    return `${recordFinal[0].wins} - ${recordFinal[0].losses}`;
  };

  return (
    <MaterialTable
      data={scheduledGames}
      options={{
        paging: false,
        sorting: false,
        search: false,
        showTitle: true,
        exportButton: false,
      }}
      title={`Week ${currentWeek} Upcoming Games`}
      columns={[
        {
          title: "Away Owner",
          field: "awayTeam.owner.name",
          render: (rowData) => (
            <OwnerAvatarLink
              id={rowData.awayTeam.owner.id}
              ownerName={rowData.awayTeam.owner.name}
            />
          ),
        },
        {
          title: "Away Team",
          field: "awayTeam.name",
          render: (rowData) => (
            <TeamAvatarLink
              id={rowData.awayTeam.id}
              teamName={rowData.awayTeam.name}
              pictureUrl={rowData.awayTeam.pictureUrl}
            />
          ),
        },
        {
          title: "Streak",
          field: undefined,
          render: (rowData) =>
            streakEmoji(
              getStreakVs(rowData.awayTeam.owner.id, rowData.homeTeam.owner.id)
            ),
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          title: "All Time Record",
          field: undefined,
          render: (rowData) =>
            getVersusRecord(
              rowData.awayTeam.owner.id,
              rowData.homeTeam.owner.id
            ),
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          title: "Streak",
          field: undefined,
          render: (rowData) =>
            streakEmoji(
              getStreakVs(rowData.homeTeam.owner.id, rowData.awayTeam.owner.id)
            ),
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          title: "Home Team",
          field: "homeTeam.name",
          render: (rowData) => (
            <TeamAvatarLink
              id={rowData.homeTeam.id}
              teamName={rowData.homeTeam.name}
              pictureUrl={rowData.homeTeam.pictureUrl}
            />
          ),
        },
        {
          title: "Home Owner",
          field: "homeTeam.owner.name",
          render: (rowData) => (
            <OwnerAvatarLink
              id={rowData.homeTeam.owner.id}
              ownerName={rowData.homeTeam.owner.name}
            />
          ),
        },
      ]}
    />
  );
}

function NewPlayers(props) {
  const { firstStarts } = props;
  return (
    <MaterialTable
      data={firstStarts}
      options={{
        paging: false,
        sorting: false,
        search: false,
        showTitle: true,
        exportButton: false,
      }}
      title={`Welcome to the League! First Time Starters Last Week`}
      columns={[
        {
          title: "Player",
          field: "player.name",
          render: (rowData) => (
            <PlayerAvatarLink
              id={rowData.player.id}
              playerName={rowData.player.name}
              pictureId={rowData.player.pictureId}
            />
          ),
        },
        {
          title: "Points",
          field: "points",
        },
        {
          title: "Week",
          field: "week",
        },
        {
          title: "Team",
          field: "fantasyTeam.name",
          render: (rowData) => (
            <TeamAvatarLink
              id={rowData.fantasyTeam.id}
              teamName={rowData.fantasyTeam.name}
              pictureUrl={rowData.fantasyTeam.pictureUrl}
            />
          ),
        },
      ]}
    />
  );
}

function Standings(props) {
  const { standings, playoffOdds } = props;
  return (
    <MaterialTable
      data={standings.sort(firstBy("wins").thenBy("points")).reverse()}
      options={{
        paging: false,
        sorting: true,
        search: false,
        showTitle: true,
        exportButton: false,
      }}
      title={`Current Standings`}
      columns={[
        {
          title: "Team",
          field: "name",
          render: (rowData) => (
            <TeamAvatarLink
              id={rowData.id}
              teamName={rowData.name}
              pictureUrl={rowData.pictureUrl}
            />
          ),
        },
        {
          title: "Wins",
          field: "wins",
        },
        {
          title: "Losses",
          field: "losses",
        },
        {
          title: "Points",
          field: "points",
          render: (rowData) => Math.round(rowData.points, 2),
        },
        {
          title: "Deserved Wins",
          field: "topSixFinshes",
        },
        {
          title: "Playoff Odds",
          field: "playoffOdds",
          render: (rowData) =>
            `${
              Math.round(
                playoffOdds.filter(
                  (o) =>
                    o.category === "make_playoffs" &&
                    o.fantasyTeam.id === rowData.id
                )[0].odds * 1000
              ) / 10
            }%`,
        },
        {
          title: "Bye Odds",
          field: "playoffOdds",
          render: (rowData) =>
            `${
              Math.round(
                playoffOdds.filter(
                  (o) =>
                    o.category === "get_bye" && o.fantasyTeam.id === rowData.id
                )[0].odds * 1000
              ) / 10
            }%`,
        },
        {
          title: "Championship Odds",
          field: "playoffOdds",
          render: (rowData) =>
            `${
              Math.round(
                playoffOdds.filter(
                  (o) =>
                    o.category === "win_championship" &&
                    o.fantasyTeam.id === rowData.id
                )[0].odds * 1000
              ) / 10
            }%`,
        },
      ]}
    />
  );
}
