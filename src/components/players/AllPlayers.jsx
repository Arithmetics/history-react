import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MaterialTable from 'material-table';

import Typography from '@material-ui/core/Typography';
import LoadingSpinner from '../LoadingSpinner';

import { createLookup, filterBetween } from '../materialTableHelpers';
import {
  PlayerAvatarLink,
  HeaderCellWithTooltip,
} from '../materialTableElements';

import { baseURLConfig } from '../../api';

function AllPlayers() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${baseURLConfig}/players.json`);
      setPlayers(result && result.data && result.data.players);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h3" gutterBottom>
        All Players
      </Typography>
      {loading && <LoadingSpinner isLoading={loading} />}
      {!loading && (
        <>
          <MaterialTable
            title="All Players"
            data={players}
            options={{
              filtering: true,
              padding: 'dense',
              paging: true,
              pageSize: 50,
              pageSizeOptions: [50, 100, players.length],
              search: true,
              exportButton: true,
              emptyRowsWhenPaging: false,
              exportAllData: true,
              showTitle: false,
            }}
            columns={[
              {
                title: <HeaderCellWithTooltip abbr="PN" />,
                field: 'playerName',
                filtering: false,
                render: (rowData) => (
                  <PlayerAvatarLink
                    id={rowData.id}
                    playerName={rowData.playerName}
                    pictureId={rowData.pictureId}
                  />
                ),
              },
              {
                title: <HeaderCellWithTooltip abbr="POS" />,
                field: 'careerStats.position',
                lookup: createLookup(players, [
                  'careerStats',
                  'position',
                ]),
              },
              {
                title: <HeaderCellWithTooltip abbr="TS" />,
                field: 'careerStats.totalStarts',
              },
              {
                title: <HeaderCellWithTooltip abbr="RSP" />,
                field: 'careerStats.totalPoints',
                filtering: false,
              },
              {
                title: <HeaderCellWithTooltip abbr="PP" />,
                field: 'careerStats.playoffPoints',
                filtering: false,
              },
              {
                title: <HeaderCellWithTooltip abbr="FP" />,
                field: 'careerStats.finalsPoints',
                filtering: false,
              },
              {
                title: <HeaderCellWithTooltip abbr="CMP" />,
                field: 'careerStats.championships',
                filtering: false,
              },
              {
                title: <HeaderCellWithTooltip abbr="TAD" />,
                field: 'careerStats.totalAuctionMoney',
                filtering: false,
              },
              {
                title: <HeaderCellWithTooltip abbr="MAP" />,
                field: 'careerStats.highestAuctionMoney',
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, [
                    'careerStats',
                    'highestAuctionMoney',
                  ]),
              },
              {
                title: <HeaderCellWithTooltip abbr="BSP" />,
                field: 'careerStats.bestStart',
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, [
                    'careerStats',
                    'bestStart',
                  ]),
              },
              {
                title: <HeaderCellWithTooltip abbr="BPDR" />,
                field: 'careerStats.bestPreseasonRank',
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, [
                    'careerStats',
                    'bestPreseasonRank',
                  ]),
              },
              {
                title: <HeaderCellWithTooltip abbr="BFR" />,
                field: 'careerStats.bestRegRank',
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, [
                    'careerStats',
                    'bestRegRank',
                  ]),
              },
              {
                title: <HeaderCellWithTooltip abbr="BFRP" />,
                field: 'careerStats.bestPprRank',
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, [
                    'careerStats',
                    'bestPprRank',
                  ]),
              },
            ]}
          />
        </>
      )}
    </>
  );
}

export default AllPlayers;
