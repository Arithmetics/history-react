import React from 'react';
import WABDeleteTable from './WABDeleteTable';
import NewWABForm from './NewWABForm';

export default function WABManager() {
  return (
    <>
      <NewWABForm />
      <br />
      <WABDeleteTable />
    </>
  );
}
