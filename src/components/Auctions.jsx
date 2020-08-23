import React, { useState, useEffect } from "react";
import axios from "axios";

import MaterialTable from "material-table";

import Typography from "@material-ui/core/Typography";
import LoadingSpinner from "./LoadingSpinner";
import { config } from "../api";

import { createLookup, filterBetween } from "./materialTableHelpers";

function Auctions(props) {
  const [auction, setAuction] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${config}/purchases.json`);
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
        <>
          <MaterialTable
            title="All Aquisitions"
            data={cleanedAuction}
            options={{
              filtering: true,
              padding: "dense",
              paging: true,
              pageSize: 50,
              pageSizeOptions: [50, 100, cleanedAuction.length],
              search: true,
              exportButton: true,
              emptyRowsWhenPaging: false,
              exportAllData: true,
              showTitle: false,
            }}
            columns={[
              {
                title: "Player",
                field: "player.name",
                filtering: false,
                render: (rowData) => (
                  <a href={`/players/${rowData.player.id}`}>
                    {rowData.player.name}
                  </a>
                ),
              },
              {
                title: "Year",
                field: "year",
                lookup: createLookup(cleanedAuction, ["year"]),
              },
              {
                title: "Position",
                field: "position",
                lookup: createLookup(cleanedAuction, ["position"]),
              },
              {
                title: "Owner",
                field: "owner.name",
                lookup: createLookup(cleanedAuction, ["owner", "name"]),
                render: (rowData) => (
                  <a href={`/owners/${rowData.owner.id}`}>
                    {rowData.owner.name}
                  </a>
                ),
              },
              {
                title: "Team",
                field: "fantasyTeam.name",
                lookup: createLookup(cleanedAuction, ["fantasyTeam", "name"]),
                render: (rowData) => (
                  <a href={`/fantasyTeams/${rowData.fantasyTeam.id}`}>
                    {rowData.fantasyTeam.name}
                  </a>
                ),
              },
              {
                title: "Price",
                field: "price",
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, ["price"]),
              },
              {
                title: "Preseason Draft Rank",
                field: "player.preSeasonRank",
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, ["player", "preSeasonRank"]),
              },
              {
                title: "Final Season Rank",
                field: "player.rankReg",
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, ["player", "rankReg"]),
              },
              {
                title: "Final Season Rank PPR",
                field: "player.rankPpr",
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, ["player", "rankPpr"]),
              },
            ]}
          />
        </>
      )}
    </>
  );
}

export default Auctions;
