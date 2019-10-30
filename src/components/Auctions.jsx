import React, { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { config } from "../api";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  numberFilter,
  Comparator
} from "react-bootstrap-table2-filter";

function Auctions() {
  const [auction, setAuction] = useState([]);

  const sampleData = [
    {
      id: 144,
      price: 67,
      position: "QB",
      year: 2018,
      player: { id: 2506363, name: "Aaron Rodgers" },
      fantasyTeam: { id: 56, name: "Max 30 characters No profanity" },
      owner: { id: 8, name: "joe" }
    },
    {
      id: 282,
      price: 61,
      position: "RB",
      year: 2018,
      player: { id: 2552475, name: "Todd Gurley" },
      fantasyTeam: { id: 8, name: "MAN FUQ KJEMP" },
      owner: { id: 1, name: "Dag" }
    },
    {
      id: 655,
      price: 56,
      position: "QB",
      year: 2018,
      player: { id: 2532975, name: "Russell Wilson" },
      fantasyTeam: { id: 24, name: "JEFFERY" },
      owner: { id: 3, name: "Brock" }
    },
    {
      id: 722,
      price: 56,
      position: "QB",
      year: 2018,
      player: { id: 2504211, name: "Tom Brady" },
      fantasyTeam: { id: 83, name: "Dakstreet's Back" },
      owner: { id: 12, name: "Brandon" }
    },
    {
      id: 559,
      price: 53,
      position: "QB",
      year: 2018,
      player: { id: 2504775, name: "Drew Brees" },
      fantasyTeam: { id: 96, name: "Bottom Feeder Baby" },
      owner: { id: 16, name: "Dennis" }
    },
    {
      id: 654,
      price: 52,
      position: "QB",
      year: 2018,
      player: { id: 2495455, name: "Cam Newton" },
      fantasyTeam: { id: 24, name: "JEFFERY" },
      owner: { id: 3, name: "Brock" }
    },
    {
      id: 720,
      price: 52,
      position: "RB",
      year: 2018,
      player: { id: 2552461, name: "Duke Johnson" },
      fantasyTeam: { id: 83, name: "Dakstreet's Back" },
      owner: { id: 12, name: "Brandon" }
    },
    {
      id: 343,
      price: 51,
      position: "RB",
      year: 2018,
      player: { id: 2540175, name: "Le'Veon Bell" },
      fantasyTeam: { id: 16, name: "Fournetteflix and Chill" },
      owner: { id: 2, name: "Kevin" }
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      console.log(`${config}/purchases.json`);
      const result = await axios(`${config}/purchases.json`);
      console.log(result);
      setAuction((result && result.data && result.data.purchases) || []);
    };
    setAuction(sampleData);
    // fetchData();
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
  const columns = [
    {
      dataField: "year",
      text: "Year",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "player.name",
      text: "Player",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "position",
      text: "Position",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "owner.name",
      text: "Owner",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "fantasyTeam.name",
      text: "Team",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "price",
      text: "Price",
      sort: true,
      filter: numberFilter({
        defaultValue: { number: 0, comparator: Comparator.GT }
      })
    }
  ];
  return (
    <>
      <h3>Auctions</h3>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={auction}
        columns={columns}
        filter={filterFactory()}
      />
    </>
  );
}

export default Auctions;
