import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

import MaterialTable from "material-table";
import LoadingSpinner from "./LoadingSpinner";
import { config } from "../api";
import { streakEmoji } from "./owners/Owner";
import { PlayerAvatarLink } from "./materialTableElements";
import TabContainer from "./TabContainer";

export default function HomePage() {
  const [versusRecords, setVersusRecords] = useState([]);
  const [scheduledGames, setScheduledGames] = useState([]);
  const [firstStarts, setFirstStarts] = useState([]);
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
          ]}
          tabs={[
            <UpcomingGames
              scheduledGames={scheduledGames}
              currentWeek={currentWeek}
              versusRecords={versusRecords}
            />,
            <NewPlayers firstStarts={firstStarts} />,
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
            <a href={`/owners/${rowData.awayTeam.owner.id}`}>
              {rowData.awayTeam.owner.name}
            </a>
          ),
        },
        {
          title: "Away Team",
          field: "awayTeam.name",
          render: (rowData) => (
            <a href={`/fantasyTeams/${rowData.awayTeam.id}`}>
              {rowData.awayTeam.name}
            </a>
          ),
        },
        {
          title: "Current Vs Streak",
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
          title: "Current Vs Streak",
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
            <a href={`/fantasyTeams/${rowData.homeTeam.id}`}>
              {rowData.homeTeam.name}
            </a>
          ),
        },
        {
          title: "Home Owner",
          field: "homeTeam.owner.name",
          render: (rowData) => (
            <a href={`/owners/${rowData.homeTeam.owner.id}`}>
              {rowData.homeTeam.owner.name}
            </a>
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
            <a href={`/fantasyTeams/${rowData.fantasyTeam.id}`}>
              {rowData.fantasyTeam.name}
            </a>
          ),
        },
      ]}
    />
  );
}
