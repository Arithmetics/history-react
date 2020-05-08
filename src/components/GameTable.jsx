import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

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

export default function GameTable({
  regularSeason,
  fantasyGames,
  fantasyTeamName,
  fantasyStartWeeks,
}) {
  return (
    <>
      <h3>{regularSeason ? "Regular Season" : "Playoffs"}</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Week</th>
            <th>Away Team</th>
            <th>Away Score</th>
            <th>Home Score</th>
            <th>Home Team</th>
          </tr>
        </thead>
        <tbody>
          {fantasyGames.map((game, i) => (
            <tr
              key={i}
              className={
                wonGame(fantasyTeamName, game)
                  ? "table-success"
                  : "table-danger"
              }
            >
              <td>{game.week}</td>
              <td>
                <Link to={`/fantasyTeams/${game.awayTeam && game.awayTeam.id}`}>
                  {game.awayTeam && game.awayTeam.name}
                </Link>
              </td>
              <td>{game.awayScore}</td>
              <td>{game.homeScore}</td>
              <td>
                <Link to={`/fantasyTeams/${game.homeTeam && game.homeTeam.id}`}>
                  {game.homeTeam && game.homeTeam.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
