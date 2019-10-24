import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">Welcome to the Lab</h1>
        </Jumbotron>
        <div>Home page</div>
        <Link to={`/owners`}>Owners</Link>
        <br />
        <Link to={`/auctions`}>Auctions</Link>
      </Container>
    </div>
  );
}

export default Home;
