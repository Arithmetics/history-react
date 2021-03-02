import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  cardContainer: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  userCard: {
    width: '23%',
    minWidth: 200,
  },
  cardHead: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    borderRadius: 500,
    display: 'block',
    border: '1px solid #0b878c',
    maxHeight: 50,
  },
  totalCount: {
    marginTop: 30,
  },
  accordian: {
    marginTop: 30,
  },
  progressMarker: {
    display: 'block',
    width: '100%',
    paddingBottom: 10,
  },
  accordianDetails: {
    display: 'block',
  },
});

// const users = {
//   2: {
//     owner: {
//       id: 3,
//       name: 'bob',
//     },
//     counts: {
//       2011: {
//         RB: 0,
//         WR: 0,
//         WR: 0,
//         QB: 0,
//       },
//     },
//   },
// };

function usersLabCardCounts(allCards) {
  let totalCards = 0;
  const totalsBySet = {};
  const users = {};
  allCards.forEach((card) => {
    const { position, year } = card;

    totalCards += 1;
    if (!totalsBySet[year]) {
      totalsBySet[year] = {
        RB: 0,
        WR: 0,
        TE: 0,
        QB: 0,
      };
    }
    totalsBySet[year][position] += 1;

    card.users.forEach((user) => {
      const userId = user.id;
      const { owner } = user;

      if (!users[userId]) {
        users[userId] = {
          owner,
          totalCards: 0,
          counts: {},
        };
      }

      if (!users[userId].counts[year]) {
        users[userId].counts[year] = {};
      }
      if (!users[userId].counts[year][position]) {
        users[userId].counts[year][position] = 0;
      }
      users[userId].counts[year][position] += 1;
      users[userId].totalCards += 1;
    });
  });

  return {
    totalCards,
    users,
    totalsBySet,
  };
}

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

  const unfrozenData = allCards
    .filter((c) => c.users.length > 0)
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

  const sortedCardCounts = usersLabCardCounts(allCards);

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
        <div>
          <div className={classes.cardContainer}>
            {Object.keys(sortedCardCounts.users).map((userId) => {
              const {
                owner,
                totalCards,
                counts,
              } = sortedCardCounts.users[userId];
              const totalCardCount = sortedCardCounts.totalCards;
              const totalPercent =
                (100 * totalCards) / totalCardCount;
              return (
                <Card className={classes.userCard} key={userId}>
                  <CardContent>
                    <div className={classes.cardHead}>
                      <img
                        alt="owner-pick"
                        className={classes.profileImage}
                        src={`/ownerAvatars/${owner.id}.png`}
                      />
                      <h3>{owner.name}</h3>
                    </div>
                    <Typography
                      variant="p"
                      className={classes.totalCount}
                    >
                      All cards: {totalCards}/{totalCardCount}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={totalPercent}
                    />
                    <Accordion className={classes.accordian}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>
                          Collection Progress
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        className={classes.accordianDetails}
                      >
                        <>
                          {Object.keys(counts).map((year) => {
                            const yearsCounts = counts[year];
                            return (
                              <div>
                                {Object.keys(yearsCounts).map(
                                  (position) => {
                                    const slicedCards =
                                      sortedCardCounts.totalsBySet[
                                        year
                                      ][position];
                                    const progressPercentage = Math.round(
                                      100 *
                                        (yearsCounts[position] /
                                          slicedCards),
                                    );

                                    return (
                                      <div
                                        className={
                                          classes.progressMarker
                                        }
                                      >
                                        <Typography
                                          variant="p"
                                          className={
                                            classes.totalCount
                                          }
                                        >
                                          {year} - {position}:{' '}
                                          {yearsCounts[position]}/
                                          {slicedCards}
                                        </Typography>

                                        <LinearProgress
                                          variant="determinate"
                                          value={progressPercentage}
                                        />
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            );
                          })}
                        </>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                  <CardActions>
                    <Button
                      color="primary"
                      variant="contained"
                      component={RouterLink}
                      to={`/cards/${userId}`}
                    >
                      View Collection
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </div>
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
        </div>
      )}
    </>
  );
}

export default AllLabCards;
