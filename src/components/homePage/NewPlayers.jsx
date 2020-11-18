import React from "react";
import MaterialTable from "material-table";
import {
  PlayerAvatarLink,
  TeamAvatarLink,
} from "../materialTableElements";



export default function NewPlayers(props) {
  const { firstStarts } = props;
  return (
    <MaterialTable
      data={firstStarts}
      options={{
        paging: false,
        sorting: false,
        search: false,
        showTitle: true,
        exportButton: false,
      }}
      title={`Welcome to the League! First Time Starters Last Week`}
      columns={[
        {
          title: "Player",
          field: "player.name",
          render: (rowData) => (
            <PlayerAvatarLink
              id={rowData.player.id}
              playerName={rowData.player.name}
              pictureId={rowData.player.pictureId}
            />
          ),
        },
        {
          title: "Points",
          field: "points",
        },
        {
          title: "Week",
          field: "week",
        },
        {
          title: "Team",
          field: "fantasyTeam.name",
          render: (rowData) => (
            <TeamAvatarLink
              id={rowData.fantasyTeam.id}
              teamName={rowData.fantasyTeam.name}
              pictureUrl={rowData.fantasyTeam.pictureUrl}
            />
          ),
        },
      ]}
    />
  );
}
