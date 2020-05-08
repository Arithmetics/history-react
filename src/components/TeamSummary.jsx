import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import LoadingSpinner from "./LoadingSpinner";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { config } from "../api";
import StatTable from "./StatTable";

const useStyles = makeStyles((theme) => ({
  statChip: {
    margin: 5,
  },
  expansion: {
    marginTop: 20,
  },
  panelTop: {
    borderBottom: "grey solid 1px",
  },
  teamsArea: {
    padding: 10,
    display: "block",
  },
  teamCard: {
    width: "98%",
    backgroundColor: "#4e5563",
    margin: "10px auto",
    display: "flex",
    borderRadius: 15,
  },
  teamCardContent: {
    padding: "10px !important",
    display: "flex",
    alignItems: "baseline",
    width: "100%",
    flexWrap: "wrap",
  },
  teamCardContentItem: {
    marginRight: 20,
  },
  teamName: {
    width: 230,
    textOverflow: "ellipsis",
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

function TeamSummary({ match, history }) {
  const classes = useStyles();
  const [fantasyTeam, setTeam] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teamID = match.params.id;
    const fetchData = async () => {
      const result = await axios(`${config}/fantasy_teams/${teamID}.json`);
      setTeam((result && result.data && result.data.fantasyTeam) || {});
      setLoading(false);
    };
    fetchData();
  }, [match.params.id]);

  const fantasyStartWeeks = (fantasyTeam && fantasyTeam.fantasyStarts) || {};
  const ownerName =
    (fantasyTeam && fantasyTeam.owner && fantasyTeam.owner.name) || "";
  const fantasyTeamName = (fantasyTeam && fantasyTeam.name) || "";
  const year = (fantasyTeam && fantasyTeam.year) || "";
  const auction = (fantasyTeam && fantasyTeam.purchases) || [];
  const fantasyGames = (fantasyTeam && fantasyTeam.fantasyGames) || [];
  const cuumulativeStats = (fantasyTeam && fantasyTeam.cuumulativeStats) || {};
  const regularSeasonGames = fantasyGames.filter((game) => game.week < 14);
  const playoffGames = fantasyGames.filter((game) => game.week > 13);

  return (
    <div>
      <h1 className="header">Team Summary</h1>
      {!loading && (
        <>
          <Typography variant="h3" gutterBottom>
            {ownerName} - {year} - {fantasyTeamName}
          </Typography>

          <Chip
            className={classes.statChip}
            label={`Record: (${cuumulativeStats.seasonWins} - 
            ${13 - cuumulativeStats.seasonWins})`}
          />
          <Chip
            className={classes.statChip}
            label={`Season Points: ${Math.round(
              cuumulativeStats.seasonPoints
            )}`}
          />
        </>
      )}

      {loading && <LoadingSpinner isLoading={loading} />}
      {!loading && (
        <div>
          {auction.length > 0 && (
            <StatTable
              title="Auctions"
              statData={auction}
              history={history}
              chosenColumns={["player.id", "player.name", "position", "price"]}
            />
          )}
          <GameTable
            regularSeason={true}
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
          <div className="startWeeks">
            {Object.keys(fantasyStartWeeks).map((startWeek, i) => (
              <div key={startWeek}>
                <Card className="startWeeks__card">
                  <Card.Body>
                    <Card.Title>
                      week: {startWeek} -{" "}
                      {weekTotal(fantasyStartWeeks[startWeek])}
                    </Card.Title>
                    <StartWeek
                      key={i}
                      startWeek={fantasyStartWeeks[startWeek]}
                    />
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StartWeek({ startWeek }) {
  return (
    <div>
      {startWeek.map((start, index) => (
        <Start key={index} start={start} />
      ))}
    </div>
  );
}

function Start({ start }) {
  return (
    <div>
      <strong>{start.position}</strong>:{" "}
      <Link to={`/players/${start.player && start.player.id}`}>
        {start.player && start.player.name}
      </Link>
      - {start.points}
    </div>
  );
}

function weekTotal(startWeek) {
  let total = 0;
  startWeek.forEach((start) => {
    if (
      ["QB", "RB", "WR", "TE", "Q/R/W/T", "DEF", "K"].includes(start.position)
    ) {
      total += start.points;
    }
  });
  return Math.round(total * 100) / 100;
}

export default TeamSummary;

function GameTable({ regularSeason, fantasyGames, fantasyTeamName }) {
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
