import React from 'react';
import MaterialTable from 'material-table';
import {
  TeamAvatarLink,
  OwnerAvatarLink,
  GradedScore,
} from '../materialTableElements';

export default function LastWeeksGames(props) {
  const { lastWeeksGames, lastWeek } = props;

  return (
    <MaterialTable
      data={lastWeeksGames}
      options={{
        paging: false,
        sorting: false,
        search: false,
        showTitle: true,
        exportButton: false,
      }}
      title={`Week ${lastWeek} Completed Games`}
      columns={[
        {
          title: 'Away Owner',
          field: 'awayTeam.owner.name',
          render: (rowData) => (
            <OwnerAvatarLink
              id={rowData.awayTeam.owner.id}
              ownerName={rowData.awayTeam.owner.name}
            />
          ),
        },
        {
          title: 'Away Team',
          field: 'awayTeam.name',
          render: (rowData) => (
            <TeamAvatarLink
              id={rowData.awayTeam.id}
              teamName={rowData.awayTeam.name}
              pictureUrl={rowData.awayTeam.pictureUrl}
            />
          ),
        },
        {
          title: 'Away Score',
          field: 'awayScore',
          render: (rowData) => (
            <GradedScore
              score={rowData.awayScore}
              grade={rowData.awayGrade}
            />
          ),
        },
        {
          title: 'Home Score',
          field: 'homeScore',
          render: (rowData) => (
            <GradedScore
              score={rowData.homeScore}
              grade={rowData.homeGrade}
            />
          ),
        },
        {
          title: 'Home Team',
          field: 'homeTeam.name',
          render: (rowData) => (
            <TeamAvatarLink
              id={rowData.homeTeam.id}
              teamName={rowData.homeTeam.name}
              pictureUrl={rowData.homeTeam.pictureUrl}
            />
          ),
        },
        {
          title: 'Home Owner',
          field: 'homeTeam.owner.name',
          render: (rowData) => (
            <OwnerAvatarLink
              id={rowData.homeTeam.owner.id}
              ownerName={rowData.homeTeam.owner.name}
            />
          ),
        },
      ]}
    />
  );
}
