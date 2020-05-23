import React from "react";
import MaterialTable from "material-table";

export default function RostersTable({ homeRoster, awayRoster }) {
  const combinedRosters = [];

  homeRoster.forEach((startWeekArray, index) => {
    const final = {};
    final.homeRoster = startWeekArray;
    final.awayRoster = awayRoster[index];
    combinedRosters.push(final);
  });

  console.log(combinedRosters);

  return (
    <>
      <MaterialTable
        title=""
        data={combinedRosters}
        options={{
          padding: "dense",
          showTitle: false,
          paging: false,
          search: false,
          toolbar: false,
        }}
        columns={[
          {
            title: "Position",
            field: "awayRoster.position",
          },
          {
            title: "Away Player",
            field: "awayRoster.player.name",
            render: (rowData) => (
              <a href={`/players/${rowData.awayRoster.player.id}`}>
                {rowData.awayRoster.player.name}
              </a>
            ),
          },
          {
            title: "Away Points",
            field: "awayRoster.points",
          },
          {
            title: "-",
            field: undefined,
            width: 20,
          },
          {
            title: "Home Points",
            field: "homeRoster.points",
          },
          {
            title: "Home Player",
            field: "homeRoster.player.name",
            render: (rowData) => (
              <a href={`/players/${rowData.homeRoster.player.id}`}>
                {rowData.homeRoster.player.name}
              </a>
            ),
          },
        ]}
      />
    </>
  );
}
