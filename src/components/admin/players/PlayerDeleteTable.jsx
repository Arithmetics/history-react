import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import LoadingSpinner from '../../LoadingSpinner';

import { getAllPlayers } from '../../../store/player';
import { NFL_PLAYER_PAGE, NFL_IMAGE_URL } from '../../../constants';
import { PlayerAvatarLink } from '../../materialTableElements';
import DeletePlayerConfirm from './DeletePlayerConfirm';

const useStyles = makeStyles((theme) => ({
  success: {
    color: theme.palette.success.main,
    margin: 16,
  },
  link: {
    color: theme.palette.primary.main,
  },
}));

export default function PlayerDeleteTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    allPlayersLoading,
    allPlayers,
    allPlayersSuccess,
    allPlayersError,
  } = useSelector((state) => state.player);

  const [open, setOpen] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(undefined);

  useEffect(() => {
    dispatch(getAllPlayers());
  }, [dispatch]);

  const handleClickOpen = (player) => {
    setOpen(true);
    setPlayerToDelete(player);
  };

  const handleClose = () => {
    setOpen(false);
    setPlayerToDelete(undefined);
  };

  if (allPlayersLoading) {
    return <LoadingSpinner isLoading={allPlayersLoading} />;
  }

  if (allPlayersError) {
    return <p>There was an error fetching the player data</p>;
  }

  if (allPlayersSuccess) {
    const unfrozenData = allPlayers.map((p) => {
      const {
        name,
        birthdate,
        id,
        createdAt,
        nflUrlName,
        pictureId,
      } = p;
      return {
        name,
        birthdate,
        id,
        createdAt,
        nflUrlName,
        pictureId,
      };
    });
    return (
      <>
        <DeletePlayerConfirm
          handleClose={handleClose}
          open={open}
          player={playerToDelete}
        />
        <MaterialTable
          title="Manage Players"
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
              tooltip: 'Delete player',
              onClick: (event, rowData) => handleClickOpen(rowData),
            },
          ]}
          columns={[
            {
              title: 'Name',
              field: 'name',
              filtering: false,
              render: (rowData) => (
                <PlayerAvatarLink
                  id={rowData.id}
                  playerName={rowData.name}
                  pictureId={rowData.pictureId}
                />
              ),
            },
            {
              title: 'Profile ID',
              field: 'id',
            },
            {
              title: 'Picture ID',
              field: 'pictureId',
              render: (rowData) => (
                <a
                  href={`${NFL_IMAGE_URL}/${rowData.pictureId}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.link}
                >
                  {rowData.pictureId}
                </a>
              ),
            },
            {
              title: 'NFL URL',
              field: 'nflUrlName',
              render: (rowData) => (
                <a
                  href={`${NFL_PLAYER_PAGE}/${rowData.nflUrlName}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classes.link}
                >
                  {rowData.nflUrlName}
                </a>
              ),
            },
            {
              title: 'Birthdate',
              field: 'birthdate',
            },
            {
              title: 'Created At',
              field: 'createdAt',
              defaultSort: 'desc',
            },
          ]}
        />
      </>
    );
  }

  return null;
}
