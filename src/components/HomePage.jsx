import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import MaterialTable from "material-table";

import LoadingSpinner from "./LoadingSpinner";
import { config } from "../api";

export default function HomePage() {
  const [versusRecords, setVersusRecords] = useState([]);
  const [scheduledGames, setScheduledGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${config}/home/show.json`);
      setVersusRecords(
        (result && result.data && result.data.versusRecords) || []
      );
      setScheduledGames(
        (result && result.data && result.data.scheduledGames) || []
      );
      setLoading(false);
    };
    fetchData();
  }, []);

  const currentWeek =
    scheduledGames && scheduledGames.length > 0 && scheduledGames[0].week;

  return (
    <>
      <Typography variant="h3">Welcome to the lab....</Typography>
      {loading && <LoadingSpinner isLoading={loading} />}
      {!loading && (
        <>
          <MaterialTable
            data={scheduledGames}
            options={{
              paging: false,
              sorting: false,
              search: false,
              showTitle: true,
              exportButton: false,
            }}
            title={`Week ${currentWeek} Upcoming Games`}
            columns={[
              {
                title: "Away Owner",
                field: "awayTeam.owner.name",
              },
              {
                title: "Away Team",
                field: "awayTeam.name",
              },
              {
                title: "Home Team",
                field: "homeTeam.name",
              },
              {
                title: "Home Owner",
                field: "homeTeam.owner.name",
              },
            ]}
          />
        </>
      )}
    </>
  );
}
