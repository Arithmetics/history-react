import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  numberFilter,
  Comparator,
  multiSelectFilter
} from "react-bootstrap-table2-filter";

export function StatTable({ title, statData, chosenColumns, history }) {
  const [distinct, setDistinct] = useState({
    distinctYears: {},
    distinctPositions: {},
    distinctOwners: {}
  });

  useEffect(() => {
    const distinctYears = [...new Set(statData.map(x => x.year))].reduce(
      (o, val) => {
        o[val] = val;
        return o;
      },
      {}
    );
    const distinctPositions = [
      ...new Set(statData.map(x => x.position))
    ].reduce((o, val) => {
      o[val] = val;
      return o;
    }, {});
    const distinctOwners = [
      ...new Set(statData.map(x => x.owner && x.owner.name))
    ].reduce((o, val) => {
      o[val] = val;
      return o;
    }, {});

    setDistinct({ distinctYears, distinctPositions, distinctOwners });
  }, [statData]);

  const columns = [
    {
      dataField: "year",
      text: "Year",
      sort: true,
      filter: multiSelectFilter({
        options: distinct.distinctYears
      })
    },
    {
      dataField: "week",
      text: "Week",
      sort: true,
      filter: numberFilter({
        defaultValue: { number: 0, comparator: Comparator.GT }
      })
    },
    ,
    {
      dataField: "player.id",
      text: "ID",
      hidden: true
    },
    {
      dataField: "player.name",
      text: "Player",
      sort: true,
      filter: textFilter(),
      classes: "table-link",
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          history.push(`/players/${row.player.id}`);
        }
      }
    },
    {
      dataField: "position",
      text: "Position",
      sort: true,
      filter: multiSelectFilter({
        options: distinct.distinctPositions
      })
    },
    {
      dataField: "points",
      text: "Points",
      sort: true,
      filter: numberFilter({
        defaultValue: { number: 0, comparator: Comparator.GT }
      })
    },
    {
      dataField: "owner.name",
      text: "Owner",
      sort: true,
      filter: multiSelectFilter({
        options: distinct.distinctOwners
      })
    },
    {
      dataField: "fantasyTeam.id",
      text: "fantasyTeamID",
      hidden: true
    },
    {
      dataField: "fantasyTeam.name",
      text: "Team",
      sort: true,
      filter: textFilter(),
      classes: "table-link table-trail",
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          history.push(`/fantasyTeams/${row.fantasyTeam.id}`);
        }
      }
    },
    {
      dataField: "price",
      text: "Price",
      sort: true,
      filter: numberFilter({
        defaultValue: { number: 0, comparator: Comparator.GT }
      })
    },
    {
      dataField: "fantasyPointsReg",
      text: "Fantasy Points",
      sort: true,
      filter: numberFilter({
        defaultValue: { number: 0, comparator: Comparator.GT }
      })
    },
    {
      dataField: "fantasyPointsPpr",
      text: "Fantasy Points PPR",
      sort: true,
      filter: numberFilter({
        defaultValue: { number: 0, comparator: Comparator.GT }
      })
    },
    {
      dataField: "rankReg",
      text: "Position Rank",
      sort: true,
      filter: numberFilter({
        defaultValue: { number: 0, comparator: Comparator.GT }
      })
    },
    {
      dataField: "rankPpr",
      text: "Position Rank PPR",
      sort: true,
      filter: numberFilter({
        defaultValue: { number: 0, comparator: Comparator.GT }
      })
    },
    {
      dataField: "player.rankReg",
      text: "Position Rank",
      sort: true,
      filter: numberFilter({
        defaultValue: { number: 0, comparator: Comparator.GT }
      })
    },
    {
      dataField: "player.rankPpr",
      text: "Position Rank PPR",
      sort: true,
      filter: numberFilter({
        defaultValue: { number: 0, comparator: Comparator.GT }
      })
    },
    {
      dataField: "id",
      text: "ID",
      hidden: true
    },
    {
      dataField: "name",
      text: "Owner",
      sort: true,
      classes: "table-link table-trail",
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          history.push(`/owners/${row.id}`);
        }
      }
    },
    {
      dataField: "cumulativeStats.totalPoints",
      text: "Total Points",
      sort: true
    },
    {
      dataField: "cumulativeStats.totalGames",
      text: "Games Played",
      sort: true
    },
    {
      dataField: "cumulativeStats.totalWins",
      text: "Total Wins",
      sort: true
    },
    {
      dataField: "cumulativeStats.pointsPerGame",
      text: "Points / Game",
      sort: true
    },
    {
      dataField: "cumulativeStats.totalPlayoffPoints",
      text: "Total Playoff Points",
      sort: true
    },
    {
      dataField: "cumulativeStats.totalPlayoffGames",
      text: "Total Playoff Games",
      sort: true
    },
    {
      dataField: "cumulativeStats.playoffPointsPerGame",
      text: "Playoff Points / Game",
      sort: true
    },
    {
      dataField: "wins",
      text: "Wins"
    },
    {
      dataField: "losses",
      text: "Losses"
    },
    {
      dataField: "streak",
      text: "Streak"
    }
  ];

  const displayedColumns = columns.filter(col =>
    chosenColumns.includes(col.dataField)
  );
  return (
    <>
      <h3>{title}</h3>
      <BootstrapTable
        bootstrap4
        hover
        condensed
        keyField="id"
        data={statData}
        columns={displayedColumns}
        filter={filterFactory()}
      />
    </>
  );
}

export default StatTable;
