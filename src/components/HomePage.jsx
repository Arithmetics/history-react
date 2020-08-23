import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

import MaterialTable from "material-table";
import LoadingSpinner from "./LoadingSpinner";
import { config } from "../api";

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

  const getStreakVs = (owner1ID, owner2ID) => {
    const recordSet = versusRecords.filter((record) => record.id === owner1ID);
    const recordFinal = recordSet[0].versusRecords.filter(
      (record) => record.id === owner2ID
    );
    return recordFinal && recordFinal[0] ? recordFinal[0].streak : 0;
  };

  const streakEmoji = (streak) => {
    let final = "";
    let emoji = "🧊";
    if (streak > 0) {
      emoji = "🔥";
    }
    const times = Math.abs(streak);
    for (let i = 0; i < times; i++) {
      final += emoji;
    }
    return final;
  };

  return (
    <>
      <Typography variant="h3">Welcome to the lab....</Typography>
      {loading && <LoadingSpinner isLoading={loading} />}
      {!loading && (
        <>
          <br></br>
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
                    getStreakVs(
                      rowData.awayTeam.owner.id,
                      rowData.homeTeam.owner.id
                    )
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
                    getStreakVs(
                      rowData.homeTeam.owner.id,
                      rowData.awayTeam.owner.id
                    )
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
          <br></br>
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
                  <a href={`/players/${rowData.player.id}`}>
                    {rowData.player.name}
                  </a>
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
          <br></br>
        </>
      )}
    </>
  );
}
