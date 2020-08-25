import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import TableCell from "@material-ui/core/TableCell";

const titleRowLookup = {
  YEAR: "Year",
  POS: "Position",
  OWN: "Owner",
  TEAM: "Team",
  PRC: "Price",
  PDR: "Preseason Draft Rank",
  FSR: "Final Season Rank",
  FSRP: "Final Season Rank PPR",
  RSP: "Regular Season Points",
  RSG: "Regular Season Games",
  RSW: "Regular Season Wins",
  PPG: "Points per Game",
  PP: "Playoff Points",
  PG: "Playoff Games",
  PW: "Playoff Wins",
  PPPG: "Playoff Points per Game",
  TS: "Total Starts",
  FP: "Finals Points",
  CMP: "Championships",
  TAD: "Total Auction Dollars",
  MAP: "Max Auction Price",
  BSP: "Best Start Points",
  BPDR: "Best Preseason Draft Rank",
  BFR: "Best Final Rank",
  BFRP: "Best Final Rank PPR",
  PN: "Player Name",
  GP: "Games Played",
  AGE: "Age",
  EXP: "Experience",
  FPR: "Fantasy Points Regular",
  FPP: "Fantasy Points PPR",
  PTS: "Fantasy Points",
};

const useStyles = makeStyles({
  cell: { border: "none" },
});

export default function HeaderCellWithTooltip(props) {
  const classes = useStyles();
  const { abbr } = props;
  return (
    <Tooltip title={titleRowLookup[abbr]} placement="top">
      <TableCell className={classes.cell}>{abbr}</TableCell>
    </Tooltip>
  );
}
