import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { AuctionTable } from "./Auctions";
import { Link } from "react-router-dom";
import { config } from "../api";

function PlayerSummary({ match }) {
  const [player, setPlayer] = useState({});

  useEffect(() => {
    const playerID = match.params.id;
    const fetchData = async () => {
      const result = await axios(`${config}/players/${playerID}.json`);
      setPlayer((result && result.data && result.data.player) || {});
    };
    fetchData();
  }, [match.params.id]);

  const playerName = player && player.name;
  const fantasyStarts = (player && player.fantasyStarts) || [];
  const auction = (player && player.purchases) || [];

  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">{playerName}</h1>
        </Jumbotron>
        <AuctionTable auction={auction} />
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Year</th>
              <th>Week</th>
              <th>Position</th>
              <th>Points</th>
              <th>Owner</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {fantasyStarts.map((start, i) => (
              <tr key={i}>
                <td>{start.year}</td>
                <td>{start.week}</td>
                <td>{start.position}</td>
                <td>{start.points}</td>
                <td>{start.owner && start.owner.name}</td>
                <td>
                  <Link
                    to={`/fantasyTeams/${start.fantasyTeam &&
                      start.fantasyTeam.id}`}
                  >
                    {start.fantasyTeam && start.fantasyTeam.name}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default PlayerSummary;
