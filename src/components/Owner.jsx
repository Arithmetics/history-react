import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
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

  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">{owner.name}</h1>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default Owner;
