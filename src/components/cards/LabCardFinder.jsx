import React, { useState } from 'react';
import MaterialTable from 'material-table';

import { makeStyles } from '@material-ui/core/styles';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { filterBetween, createLookup } from '../materialTableHelpers';

import {
  PlayerAvatarLink,
  OwnerAvatarLink,
  OwnerCardLink,
} from '../materialTableElements';

const useStyles = makeStyles({
  avatarContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});

function LabCardFilterCheck({ onlyOwnedCards }) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox checked={onlyOwnedCards} name="checkedA" />
        }
        label="Filter Only Owned Cards"
      />
    </FormGroup>
  );
}

function LabCardFinder({ allCards }) {
  const classes = useStyles();
  const [onlyOwnedCards, setOnlyOwnedCards] = useState(false);

  const unfrozenData = allCards
    .filter((c) => (onlyOwnedCards ? c.users.length > 0 : c))
    .map((p) => {
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
    <MaterialTable
      title="Card Finder"
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
        showTitle: true,
      }}
      actions={[
        {
          icon: () => (
            <LabCardFilterCheck onlyOwnedCards={onlyOwnedCards} />
          ),
          isFreeAction: true,
          onClick: () => setOnlyOwnedCards(!onlyOwnedCards),
        },
      ]}
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
          lookup: createLookup(unfrozenData, ['year']),
        },
        {
          title: 'Card Owners',
          field: 'users',
          render: (rowData) => (
            <div className={classes.avatarContainer}>
              {rowData.users.map((user) => (
                <OwnerCardLink
                  key={user.id}
                  id={user.owner.id}
                  name={user.owner.name}
                />
              ))}
            </div>
          ),
          filtering: false,
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
      ]}
    />
  );
}

export default LabCardFinder;
