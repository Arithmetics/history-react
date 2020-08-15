import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import LoadingSpinner from "./LoadingSpinner";
import { config } from "../api";
import { data } from "./data";
import OddsGraph from "./OddsGraph";

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    height: 500,
  },
}));

function prepareNivoData(rawData) {
  const allOdds = {
    make_playoffs: [],
    get_bye: [],
    win_championship: [],
  };
  const tempDataSorts = {
    make_playoffs: {},
    get_bye: {},
    win_championship: {},
  };
  Object.keys(allOdds).forEach((category) => {
    rawData
      .filter((odd) => odd.category === category)
      .forEach((odd) => {
        if (!tempDataSorts[category][odd.fantasyTeam.id]) {
          tempDataSorts[category][odd.fantasyTeam.id] = [];
        }
        tempDataSorts[category][odd.fantasyTeam.id].push({
          teamID: odd.fantasyTeam.id,
          id: odd.fantasyTeam.name,
          x: odd.week,
          y: odd.odds,
        });
      });

    Object.keys(tempDataSorts[category]).forEach((key) => {
      const allTeamData = tempDataSorts[category][key];
      console.log(allTeamData);
      const finalTeamSeries = {};
      allTeamData.forEach((data) => {
        finalTeamSeries.id = data.id;
        finalTeamSeries.teamID = data.teamID;
        if (!finalTeamSeries.data) {
          finalTeamSeries.data = [];
        }
        finalTeamSeries.data.push({ x: data.x, y: data.y });
      });
      allOdds[category].push(finalTeamSeries);
    });
  });

  return allOdds;
}

export default function HomePage() {
  const classes = useStyles();
  const [versusRecords, setVersusRecords] = useState([]);
  const [scheduledGames, setScheduledGames] = useState([]);
  const [firstStarts, setFirstStarts] = useState([]);
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
      setPlayoffOdds((result && result.data && result.data.playoffOdds) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const graphData = prepareNivoData(playoffOdds);

  const currentWeek =
    scheduledGames && scheduledGames.length > 0 && scheduledGames[0].week;

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
          <div className={classes.chartContainer}>
            <OddsGraph data={graphData} />
          </div>
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
            title={`First Time Starters Last Week`}
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
