import React, { useState, useEffect } from "react";
import axios from "axios";

import Typography from "@material-ui/core/Typography";

import LoadingSpinner from "../LoadingSpinner";
import StatTable from "../StatTable";
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
        <StatTable
          history={props.history}
          statData={owners}
          chosenColumns={[
            "name",
            "cumulativeStats.totalPoints",
            "cumulativeStats.totalGames",
            "cumulativeStats.totalWins",
            "cumulativeStats.pointsPerGame",
            "cumulativeStats.totalPlayoffPoints",
            "cumulativeStats.totalPlayoffGames",
            "cumulativeStats.playoffPointsPerGame",
          ]}
        />
      )}
    </div>
  );
}

export default Owners;
