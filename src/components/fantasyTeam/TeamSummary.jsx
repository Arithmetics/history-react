import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import MaterialTable from "material-table";

import LoadingSpinner from "../LoadingSpinner";
import { config } from "../../api";
import GameTable from "./GameTable";

import { PlayerAvatarLink } from "../materialTableElements";

const useStyles = makeStyles((theme) => ({
  statChip: {
    margin: 5,
  },
  expansion: {
    marginTop: 20,
  },
  panelTop: {
    borderBottom: "grey solid 1px",
  },
  teamsArea: {
    padding: 10,
    display: "block",
  },
  teamCard: {
    width: "98%",
    backgroundColor: "#4e5563",
    margin: "10px auto",
    display: "flex",
    borderRadius: 15,
  },
  teamCardContent: {
    padding: "10px !important",
    display: "flex",
    alignItems: "baseline",
    width: "100%",
    flexWrap: "wrap",
  },
  teamCardContentItem: {
    marginRight: 20,
  },
  teamName: {
    width: 230,
    textOverflow: "ellipsis",
    flexGrow: 1,
  },
  resultIcon: {
    fontSize: 25,
    minWidth: 25,
  },
  grow: {
    flexGrow: 3,
  },
}));

export default function TeamSummary({ match, history }) {
  const classes = useStyles();
  const [fantasyTeam, setTeam] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teamID = match.params.id;
    const fetchData = async () => {
      const result = await axios(`${config}/fantasy_teams/${teamID}.json`);
      setTeam((result && result.data && result.data.fantasyTeam) || {});
      setLoading(false);
    };
    fetchData();
  }, [match.params.id]);

  // const fantasyStartWeeks = (fantasyTeam && fantasyTeam.fantasyStarts) || {};
  const ownerName =
    (fantasyTeam && fantasyTeam.owner && fantasyTeam.owner.name) || "";
  const fantasyTeamName = (fantasyTeam && fantasyTeam.name) || "";
  const year = (fantasyTeam && fantasyTeam.year) || "";
  const auction = (fantasyTeam && fantasyTeam.purchases) || [];
  const fantasyGames = (fantasyTeam && fantasyTeam.fantasyGames) || [];
  const cuumulativeStats = (fantasyTeam && fantasyTeam.cuumulativeStats) || {};
  const regularSeasonGames = fantasyGames.filter((game) => game.week < 14);
  const playoffGames = fantasyGames.filter((game) => game.week > 13);

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Team Summary
      </Typography>
      {!loading && (
        <>
          <Typography variant="h5" gutterBottom>
            {year}: {fantasyTeamName} ({ownerName})
          </Typography>

          <Chip
            className={classes.statChip}
            label={`Record: (${cuumulativeStats.seasonWins} - 
            ${13 - cuumulativeStats.seasonWins})`}
          />
          <Chip
            className={classes.statChip}
            label={`Season Points: ${Math.round(
              cuumulativeStats.seasonPoints
            )}`}
          />
        </>
      )}

      {loading && <LoadingSpinner isLoading={loading} />}
      {!loading && (
        <div>
          <GameTable
            regularSeason={true}
            fantasyGames={regularSeasonGames}
            fantasyTeamName={fantasyTeamName}
          />
          {playoffGames.length > 0 && (
            <GameTable
              regularSeason={false}
              fantasyGames={playoffGames}
              fantasyTeamName={fantasyTeamName}
            />
          )}
          {auction.length > 0 && (
            <MaterialTable
              title="Auction"
              data={auction}
              options={{
                filtering: false,
                padding: "dense",
                paging: false,
                search: false,
                exportButton: true,
                exportAllData: true,
                showTitle: true,
              }}
              columns={[
                {
                  title: "Player",
                  field: "player.name",
                  render: (rowData) => (
                    <PlayerAvatarLink
                      id={rowData.player.id}
                      playerName={rowData.player.name}
                      pictureId={rowData.player.pictureId}
                    />
                  ),
                },
                {
                  title: "Position",
                  field: "position",
                },
                {
                  title: "Price",
                  field: "price",
                },
              ]}
            />
          )}
        </div>
      )}
    </div>
  );
}
