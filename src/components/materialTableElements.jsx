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
