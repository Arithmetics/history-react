import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import LoadingSpinner from '../LoadingSpinner';

import LabCardFinder from './LabCardFinder';
import LabCardOwners from './LabCardOwners';

import { getAllCards } from '../../store/labCard';

function AllLabCards() {
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
          <LabCardOwners allCards={allCards} />
          <LabCardFinder allCards={allCards} />
        </div>
      )}
    </>
  );
}

export default AllLabCards;
