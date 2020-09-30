import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import LoadingSpinner from "../LoadingSpinner";

import { GiTrophy } from "react-icons/gi";
import { config } from "../../api";

import { createLookup, filterBetween } from "../materialTableHelpers";
import { HeaderCellWithTooltip } from "../materialTableElements";
import TabContainer from "../TabContainer";

const useStyles = makeStyles({
  statChip: {
    margin: 5,
  },
  profileImage: {
    borderRadius: 500,
    margin: "0 auto",
    display: "block",
    border: "1px solid #0b878c",
    maxHeight: 200,
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
            src={`https://static.www.nfl.com/image/private/t_player_profile_landscape_2x/f_auto/league/${player.pictureId}`}
          />
          {!loading && <h2 className={classes.playerName}>{playerName}</h2>}
          {[...Array(championships)].map((i) => (
            <Chip key={i} className={classes.statChip} label={<GiTrophy />} />
          ))}
          {!loading && (
            <TabContainer
              tabNames={[`Auctions`, `Seasons`, `Fantasy Starts`]}
              tabs={[
                <Auctions auction={auction} />,
                <SeasonStats seasonStats={seasonStats} />,
                <FantasyStarts
                  fantasyStarts={fantasyStarts}
                  auction={auction}
                  seasonStats={seasonStats}
                />,
              ]}
            />
          )}
        </div>
      )}
    </>
  );
}

function Auctions(props) {
  const { auction } = props;

  return (
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
            <Link component={RouterLink} to={`/owners/${rowData.owner.id}`}>
              {rowData.owner.name}
            </Link>
          ),
        },
        {
          title: <HeaderCellWithTooltip abbr={"TEAM"} />,
          field: "fantasyTeam.name",
          lookup: createLookup(auction, ["fantasyTeam", "name"]),
          render: (rowData) => (
            <Link
              component={RouterLink}
              to={`/fantasyTeams/${rowData.fantasyTeam.id}`}
            >
              {rowData.fantasyTeam.name}
            </Link>
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
  );
}

function SeasonStats(props) {
  const { seasonStats } = props;

  return (
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
  );
}

function FantasyStarts(props) {
  const { fantasyStarts, auction, seasonStats } = props;

  return (
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
            <Link component={RouterLink} to={`/owners/${rowData.owner.id}`}>
              {rowData.owner.name}
            </Link>
          ),
        },
        {
          title: <HeaderCellWithTooltip abbr={"TEAM"} />,
          field: "fantasyTeam.name",
          lookup: createLookup(auction, ["fantasyTeam", "name"]),
          render: (rowData) => (
            <Link
              component={RouterLink}
              to={`/fantasyTeams/${rowData.fantasyTeam.id}`}
            >
              {rowData.fantasyTeam.name}
            </Link>
          ),
        },
      ]}
    />
  );
}

export default PlayerSummary;
