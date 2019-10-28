import React, { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { config } from "../api";
import { Link } from "react-router-dom";

function Auctions() {
  const [auction, setAuction] = useState([]);

  useEffect(() => {
    console.log("asdfasdf");
    const fetchData = async () => {
      console.log(`${config}/purchases.json`);
      const result = await axios(`${config}/purchases.json`);
      console.log(result);
      setAuction((result && result.data && result.data.purchases) || []);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">Auctions</h1>
        </Jumbotron>

        <AuctionTable auction={auction} />
      </Container>
    </div>
  );
}

export function AuctionTable({ auction }) {
  return (
    <>
      <h3>Auctions</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Year</th>
            <th>Player</th>
            <th>Position</th>
            <th>Owner</th>
            <th>Team</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {auction.map((purchase, i) => (
            <tr key={i}>
              <td>{purchase.year}</td>
              <td>
                <Link to={`/players/${purchase.player && purchase.player.id}`}>
                  {purchase.player && purchase.player.name}
                </Link>
              </td>
              <td>{purchase.position}</td>
              <td>{purchase.owner && purchase.owner.name}</td>
              <td>
                <Link
                  to={`/fantasyTeams/${purchase.fantasyTeam &&
                    purchase.fantasyTeam.id}`}
                >
                  {purchase.fantasyTeam && purchase.fantasyTeam.name}
                </Link>
              </td>
              <td>{purchase.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Auctions;
