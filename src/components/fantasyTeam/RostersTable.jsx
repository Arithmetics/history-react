import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';

import { PlayerAvatarLink } from '../materialTableElements';

const useStyles = makeStyles({
  root: {
    margin: '1rem',
  },
});

export default function RostersTable({ homeRoster, awayRoster }) {
  const classes = useStyles();

  const combinedRosters = [];

  homeRoster.forEach((startWeekArray, index) => {
    const final = {};
    final.homeRoster = startWeekArray;
    final.awayRoster = awayRoster[index];
    combinedRosters.push(final);
  });
  return (
    <div className={classes.root}>
      <MaterialTable
        title=""
        data={combinedRosters}
        options={{
          padding: 'dense',
          showTitle: false,
          paging: false,
          search: false,
          toolbar: false,
        }}
        columns={[
          {
            title: 'Position',
            field: 'awayRoster.position',
            render: (rowData) => {
              if (rowData.awayRoster && rowData.awayRoster.position) {
                return rowData.awayRoster.position;
              }
              if (rowData.homeRoster && rowData.homeRoster.position) {
                return rowData.homeRoster.position;
              }
              return '-';
            },
          },
          {
            title: 'Away Player',
            field: 'awayRoster.player.name',
            render: (rowData) => {
              if (!rowData.awayRoster || !rowData.awayRoster.player)
                return null;
              return (
                <PlayerAvatarLink
                  id={rowData.awayRoster.player.id}
                  playerName={rowData.awayRoster.player.name}
                  pictureId={rowData.awayRoster.player.pictureId}
                />
              );
            },
          },
          {
            title: 'Away Points',
            field: 'awayRoster.points',
          },
          {
            title: '-',
            field: undefined,
            width: 20,
          },
          {
            title: 'Home Points',
            field: 'homeRoster.points',
          },
          {
            title: 'Home Player',
            field: 'homeRoster.player.name',
            render: (rowData) => {
              if (!rowData.homeRoster || !rowData.homeRoster.player)
                return null;
              return (
                <PlayerAvatarLink
                  id={rowData.homeRoster.player.id}
                  playerName={rowData.homeRoster.player.name}
                  pictureId={rowData.homeRoster.player.pictureId}
                />
              );
            },
          },
        ]}
      />
    </div>
  );
}
