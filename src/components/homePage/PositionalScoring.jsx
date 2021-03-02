import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import theme from '../../theme';
import { lineGraphSettings } from '../nivoGraphHelpers';

function preparePtsGraphData(positionalScoring) {
  const data = [];
  positionalScoring.forEach((fantasyTeam) => {
    const newData = {
      team: fantasyTeam.name,
      ...fantasyTeam.positionCategoryStats.ptsByPositionRegular,
    };
    data.push(newData);
  });
  return data;
}

const keys = ['QB', 'RB', 'WR', 'TE', 'DEF', 'K'];

function prepareStartsGraphData(positionalScoring) {
  const data = [];
  positionalScoring.forEach((fantasyTeam) => {
    const newData = {
      team: fantasyTeam.name,
      ...fantasyTeam.positionCategoryStats.startsByPositionRegular,
    };
    data.push(newData);
  });
  return data;
}

const useStyles = makeStyles(() => ({
  graph: {
    height: 600,
  },
  tip: {
    color: 'black',
  },
}));

export default function PositionalScoring({ positionalScoring }) {
  return (
    <>
      <RegularSeasonPoints positionalScoring={positionalScoring} />
      <RegularSeasonStarts positionalScoring={positionalScoring} />
    </>
  );
}

function RegularSeasonPoints({ positionalScoring }) {
  const classes = useStyles();
  const ptsData = preparePtsGraphData(positionalScoring);

  return (
    <>
      <Typography variant="h4">Regular Season Points</Typography>
      <div className={classes.graph}>
        <ResponsiveBar
          data={ptsData}
          theme={lineGraphSettings.theme}
          keys={keys}
          indexBy="team"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={Object.values(theme.palette.graph)}
          defs={[]}
          fill={[]}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'team',
            legendPosition: 'middle',
            legendOffset: 32,
            format: (value) => {
              return value
                .match(/\b(\w)/g)
                .join('')
                .toUpperCase();
            },
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'points',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          gridXValues={['sdf', 'sdf', 'sdf', 'df']}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          animate
          motionStiffness={90}
          motionDamping={15}
          tooltip={({ data, id, value }) => {
            return (
              <div className={classes.tip}>
                {data.team}: {id} - {value} pts.
              </div>
            );
          }}
        />
      </div>
    </>
  );
}

function RegularSeasonStarts({ positionalScoring }) {
  const classes = useStyles();
  const startsData = prepareStartsGraphData(positionalScoring);

  return (
    <>
      <Typography variant="h4">Regular Season Starts</Typography>
      <div className={classes.graph}>
        <ResponsiveBar
          data={startsData}
          theme={lineGraphSettings.theme}
          keys={keys}
          indexBy="team"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={Object.values(theme.palette.graph)}
          defs={[]}
          fill={[]}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'team',
            legendPosition: 'middle',
            legendOffset: 32,
            format: (value) => {
              return value
                .match(/\b(\w)/g)
                .join('')
                .toUpperCase();
            },
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'points',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          gridXValues={['sdf', 'sdf', 'sdf', 'df']}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          animate
          motionStiffness={90}
          motionDamping={15}
          tooltip={({ data, id, value }) => {
            return (
              <div className={classes.tip}>
                {data.team}: {id} - {value} starts
              </div>
            );
          }}
        />
      </div>
    </>
  );
}
