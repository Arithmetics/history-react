import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { groupByWeek } from "./helper";

function TeamSummary({ match }) {
  const [fantasyTeam, setTeam] = useState([]);

  useEffect(() => {
    const teamID = match.params.id;
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:3001/fantasy_teams/${teamID}.json`
      );
      setTeam((result && result.data && result.data.fantasyTeam) || []);
    };
    fetchData();
  }, [match.params.id]);

  const fantasyStartWeeks = groupByWeek(
    (fantasyTeam && fantasyTeam.fantasyStarts) || []
  );

  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">Team Summary</h1>
        </Jumbotron>
        <div className="startWeeks">
          {Object.keys(fantasyStartWeeks).map((startWeek, i) => (
            <div>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>week: {startWeek}</Card.Title>
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
  const order = ["QB", "RB", "WR", "TE", "Q/R/W/T", "DEF", "K", "BN", "RES"];
  const sortedStarts = startWeek.sort(function(a, b) {
    return order.indexOf(a.position) > order.indexOf(b.position) ? 1 : -1;
  });
  return (
    <div>
      {sortedStarts.map((start, index) => (
        <Start key={index} start={start} />
      ))}
    </div>
  );
}

function Start({ start }) {
  return (
    <div>
      <strong>{start.position}</strong>: {start.player.name} - {start.points}
    </div>
  );
}

export default TeamSummary;
