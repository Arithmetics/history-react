import React from 'react';
import MaterialTable from 'material-table';
import { streakEmoji } from '../owners/Owner';
import {
  TeamAvatarLink,
  OwnerAvatarLink,
} from '../materialTableElements';

export default function UpcomingGames(props) {
  const { scheduledGames, currentWeek, versusRecords } = props;

  const getStreakVs = (owner1ID, owner2ID) => {
    const recordSet = versusRecords.filter(
      (record) => record.id === owner1ID,
    );
    const recordFinal = recordSet[0].versusRecords.filter(
      (record) => record.id === owner2ID,
    );
    return recordFinal && recordFinal[0] ? recordFinal[0].streak : 0;
  };

  const getVersusRecord = (owner1ID, owner2ID) => {
    const recordSet = versusRecords.filter(
      (record) => record.id === owner1ID,
    );
    const recordFinal = recordSet[0].versusRecords.filter(
      (record) => record.id === owner2ID,
    );
    if (recordFinal.length === 0) {
      return '0 - 0';
    }
    return `${recordFinal[0].wins} - ${recordFinal[0].losses}`;
  };

  return (
    <MaterialTable
      data={scheduledGames}
      options={{
        paging: false,
        sorting: false,
        search: false,
        showTitle: true,
        exportButton: false,
      }}
      title={`Week ${currentWeek} Upcoming Games`}
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
          title: 'Streak',
          field: undefined,
          render: (rowData) =>
            streakEmoji(
              getStreakVs(
                rowData.awayTeam.owner.id,
                rowData.homeTeam.owner.id,
              ),
            ),
          cellStyle: {
            textAlign: 'center',
          },
        },
        {
          title: 'All Time Record',
          field: undefined,
          render: (rowData) =>
            getVersusRecord(
              rowData.awayTeam.owner.id,
              rowData.homeTeam.owner.id,
            ),
          cellStyle: {
            textAlign: 'center',
          },
        },
        {
          title: 'Streak',
          field: undefined,
          render: (rowData) =>
            streakEmoji(
              getStreakVs(
                rowData.homeTeam.owner.id,
                rowData.awayTeam.owner.id,
              ),
            ),
          cellStyle: {
            textAlign: 'center',
          },
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
