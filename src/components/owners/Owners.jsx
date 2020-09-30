import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

import Typography from "@material-ui/core/Typography";

import LoadingSpinner from "../LoadingSpinner";
import { config } from "../../api";

import { HeaderCellWithTooltip } from "../materialTableElements";

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
                title: <HeaderCellWithTooltip abbr={"OWN"} />,
                field: "name",
                render: (rowData) => (
                  <Link component={RouterLink} to={`/owners/${rowData.id}`}>
                    {rowData.name}
                  </Link>
                ),
              },
              {
                title: <HeaderCellWithTooltip abbr={"RSP"} />,
                field: "cumulativeStats.totalPoints",
              },
              {
                title: <HeaderCellWithTooltip abbr={"RSG"} />,
                field: "cumulativeStats.totalGames",
              },
              {
                title: <HeaderCellWithTooltip abbr={"RSW"} />,
                field: "cumulativeStats.totalWins",
              },
              {
                title: <HeaderCellWithTooltip abbr={"PPG"} />,
                field: "cumulativeStats.pointsPerGame",
              },
              {
                title: <HeaderCellWithTooltip abbr={"PP"} />,
                field: "cumulativeStats.totalPlayoffPoints",
              },
              {
                title: <HeaderCellWithTooltip abbr={"PG"} />,
                field: "cumulativeStats.totalPlayoffGames",
              },
              {
                title: <HeaderCellWithTooltip abbr={"PW"} />,
                field: "cumulativeStats.totalPlayoffWins",
              },
              {
                title: <HeaderCellWithTooltip abbr={"PPPG"} />,
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
