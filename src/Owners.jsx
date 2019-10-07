import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { Link } from "react-router-dom";

function Owners() {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:3001/owners.json");
      setOwners((result && result.data && result.data.owners) || []);
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
          {owner.fantasyTeams &&
            owner.fantasyTeams.length > 0 &&
            owner.fantasyTeams.map(team => (
              <ListGroupItem key={team.id}>
                <Link to={`/fantasyteams/${team.id}`}>
                  {team.year} - {team.name}
                </Link>
              </ListGroupItem>
            ))}
        </ListGroup>
        {/* <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body> */}
      </Card>
    </div>
  );
}

export default Owners;
