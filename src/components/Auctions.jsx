import React, { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { config } from "../api";
import StatTable from "./StatTable";

function Auctions(props) {
  const [auction, setAuction] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${config}/purchases.json`);
      console.log(result);
      setAuction((result && result.data && result.data.purchases) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const cleanedAuction = auction.map(purchase => {
    if (!purchase.player.rankReg) {
      purchase.player.rankReg = 999;
      purchase.player.rankPpr = 999;
    }
    return purchase;
  });

  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">Auctions</h1>
        </Jumbotron>
        {loading && <Spinner className="spinner" animation="border" />}
        {!loading && (
          <StatTable
            title="Auctions"
            history={props.history}
            statData={cleanedAuction}
            chosenColumns={[
              "player.id",
              "year",
              "player.name",
              "position",
              "owner.name",
              "fantasyTeam.id",
              "fantasyTeam.name",
              "price",
              "player.rankReg",
              "player.rankPpr"
            ]}
          />
        )}
      </Container>
    </div>
  );
}

export default Auctions;
