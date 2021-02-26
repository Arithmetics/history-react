import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import LoadingSpinner from '../LoadingSpinner';

import { filterBetween, createLookup } from '../materialTableHelpers';
import {
  PlayerAvatarLink,
  OwnerAvatarLink,
  OwnerCardLink,
} from '../materialTableElements';

import { getAllCards } from '../../store/labCard';

const useStyles = makeStyles({
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});

function AllLabCards() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    getAllCardsLoading,
    getAllCardsSuccess,
    getAllCardsError,
    allCards,
  } = useSelector((state) => state.labCard);

  useEffect(() => {
    dispatch(getAllCards());
  }, [dispatch]);

  // id
  // player - player avatar
  // year
  // rankPpr
  // rankReg
  // owner - owner avatar
  // users whos own  - owner avatars ?

  const unfrozenData = allCards.map((p) => {
    const { id, year, player, rankPpr, rankReg, owner, users } = p;
    return {
      id,
      year,
      player,
      rankPpr,
      rankReg,
      owner,
      users,
    };
  });

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Lab Cards
      </Typography>
      {getAllCardsLoading && (
        <LoadingSpinner isLoading={getAllCardsLoading} />
      )}
      {getAllCardsError && <p>Oops bad error</p>}
      {getAllCardsSuccess && (
        <>
          <MaterialTable
            title="All Cards"
            data={unfrozenData}
            options={{
              filtering: true,
              padding: 'dense',
              paging: true,
              pageSize: 50,
              pageSizeOptions: [50, 100, 200],
              search: true,
              exportButton: true,
              emptyRowsWhenPaging: false,
              exportAllData: true,
              showTitle: false,
            }}
            columns={[
              {
                title: 'Card ID',
                field: 'id',
              },
              {
                title: 'Player Name',
                field: 'player.name',
                filtering: true,
                render: (rowData) => (
                  <PlayerAvatarLink
                    id={rowData.id}
                    playerName={rowData.player.name}
                    pictureId={rowData.player.pictureId}
                  />
                ),
              },
              {
                title: 'Year',
                field: 'year',
              },
              {
                title: 'Rank PPR',
                field: 'rankPpr',
                filtering: true,
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, ['rankPpr']),
              },
              {
                title: 'Rank Regular',
                field: 'rankReg',
                filtering: true,
                customFilterAndSearch: (term, rowData) =>
                  filterBetween(term, rowData, ['rankReg']),
              },
              {
                title: 'Owner on Card',
                field: 'owner.name',
                lookup: createLookup(unfrozenData, ['owner', 'name']),
                render: (rowData) => (
                  <OwnerAvatarLink
                    id={rowData.owner.id}
                    ownerName={rowData.owner.name}
                  />
                ),
              },
              {
                title: 'Card Owners',
                field: 'users',
                render: (rowData) => (
                  <div className={classes.avatarContainer}>
                    {rowData.users.map((user) => (
                      <OwnerCardLink id={user.id} name={user.name} />
                    ))}
                  </div>
                ),
              },
            ]}
          />
        </>
      )}
    </>
  );
}

export default AllLabCards;
