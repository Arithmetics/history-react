import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import { AuctionTable } from "./Auctions";
import Spinner from "react-bootstrap/Spinner";
import { config } from "../api";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  numberFilter,
  Comparator
} from "react-bootstrap-table2-filter";

function PlayerSummary({ match, history }) {
  const [player, setPlayer] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const playerID = match.params.id;
    const fetchData = async () => {
      const result = await axios(`${config}/players/${playerID}.json`);
      setPlayer((result && result.data && result.data.player) || {});
      setLoading(false);
    };
    fetchData();
  }, [match.params.id]);

  const playerName = player && player.name;
  const fantasyStarts = (player && player.fantasyStarts) || [];
  const auction = (player && player.purchases) || [];

  return (
    <div>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">Player Summary</h1>
          {!loading && <h2>{playerName}</h2>}
        </Jumbotron>
        {loading && <Spinner className="spinner" animation="border" />}
        {!loading && (
          <div>
            {auction.length > 0 && (
              <AuctionTable
                history={history}
                auction={auction}
                chosenColumns={[
                  "year",
                  "position",
                  "owner.name",
                  "fantasyTeam.name",
                  "fantasyTeam.id",
                  "price"
                ]}
              />
            )}
            <FantasyStartsTable
              history={history}
              fantasyStarts={fantasyStarts}
              chosenColumns={[
                "year",
                "week",
                "position",
                "points",
                "owner.name",
                "fantasyTeam.id",
                "fantasyTeam.name"
              ]}
            />
          </div>
        )}
      </Container>
    </div>
  );
}

export default PlayerSummary;

export function FantasyStartsTable({ fantasyStarts, chosenColumns, history }) {
  const columns = [
    {
      dataField: "year",
      text: "Year",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "week",
      text: "Week",
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
      dataField: "points",
      text: "Points",
      sort: true,
      filter: numberFilter({
        defaultValue: { number: 0, comparator: Comparator.GT }
      })
    },
    {
      dataField: "owner.name",
      text: "Owner",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "fantasyTeam.id",
      text: "fantasyTeamID",
      hidden: true
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
    }
  ];

  const displayedColumns = columns.filter(col =>
    chosenColumns.includes(col.dataField)
  );
  return (
    <>
      <h3>Fantasy Starts</h3>
      <BootstrapTable
        bootstrap4
        hover
        condensed
        keyField="id"
        data={fantasyStarts}
        columns={displayedColumns}
        filter={filterFactory()}
      />
    </>
  );
}
