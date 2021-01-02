import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import PlayerManager from './players/PlayerManager';

export default function Admin() {
  const history = useHistory();

  const { user } = useSelector((state) => state.user);

  if (!user || !user.isAdmin) {
    history.push('/home');
    return null;
  }

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Admin
      </Typography>
      <PlayerManager />
    </>
  );
}
