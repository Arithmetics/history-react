import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import LoadingSpinner from "../LoadingSpinner";
import { config } from "../../api";
import TabContainer from "../TabContainer";
import UpcomingGames from "./UpcomingGames";
import NewPlayers from "./NewPlayers";
import Leverage from "./Leverage";
import Standings from "./Standings";
import LastWeeksGames from './LastWeeksGames';

export default function HomePage() {
  const [versusRecords, setVersusRecords] = useState([]);
  const [scheduledGames, setScheduledGames] = useState([]);
  const [lastWeeksGames, setLastWeeksGames] = useState([]);
  const [firstStarts, setFirstStarts] = useState([]);
  const [standings, setStandings] = useState([]);
  const [playoffOdds, setPlayoffOdds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${config}/home/show.json`);
      // console.log(result)
      setVersusRecords(
        (result && result.data && result.data.versusRecords) || []
      );
      setScheduledGames(
        (result && result.data && result.data.scheduledGames) || []
      );
      setLastWeeksGames(
        (result && result.data && result.data.lastWeeksGames) || []
      );
      setFirstStarts((result && result.data && result.data.firstStarts) || []);

      setStandings((result && result.data && result.data.standings) || []);
      setPlayoffOdds((result && result.data && result.data.playoffOdds) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const currentWeek =
    (scheduledGames && scheduledGames.length > 0 && scheduledGames[0].week) ||
    0;

  return (
    <>
      <Typography variant="h3">The 97062 Lab</Typography>
      <br></br>
      {loading && <LoadingSpinner isLoading={loading} />}
      {!loading && (
        <TabContainer
          tabNames={[
            `Week ${currentWeek} Preview`,
            `Week ${currentWeek} Leverage`,
            `Week ${currentWeek - 1} Games`,
            `Week ${currentWeek - 1} New Players`,
            `Standings`,
          ]}
          tabs={[
            <UpcomingGames
              scheduledGames={scheduledGames}
              currentWeek={currentWeek}
              versusRecords={versusRecords}
            />,
            <Leverage playoffOdds={playoffOdds} />,
            <LastWeeksGames lastWeeksGames={lastWeeksGames} lastWeek={currentWeek - 1}/>,
            <NewPlayers firstStarts={firstStarts} />,
            <Standings standings={standings} playoffOdds={playoffOdds} />,
          ]}
        />
      )}
    </>
  );
}
