import React, { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import LoadingSpinner from "./LoadingSpinner";
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

  const cleanedAuction = auction.map((purchase) => {
    if (!purchase.player.rankReg) {
      purchase.player.rankReg = 999;
      purchase.player.rankPpr = 999;
    }
    return purchase;
  });

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Auctions
      </Typography>
      {loading && <LoadingSpinner isLoading={loading} />}
      {!loading && (
        <StatTable
          title="Auctions"
          history={props.history}
          statData={cleanedAuction}
          chosenColumns={[
            "id",
            "player.id",
            "year",
            "player.name",
            "position",
            "owner.name",
            "fantasyTeam.id",
            "fantasyTeam.name",
            "price",
            "player.rankReg",
            "player.rankPpr",
          ]}
        />
      )}
    </>
  );
}

export default Auctions;
