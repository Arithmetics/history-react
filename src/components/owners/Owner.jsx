import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import MaterialTable from "material-table";

import { GiTrophy } from "react-icons/gi";
import { GiPodiumSecond } from "react-icons/gi";
import { GiPodiumThird } from "react-icons/gi";

import LoadingSpinner from "../LoadingSpinner";
import { config } from "../../api";

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

function Owner(props) {
  const classes = useStyles();

  const [owner, setOwner] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ownerID = props.match.params.id;
    const fetchData = async () => {
      const result = await axios(`${config}/owners/${ownerID}.json`);
      setOwner((result && result.data && result.data.owner) || {});
      setLoading(false);
    };
    fetchData();
  }, [props.match.params.id]);

  const fantasyTeams = owner.fantasyTeams || [];
  const cumulativeStats = owner.cumulativeStats || {};
  const versusRecords = owner.versusRecords || [];
  versusRecords.forEach(
    (record) =>
      (record.winPct =
        Math.round((record.wins / (record.wins + record.losses)) * 100) / 100)
  );

  return (
    <div>
      {loading && <LoadingSpinner isLoading={loading} />}
      {!loading && (
        <>
          <Typography variant="h3" gutterBottom>
            {owner.name}
          </Typography>

          <Chip
            className={classes.statChip}
            label={`Record: ${cumulativeStats.totalWins} - ${
              cumulativeStats.totalGames - cumulativeStats.totalWins
            }`}
          />
          <Chip
            className={classes.statChip}
            label={`Total Points: ${cumulativeStats.totalPoints}`}
          />
          <Chip
            className={classes.statChip}
            label={`Playoff Wins: ${cumulativeStats.totalPlayoffWins}`}
          />

          <ExpansionPanel defaultExpanded className={classes.expansion}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              id="panel1a-header"
              className={classes.panelTop}
            >
              <Typography className={classes.heading}>
                Team Summaries
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.teamsArea}>
              {fantasyTeams.reverse().map((team) => (
                <Card className={classes.teamCard}>
                  <CardContent className={classes.teamCardContent}>
                    <Typography className={classes.teamCardContentItem}>
                      {team.year}
                    </Typography>
                    <Typography
                      // color="primary"
                      className={clsx(
                        classes.teamCardContentItem,
                        classes.teamName
                      )}
                    >
                      {team.name}
                    </Typography>
                    <Typography
                      className={clsx(
                        classes.teamCardContentItem,
                        classes.resultIcon
                      )}
                    >
                      <Trophy team={team} />
                    </Typography>

                    <Typography className={classes.teamCardContentItem}>
                      ({team.seasonWins} - {13 - team.seasonWins})
                    </Typography>
                    <Typography
                      className={clsx(
                        classes.teamCardContentItem,
                        classes.grow
                      )}
                    >
                      {Math.round(team.seasonPoints)} points
                    </Typography>
                    <Button
                      color="primary"
                      variant="contained"
                      component={Link}
                      to={`/fantasyTeams/${team.id}`}
                    >
                      Go To Team
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel defaultExpanded className={classes.expansion}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              id="panel2a-header"
              className={classes.panelTop}
            >
              <Typography className={classes.heading}>
                Versus Records
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <MaterialTable
                title="Versus Records"
                data={versusRecords}
                options={{
                  padding: "dense",
                  paging: false,
                  search: false,
                  exportButton: true,
                  exportAllData: true,
                  showTitle: false,
                }}
                columns={[
                  {
                    title: "Owner",
                    field: "name",
                    render: (rowData) => (
                      <a href={`/owners/${rowData.id}`}>{rowData.name}</a>
                    ),
                  },
                  { title: "Wins", field: "wins" },
                  { title: "Losses", field: "losses" },
                  { title: "Win Percentage", field: "winPct" },
                  { title: "Current Streak", field: "streak" },
                ]}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </>
      )}
    </div>
  );
}

function Trophy({ team }) {
  if (team["wonChampionship?"]) {
    return <GiTrophy />;
  } else if (team["madeFinals?"]) {
    return <GiPodiumSecond />;
  } else if (team["madePlayoffs?"]) {
    return <GiPodiumThird />;
  }
  return null;
}

export default Owner;
