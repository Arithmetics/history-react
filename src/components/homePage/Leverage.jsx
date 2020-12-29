import React from 'react';
import { ResponsiveBullet } from '@nivo/bullet';

import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';
import { lineGraphSettings } from '../nivoGraphHelpers';

const useStyles = makeStyles((theme) => ({
  graph: {
    height: 1000,
  },
}));

function prepLeverageData(playoffOdds, category) {
  const categoryOdds = playoffOdds.filter(
    (o) => o.category === category,
  );

  const leverages = [];

  categoryOdds.forEach((o) => {
    const leverage = {
      id: o.fantasyTeam.id,
      title: o.fantasyTeam.name,
      ranges: [0, o.oddsWithLoss + 0.005, o.oddsWithWin + 0.005, 1],
      markers: [o.odds],
      measures: [],
    };
    leverages.push(leverage);
  });

  return leverages;
}

function MyResponsiveBullet({ data }) {
  return (
    <ResponsiveBullet
      data={data}
      theme={lineGraphSettings.theme}
      margin={{ top: 50, right: 40, bottom: 50, left: 40 }}
      spacing={60}
      titleAlign="start"
      measureSize={0.2}
      markerSize={2}
      rangeColors={['#d1cfcf', theme.palette.primary.main, '#d1cfcf']}
      markerColors={[theme.palette.secondary.main]}
      titleOffsetX={-20}
      titleOffsetY={-25}
    />
  );
}

export default function Leverage(props) {
  const classes = useStyles();

  const { playoffOdds } = props;
  const graphData = prepLeverageData(playoffOdds, 'make_playoffs');

  return (
    <div className={classes.graph}>
      <MyResponsiveBullet data={graphData} />
    </div>
  );
}
