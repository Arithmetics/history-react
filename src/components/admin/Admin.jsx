import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import PlayerManager from './players/PlayerManager';
import WABManager from './wab/WABManager';

import TabContainer from '../TabContainer';

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
      <TabContainer
        tabNames={[`Players`, `WAB`, `Podcasts`]}
        // tabs={[<PlayerManager />, <WABManager />, <p>pods</p>]}
        tabs={[<WABManager />, <p>players</p>, <p>pods</p>]}
      />
    </>
  );
}
