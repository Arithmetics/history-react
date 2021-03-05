import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import LabCard from './LabCard';
import LoadingSpinner from '../LoadingSpinner';
import { getOwnersCards } from '../../store/labCard';

const useStyles = makeStyles({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  hr: {
    margin: '50px 0',
  },
  profileImage: {
    borderRadius: 500,
    display: 'block',
    border: '1px solid #0b878c',
    maxHeight: 200,
  },
});

function cardIsRare(card) {
  if (card.position === 'QB') {
    return card.rankReg < 6 || card.rankPpr < 6;
  }

  if (card.position === 'RB' || card.position === 'WR') {
    return card.rankReg < 11 || card.rankPpr < 11;
  }

  if (card.position === 'TE') {
    return card.rankReg < 4 || card.rankPpr < 4;
  }

  return false;
}

export default function OwnersLabCards({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ownerId = match.params.id;

  const {
    getOwnersCardsLoading,
    getOwnersCardsSuccess,
    getOwnersCardsError,
    ownersCards,
  } = useSelector((state) => state.labCard);

  useEffect(() => {
    dispatch(getOwnersCards(ownerId));
  }, [dispatch]);

  return (
    <>
      {getOwnersCardsLoading && (
        <LoadingSpinner isLoading={getOwnersCardsLoading} />
      )}

      {getOwnersCardsError && <p>Error bad bad error</p>}

      {getOwnersCardsSuccess && (
        <>
          <Typography variant="h3" gutterBottom>
            Card Collection
          </Typography>
          <img
            alt="owner-profile-pic"
            className={classes.profileImage}
            src={`/ownerAvatars/${ownerId}.png`}
          />
          <hr className={classes.hr} />
          <Typography variant="h3" gutterBottom>
            Rare Cards
          </Typography>
          <div className={classes.cardContainer}>
            {ownersCards[ownerId]
              ?.filter((card) => cardIsRare(card))
              .map((seasonCard) => (
                <LabCard
                  key={`${seasonCard.id}${seasonCard.year}`}
                  card={seasonCard}
                />
              ))}
          </div>
          <hr className={classes.hr} />
          <Typography variant="h3" gutterBottom>
            Common Cards
          </Typography>
          <div className={classes.cardContainer}>
            {ownersCards[ownerId]
              ?.filter((card) => !cardIsRare(card))
              .map((seasonCard) => (
                // <LabCard key={seasonCard.id} card={seasonCard} />
                <p>{seasonCard.id}</p>
              ))}
          </div>
        </>
      )}
    </>
  );
}
