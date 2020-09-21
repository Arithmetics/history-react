import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  root: {
    marginBottom: 20,
  },
  statChip: {
    margin: 5,
  },
});

function OwnerHeader(props) {
  const classes = useStyles();
  const { owner, cumulativeStats } = props;

  return (
    <div className={classes.root}>
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
    </div>
  );
}

export default OwnerHeader;
