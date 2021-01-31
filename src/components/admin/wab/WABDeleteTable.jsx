import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import LoadingSpinner from '../../LoadingSpinner';
import DeleteResourceConfirm from '../DeleteResourceConfirm';
import { deleteWAB, getAllWAB } from '../../../store/wab';
import {
  PlayerAvatarLink,
  TeamAvatarLink,
} from '../../materialTableElements';

export default function WABDeleteTable() {
  const dispatch = useDispatch();

  const {
    allWABLoading,
    allWAB,
    allWABSuccess,
    allWABError,
    //
    deleteWABLoading,
    deleteWABSuccess,
    deleteWABError,
  } = useSelector((state) => state.wab);

  const [open, setOpen] = useState(false);
  const [wabToDelete, setWABToDelete] = useState(undefined);

  useEffect(() => {
    dispatch(getAllWAB());
  }, [dispatch]);

  const handleClickOpen = (wab) => {
    setOpen(true);
    setWABToDelete(wab);
  };

  const handleClose = () => {
    setOpen(false);
    setWABToDelete(undefined);
  };

  if (allWABLoading) {
    return <LoadingSpinner isLoading={allWABLoading} />;
  }

  if (allWABError) {
    return <p>There was an error fetching the WAB data</p>;
  }

  if (allWABSuccess) {
    const unfrozenData = allWAB.map((p) => {
      const {
        id,
        amount,
        year,
        week,
        winning,
        player,
        fantasyTeam,
        createdAt,
      } = p;
      return {
        id,
        amount,
        year,
        week,
        winning,
        player,
        fantasyTeam,
        createdAt,
      };
    });

    return (
      <>
        <DeleteResourceConfirm
          deleteResource={deleteWAB}
          deleteResourceLoading={deleteWABLoading}
          deleteResourceSuccess={deleteWABSuccess}
          deleteResourceError={deleteWABError}
          handleClose={handleClose}
          open={open}
          resource={wabToDelete}
          resourceId={wabToDelete?.id}
          resourceName="WAB Bid"
        />
        <MaterialTable
          title="Manage Waiver Bids"
          data={unfrozenData}
          options={{
            filtering: false,
            padding: 'dense',
            paging: true,
            pageSize: 10,
            pageSizeOptions: [10, 20, 50],
            search: true,
            exportButton: false,
            emptyRowsWhenPaging: false,
            showTitle: true,
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: 'delete',
              tooltip: 'Delete WAB',
              onClick: (event, rowData) => handleClickOpen(rowData),
            },
          ]}
          columns={[
            {
              title: 'Player',
              field: 'player',
              filtering: false,
              render: (rowData) => (
                <PlayerAvatarLink
                  id={rowData.player.id}
                  playerName={rowData.player.name}
                  pictureId={rowData.player.pictureId}
                />
              ),
            },
            {
              title: 'Team',
              field: 'fantasyTeam.name',
              render: (rowData) => (
                <TeamAvatarLink
                  id={rowData.fantasyTeam.id}
                  teamName={rowData.fantasyTeam.name}
                  pictureUrl={rowData.fantasyTeam.pictureUrl}
                />
              ),
            },
            {
              title: 'Year',
              field: 'year',
            },
            {
              title: 'Week',
              field: 'week',
            },
            {
              title: 'Winning?',
              field: 'winning',
            },
            {
              title: 'Amount',
              field: 'amount',
            },
            {
              title: 'Entered',
              field: 'createdAt',
            },
          ]}
        />
      </>
    );
  }

  return null;
}
