import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import LoadingSpinner from "./LoadingSpinner";

import { GiTrophy } from "react-icons/gi";
import { config } from "../api";
import StatTable from "./StatTable";

const useStyles = makeStyles({
  statChip: {
    margin: 5,
  },
  profileImage: {
    borderRadius: 500,
    border: "1px solid #0b878c",
  },
});

function PlayerSummary({ match, history }) {
  const classes = useStyles();
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
  const seasonStats = (player && player.seasonStats) || [];
  const championships =
    (player && player.careerStats && player.careerStats.championships) || 0;

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Player Summary
      </Typography>

      {loading && <LoadingSpinner isLoading={loading} />}
      {!loading && (
        <div>
          <img
            className={classes.profileImage}
            src={`https://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/${player.pictureId}.png`}
          />
          {!loading && <h2>{playerName}</h2>}
          {[...Array(championships)].map((i) => (
            <Chip key={i} className={classes.statChip} label={<GiTrophy />} />
          ))}
          {auction.length > 0 && (
            <StatTable
              title="Auctions"
              history={history}
              statData={auction}
              chosenColumns={[
                "year",
                "position",
                "owner.name",
                "fantasyTeam.name",
                "fantasyTeam.id",
                "price",
              ]}
            />
          )}
          <hr></hr>
          <StatTable
            title="Season Stats"
            history={history}
            statData={seasonStats}
            chosenColumns={[
              "year",
              "gamesPlayed",
              "ageAtSeason",
              "experienceAtSeason",
              "fantasyPointsReg",
              "fantasyPointsPpr",
              "rankReg",
              "rankPpr",
            ]}
          />
          <hr></hr>
          <StatTable
            title="Fantasy Starts"
            history={history}
            statData={fantasyStarts}
            chosenColumns={[
              "year",
              "week",
              "position",
              "points",
              "owner.name",
              "fantasyTeam.id",
              "fantasyTeam.name",
            ]}
          />
        </div>
      )}
    </>
  );
}

export default PlayerSummary;
