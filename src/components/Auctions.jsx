import React, { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { config } from "../api";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  numberFilter,
  Comparator,
  multiSelectFilter
} from "react-bootstrap-table2-filter";

function Auctions(props) {
  const [auction, setAuction] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`${config}/purchases.json`);
      const result = await axios(`${config}/purchases.json`);
      console.log(result);
      setAuction((result && result.data && result.data.purchases) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">Auctions</h1>
        </Jumbotron>
        {loading && <Spinner className="spinner" animation="border" />}
        {!loading && (
          <AuctionTable
            history={props.history}
            auction={auction}
            chosenColumns={[
              "player.id",
              "year",
              "player.name",
              "position",
              "owner.name",
              "fantasyTeam.id",
              "fantasyTeam.name",
              "price"
            ]}
          />
        )}
      </Container>
    </div>
  );
}

export function AuctionTable({ auction, chosenColumns, history }) {
  // const distinctYears = auction && [...new Set(auction.years)];
  // console.log(distinctYears);
  const [distinct, setDistinct] = useState({
    distinctYears: {},
    distinctPositions: {},
    distinctOwners: {}
  });

  useEffect(() => {
    const distinctYears = [...new Set(auction.map(x => x.year))].reduce(
      (o, val) => {
        o[val] = val;
        return o;
      },
      {}
    );
    const distinctPositions = [...new Set(auction.map(x => x.position))].reduce(
      (o, val) => {
        o[val] = val;
        return o;
      },
      {}
    );
    const distinctOwners = [
      ...new Set(auction.map(x => x.owner && x.owner.name))
    ].reduce((o, val) => {
      o[val] = val;
      return o;
    }, {});

    setDistinct({ distinctYears, distinctPositions, distinctOwners });
  }, [auction]);

  const columns = [
    {
      dataField: "year",
      text: "Year",
      sort: true,
      filter: multiSelectFilter({
        options: distinct.distinctYears
      })
    },
    {
      dataField: "player.id",
      text: "ID",
      hidden: true
    },
    {
      dataField: "player.name",
      text: "Player",
      sort: true,
      filter: textFilter(),
      classes: "table-link",
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          history.push(`/players/${row.player.id}`);
        }
      }
    },
    {
      dataField: "position",
      text: "Position",
      sort: true,
      filter: multiSelectFilter({
        options: distinct.distinctPositions
      })
    },
    {
      dataField: "owner.name",
      text: "Owner",
      sort: true,
      filter: multiSelectFilter({
        options: distinct.distinctOwners
      })
    },
    {
      dataField: "fantasyTeam.name",
      text: "Team",
      sort: true,
      filter: textFilter(),
      classes: "table-link",
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          history.push(`/fantasyTeams/${row.fantasyTeam.id}`);
        }
      }
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

  const displayedColumns = columns.filter(col =>
    chosenColumns.includes(col.dataField)
  );
  return (
    <>
      <h3>Auctions</h3>
      <BootstrapTable
        bootstrap4
        hover
        condensed
        keyField="id"
        data={auction}
        columns={displayedColumns}
        filter={filterFactory()}
      />
    </>
  );
}

export default Auctions;
