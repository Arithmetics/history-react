import React from 'react';
import { firstBy } from 'thenby';

import MaterialTable from 'material-table';
import { TeamAvatarLink } from '../materialTableElements';

export default function Standings(props) {
  const { standings, playoffOdds } = props;
  return (
    <MaterialTable
      data={standings
        .sort(firstBy('wins').thenBy('points'))
        .reverse()}
      options={{
        paging: false,
        sorting: true,
        search: false,
        showTitle: true,
        exportButton: false,
      }}
      title="Current Standings"
      columns={[
        {
          title: 'Team',
          field: 'name',
          render: (rowData) => (
            <TeamAvatarLink
              id={rowData.id}
              teamName={rowData.name}
              pictureUrl={rowData.pictureUrl}
            />
          ),
        },
        {
          title: 'Wins',
          field: 'wins',
        },
        {
          title: 'Losses',
          field: 'losses',
        },
        {
          title: 'Points',
          field: 'points',
          render: (rowData) => Math.round(rowData.points, 2),
        },
        {
          title: 'Deserved Wins',
          field: 'topSixFinshes',
        },
        {
          title: 'Playoff Odds',
          field: 'playoffOdds',
          render: (rowData) =>
            `${
              Math.round(
                playoffOdds.filter(
                  (o) =>
                    o.category === 'make_playoffs' &&
                    o.fantasyTeam.id === rowData.id,
                )[0]?.odds * 1000,
              ) / 10 || '-'
            }%`,
        },
        {
          title: 'Bye Odds',
          field: 'playoffOdds',
          render: (rowData) =>
            `${
              Math.round(
                playoffOdds.filter(
                  (o) =>
                    o.category === 'get_bye' &&
                    o.fantasyTeam.id === rowData.id,
                )[0]?.odds * 1000,
              ) / 10 || '-'
            }%`,
        },
        {
          title: 'Championship Odds',
          field: 'playoffOdds',
          render: (rowData) =>
            `${
              Math.round(
                playoffOdds.filter(
                  (o) =>
                    o.category === 'win_championship' &&
                    o.fantasyTeam.id === rowData.id,
                )[0]?.odds * 1000,
              ) / 10 || '-'
            }%`,
        },
      ]}
    />
  );
}
