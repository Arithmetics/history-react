import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function TeamSummary({ match }) {
  const [fantasyTeam, setTeam] = useState({});

  useEffect(() => {
    const teamID = match.params.id;
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:3001/fantasy_teams/${teamID}.json`
      );
      setTeam((result && result.data && result.data.fantasyTeam) || {});
    };
    fetchData();
  }, [match.params.id]);

  const fantasyStartWeeks = (fantasyTeam && fantasyTeam.fantasyStarts) || {};
  const ownerName =
    (fantasyTeam && fantasyTeam.owner && fantasyTeam.owner.name) || "";
  const fantasyTeamName = (fantasyTeam && fantasyTeam.name) || "";
  const year = (fantasyTeam && fantasyTeam.year) || "";
  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">
            {" "}
            {ownerName} - {year} - {fantasyTeamName}
          </h1>
        </Jumbotron>
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
