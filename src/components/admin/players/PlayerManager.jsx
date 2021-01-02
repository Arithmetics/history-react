import React from 'react';
import PlayerDeleteTable from './PlayerDeleteTable';
import NewPlayerForm from './NewPlayerForm';

export default function PlayerManager() {
  return (
    <>
      <NewPlayerForm />
      <br />
      <PlayerDeleteTable />
    </>
  );
}
