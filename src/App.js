import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

function App() {
  const [owners, setOwners] = useState(["matt", "brock", "kevin"]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:3001/owners");
      console.log(result);
      setOwners(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">Welcome to the Lab</h1>
        </Jumbotron>
        <div className="owners">
          {owners.map((owner, index) => (
            <Owner key={index} owner={owner} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default App;

function Owner({ owner }) {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={require("./male-default-placeholder-avatar-profile-260nw-387516193.webp")}
        />
        <Card.Body>
          <Card.Title>{owner.name}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {owner.fantasy_teams &&
            owner.fantasy_teams.length > 0 &&
            owner.fantasy_teams.map(team => (
              <ListGroupItem key={team.id}>
                {team.year} - {team.name}
              </ListGroupItem>
            ))}
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}
