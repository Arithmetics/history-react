import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import {
  TeamAvatarLink,
  GradedScore
} from "../materialTableElements";

import RostersTable from "./RostersTable";
import theme from "../../theme.js";

function wonGame(teamName, game) {
  if (teamName === (game.homeTeam && game.homeTeam.name)) {
    if (game.homeScore > game.awayScore) {
      return true;
    }
    return false;
  } else if (teamName === (game.awayTeam && game.awayTeam.name)) {
    if (game.awayScore > game.homeScore) {
      return true;
    }
    return false;
  }
  return false;
}
const useStyles = makeStyles({
  root: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  tableLink: {
    color: "white",
  },
});

export default function GameTable({
  regularSeason,
  fantasyGames,
  fantasyTeamName,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MaterialTable
        title={regularSeason ? "Regular Season" : "Playoffs"}
        data={fantasyGames}
        options={{
          padding: "dense",
          showTitle: true,
          paging: false,
          search: false,
          rowStyle: (rowData) => ({
            backgroundColor: wonGame(fantasyTeamName, rowData)
              ? theme.palette.success.darkest
              : "inherit",
          }),
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
        detailPanel={(rowData) => {
          return (
            <RostersTable
              homeRoster={
                rowData.homeTeam.fantasyStarts[rowData.week.toString()]
              }
              awayRoster={
                rowData.awayTeam.fantasyStarts[rowData.week.toString()]
              }
            />
          );
        }}
        columns={[
          {
            title: "Week",
            field: "week",
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
            title: "Away Score",
            field: "awayScore",
            render: (rowData) => (
              <GradedScore score={rowData.awayScore} grade={rowData.awayGrade} />
            ),
          },
          {
            title: "Home Score",
            field: "homeScore",
            render: (rowData) => (
              <GradedScore score={rowData.homeScore} grade={rowData.homeGrade} />
            ),
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
        ]}
      />
    </div>
  );
}
