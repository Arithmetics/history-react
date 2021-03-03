import React from 'react';
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

const useStyles = makeStyles({
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

function LabCardOwners({ allCards }) {
  const classes = useStyles();

  const sortedCardCounts = usersLabCardCounts(allCards);

  return (
    <div className={classes.cardContainer}>
      {Object.keys(sortedCardCounts.users).map((userId) => {
        const { owner, totalCards, counts } = sortedCardCounts.users[
          userId
        ];
        const totalCardCount = sortedCardCounts.totalCards;
        const totalPercent = (100 * totalCards) / totalCardCount;
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
              <Typography variant="p" className={classes.totalCount}>
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
                                sortedCardCounts.totalsBySet[year][
                                  position
                                ];
                              const progressPercentage = Math.round(
                                100 *
                                  (yearsCounts[position] /
                                    slicedCards),
                              );

                              return (
                                <div
                                  className={classes.progressMarker}
                                >
                                  <Typography
                                    variant="p"
                                    className={classes.totalCount}
                                  >
                                    {year} - {position} -{' '}
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
  );
}

export default LabCardOwners;
