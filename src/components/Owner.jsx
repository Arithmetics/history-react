import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { config } from "../api";

function Owner(props) {
  const [owner, setOwner] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ownerID = props.match.params.id;
    const fetchData = async () => {
      const result = await axios(`${config}/owners/${ownerID}.json`);
      setOwner((result && result.data && result.data.owner) || {});
      setLoading(false);
    };
    fetchData();
    console.log(owner);
  }, []);

  const fantasyTeams = owner.fantasyTeams || [];
  const cumulativeStats = owner.cumulativeStats || {};

  return (
    <div>
      <Container className="p-3">
        {loading && <Spinner className="spinner" animation="border" />}
        {!loading && (
          <>
            <Jumbotron>
              <h1 className="header">{owner.name}</h1>
              <Badge variant="secondary" className="owner__badge">
                Record: {cumulativeStats.totalWins} -{" "}
                {cumulativeStats.totalGames - cumulativeStats.totalWins}
              </Badge>
              <Badge variant="secondary" className="owner__badge">
                Total Points: {cumulativeStats.totalPoints}
              </Badge>
              <Badge variant="secondary" className="owner__badge">
                Playoff Wins: {cumulativeStats.totalPlayoffWins}
              </Badge>
            </Jumbotron>
            <div className="owner-body">
              {fantasyTeams.map(team => (
                <Card style={{ width: "30rem" }} className="owner-body__card">
                  <Card.Body>
                    <Card.Title>
                      {team.year} - {team.name}
                    </Card.Title>
                    <Card.Text>
                      Record: ({team.seasonWins} - {13 - team.seasonWins})
                      <br></br>
                      Points: {Math.round(team.seasonPoints)}
                    </Card.Text>
                    <Button variant="primary" href={`/fantasyTeams/${team.id}`}>
                      Go to team
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default Owner;
