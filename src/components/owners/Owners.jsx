import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";

import Typography from "@material-ui/core/Typography";

import LoadingSpinner from "../LoadingSpinner";
import { config } from "../../api";

function Owners(props) {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${config}/owners.json`);
      setOwners((result && result.data && result.data.owners) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Owners
      </Typography>

      {loading && <LoadingSpinner isLoading={loading} />}
      {!loading && (
        <>
          <MaterialTable
            data={owners}
            options={{
              padding: "dense",
              paging: false,
              search: false,
              showTitle: false,
              exportButton: true,
            }}
            title="Owners"
            columns={[
              {
                title: "Name",
                field: "name",
                render: (rowData) => (
                  <a href={`/owners/${rowData.id}`}>{rowData.name}</a>
                ),
              },
              {
                title: "Regular Season Points",
                field: "cumulativeStats.totalPoints",
              },
              {
                title: "Regular Season Games",
                field: "cumulativeStats.totalGames",
              },
              {
                title: "Regular Season Wins",
                field: "cumulativeStats.totalWins",
              },
              {
                title: "Points / Game",
                field: "cumulativeStats.pointsPerGame",
              },
              {
                title: "Playoff Points",
                field: "cumulativeStats.totalPlayoffPoints",
              },
              {
                title: "Playoff Games",
                field: "cumulativeStats.totalPlayoffGames",
              },
              {
                title: "Playoff Wins",
                field: "cumulativeStats.totalPlayoffWins",
              },
              {
                title: "Playoff Points / Game",
                field: "cumulativeStats.playoffPointsPerGame",
              },
            ]}
          />
        </>
      )}
    </div>
  );
}

export default Owners;
