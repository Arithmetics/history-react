import React, { useState, useEffect } from "react";
import axios from "axios";

import MaterialTable from "material-table";

import Typography from "@material-ui/core/Typography";
import LoadingSpinner from "../LoadingSpinner";

import { createLookup, filterBetween } from "../materialTableHelpers";

import { config } from "../../api";

function AllPlayers({ match, history }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${config}/players.json`);
      setPlayers(result && result.data && result.data.players);
      console.log(result.data.players);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h3" gutterBottom>
        All Players
      </Typography>
      {loading && <LoadingSpinner isLoading={loading} />}
      {!loading && (
        <>
          <MaterialTable
            title="All Players"
            data={players}
            options={{
              filtering: true,
              padding: "dense",
              paging: true,
              pageSize: 50,
              pageSizeOptions: [50, 100, players.length],
              search: true,
              exportButton: true,
              emptyRowsWhenPaging: false,
              exportAllData: true,
              showTitle: false,
            }}
            columns={[
              {
                title: "Player",
                field: "playerName",
                filtering: false,
                render: (rowData) => (
                  <a href={`/players/${rowData.id}`}>{rowData.playerName}</a>
                ),
              },
              {
                title: "Position",
                field: "careerStats.position",
                lookup: createLookup(players, ["careerStats", "position"]),
              },
              {
                title: "Total Starts",
                field: "careerStats.totalStarts",
              },
              {
                title: "Regular Season Points",
                field: "careerStats.totalPoints",
                filtering: false,
              },
              {
                title: "Playoff Points",
                field: "careerStats.playoffPoints",
                filtering: false,
              },
              {
                title: "Finals Points",
                field: "careerStats.finalsPoints",
                filtering: false,
              },
              {
                title: "Rings",
                field: "careerStats.championships",
                filtering: false,
              },
              {
                title: "Total Auction $",
                field: "careerStats.totalAuctionMoney",
                filtering: false,
              },
              {
                title: "Highest Auction Money",
                field: "careerStats.highestAuctionMoney",
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, [
                    "careerStats",
                    "highestAuctionMoney",
                  ]),
              },
              {
                title: "Best Start",
                field: "careerStats.bestStart",
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, ["careerStats", "bestStart"]),
              },
              {
                title: "Best Pre-Season Draft Rank",
                field: "careerStats.bestPreseasonRank",
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, [
                    "careerStats",
                    "bestPreseasonRank",
                  ]),
              },
              {
                title: "Best Final Season Rank Reg",
                field: "careerStats.bestRegRank",
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, ["careerStats", "bestRegRank"]),
              },
              {
                title: "Best Final Season Rank PPR",
                field: "careerStats.bestPprRank",
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, ["careerStats", "bestPprRank"]),
              },
            ]}
          />
        </>
      )}
    </>
  );
}

export default AllPlayers;
