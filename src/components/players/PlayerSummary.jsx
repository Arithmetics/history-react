import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import LoadingSpinner from "../LoadingSpinner";

import { GiTrophy } from "react-icons/gi";
import { config } from "../../api";

import { createLookup, filterBetween } from "../materialTableHelpers";

import HeaderCellWithTooltip from "../materialTableElements";

const useStyles = makeStyles({
  statChip: {
    margin: 5,
  },
  profileImage: {
    borderRadius: 500,
    margin: "0 auto",
    display: "block",
    border: "1px solid #0b878c",
  },
  playerName: {
    textAlign: "center",
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

  console.log(player);

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Player Summary
      </Typography>

      {loading && <LoadingSpinner isLoading={loading} />}
      {!loading && (
        <div>
          <img
            alt="player-profile-pic"
            className={classes.profileImage}
            src={`https://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/${player.pictureId}.png`}
          />
          {!loading && <h2 className={classes.playerName}>{playerName}</h2>}
          {[...Array(championships)].map((i) => (
            <Chip key={i} className={classes.statChip} label={<GiTrophy />} />
          ))}
          {auction.length > 0 && (
            <>
              <MaterialTable
                title="Auctions"
                data={auction}
                options={{
                  filtering: true,
                  paging: false,
                  padding: "dense",
                  search: true,
                  exportButton: true,
                  exportAllData: true,
                }}
                columns={[
                  {
                    title: <HeaderCellWithTooltip abbr={"YEAR"} />,
                    field: "year",
                    lookup: createLookup(auction, ["year"]),
                  },
                  {
                    title: <HeaderCellWithTooltip abbr={"POS"} />,
                    field: "position",
                    lookup: createLookup(auction, ["position"]),
                  },
                  {
                    title: <HeaderCellWithTooltip abbr={"OWN"} />,
                    field: "owner.name",
                    lookup: createLookup(auction, ["owner", "name"]),
                    render: (rowData) => (
                      <a href={`/owners/${rowData.owner.id}`}>
                        {rowData.owner.name}
                      </a>
                    ),
                  },
                  {
                    title: <HeaderCellWithTooltip abbr={"TEAM"} />,
                    field: "fantasyTeam.name",
                    lookup: createLookup(auction, ["fantasyTeam", "name"]),
                    render: (rowData) => (
                      <a href={`/fantasyTeams/${rowData.fantasyTeam.id}`}>
                        {rowData.fantasyTeam.name}
                      </a>
                    ),
                  },
                  {
                    title: <HeaderCellWithTooltip abbr={"PRC"} />,
                    field: "price",
                    customFilterAndSearch: (term, rowData) =>
                      filterBetween(term, rowData, ["price"]),
                  },
                ]}
              />
            </>
          )}
          <hr></hr>

          <MaterialTable
            title="Season Statistics"
            data={seasonStats}
            options={{
              filtering: true,
              padding: "dense",
              search: true,
              exportButton: true,
              exportAllData: true,
              paging: false,
            }}
            columns={[
              {
                title: <HeaderCellWithTooltip abbr={"YEAR"} />,
                field: "year",
                lookup: createLookup(seasonStats, ["year"]),
              },
              {
                title: <HeaderCellWithTooltip abbr={"GP"} />,
                field: "gamesPlayed",
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, ["gamesPlayed"]),
              },
              {
                title: <HeaderCellWithTooltip abbr={"AGE"} />,
                field: "ageAtSeason",
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, ["ageAtSeason"]),
              },
              {
                title: <HeaderCellWithTooltip abbr={"EXP"} />,
                field: "experienceAtSeason",
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, ["experienceAtSeason"]),
              },
              {
                title: <HeaderCellWithTooltip abbr={"FPR"} />,
                field: "fantasyPointsReg",
                filtering: false,
              },
              {
                title: <HeaderCellWithTooltip abbr={"FPR"} />,
                field: "fantasyPointsPpr",
                filtering: false,
              },
              {
                title: <HeaderCellWithTooltip abbr={"PDR"} />,
                field: "preseasonRank",
                filtering: false,
              },
              {
                title: <HeaderCellWithTooltip abbr={"FSR"} />,
                field: "rankReg",
                filtering: false,
              },
              {
                title: <HeaderCellWithTooltip abbr={"FSRP"} />,
                field: "rankPpr",
                filtering: false,
              },
            ]}
          />
          <hr></hr>

          <MaterialTable
            title="Fantasy Starts"
            data={fantasyStarts}
            options={{
              filtering: true,
              paging: true,
              pageSize: 25,
              emptyRowsWhenPaging: false,
              pageSizeOptions: [25, 100, seasonStats.length],
              padding: "dense",
              search: true,
              exportButton: true,
              exportAllData: true,
            }}
            columns={[
              {
                title: <HeaderCellWithTooltip abbr={"YEAR"} />,
                field: "year",
                lookup: createLookup(fantasyStarts, ["year"]),
              },
              {
                title: <HeaderCellWithTooltip abbr={"WEEK"} />,
                field: "week",
                lookup: createLookup(fantasyStarts, ["week"]),
              },
              {
                title: <HeaderCellWithTooltip abbr={"POS"} />,
                field: "position",
                lookup: createLookup(fantasyStarts, ["position"]),
              },
              {
                title: <HeaderCellWithTooltip abbr={"PTS"} />,
                field: "points",
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, ["points"]),
              },
              {
                title: <HeaderCellWithTooltip abbr={"OWN"} />,
                field: "owner.name",
                lookup: createLookup(auction, ["owner", "name"]),
                render: (rowData) => (
                  <a href={`/owners/${rowData.owner.id}`}>
                    {rowData.owner.name}
                  </a>
                ),
              },
              {
                title: <HeaderCellWithTooltip abbr={"TEAM"} />,
                field: "fantasyTeam.name",
                lookup: createLookup(auction, ["fantasyTeam", "name"]),
                render: (rowData) => (
                  <a href={`/fantasyTeams/${rowData.fantasyTeam.id}`}>
                    {rowData.fantasyTeam.name}
                  </a>
                ),
              },
            ]}
          />
        </div>
      )}
    </>
  );
}

export default PlayerSummary;
