import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

function Home() {
  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">Welcome to the Lab</h1>
        </Jumbotron>
        <h1>97062 Person of the Year</h1>
        <img src="https://i.ibb.co/LZdq8mK/IMG-3020.jpg" />
      </Container>
    </div>
  );
}

export default Home;
