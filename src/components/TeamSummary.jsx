import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AuctionTable } from "./Auctions";
import { Link } from "react-router-dom";
import { config } from "../api";

function TeamSummary({ match }) {
  const [fantasyTeam, setTeam] = useState({});

  useEffect(() => {
    const teamID = match.params.id;
    const fetchData = async () => {
      const result = await axios(`${config}/fantasy_teams/${teamID}.json`);
      setTeam((result && result.data && result.data.fantasyTeam) || {});
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

  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">
            {" "}
            {ownerName} - {year} - {fantasyTeamName}
          </h1>
          <h2 className="header">
            Wins: {cuumulativeStats.seasonWins}, Points:
            {Math.round(cuumulativeStats.seasonPoints)}
          </h2>
        </Jumbotron>
        <AuctionTable auction={auction} />
        <GameTable
          fantasyGames={fantasyGames}
          fantasyTeamName={fantasyTeamName}
        />
        <div className="startWeeks">
          {Object.keys(fantasyStartWeeks).map((startWeek, i) => (
            <div key={startWeek}>
              <Card className="startWeeks__card">
                <Card.Body>
                  <Card.Title>
                    week: {startWeek} -{" "}
                    {weekTotal(fantasyStartWeeks[startWeek])}
                  </Card.Title>
                  <StartWeek key={i} startWeek={fantasyStartWeeks[startWeek]} />
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
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
  startWeek.forEach(start => {
    if (
      ["QB", "RB", "WR", "TE", "Q/R/W/T", "DEF", "K"].includes(start.position)
    ) {
      total += start.points;
    }
  });
  return Math.round(total * 100) / 100;
}

export default TeamSummary;

function GameTable({ fantasyGames, fantasyTeamName }) {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Week</th>
          <th>Home Team</th>
          <th>Home Score</th>
          <th>Away Score</th>
          <th>Away Team</th>
        </tr>
      </thead>
      <tbody>
        {fantasyGames.map((game, i) => (
          <tr
            key={i}
            className={
              wonGame(fantasyTeamName, game) ? "table-success" : "table-danger"
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
