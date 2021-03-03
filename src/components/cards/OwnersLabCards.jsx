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
});

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
      <Typography variant="h3" gutterBottom>
        Owners Cards
      </Typography>
      {getOwnersCardsLoading && (
        <LoadingSpinner isLoading={getOwnersCardsLoading} />
      )}

      {getOwnersCardsError && <p>Error bad bad error</p>}

      {getOwnersCardsSuccess && (
        <div className={classes.cardContainer}>
          {ownersCards[ownerId]?.map((seasonCard) => (
            <LabCard
              key={seasonCard.id}
              card={seasonCard}
              startUnknown
            />
          ))}
        </div>
      )}
    </>
  );
}
