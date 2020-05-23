import React from "react";
import MaterialTable from "material-table";

export default function RostersTable({ homeRoster, awayRoster }) {
  return (
    <>
      <MaterialTable
        title=""
        data={homeRoster}
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
            field: "position",
          },
          {
            title: "Away Player",
            field: "player.name",
            render: (rowData) => (
              <a href={`/players/${rowData.player.id}`}>
                {rowData.player.name}
              </a>
            ),
          },
          {
            title: "Away Points",
            field: "points",
          },
          {
            title: "-",
            field: undefined,
          },
        ]}
      />
    </>
  );
}
