import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function TabContainer(props) {
  const classes = useStyles();
  const { tabs, tabNames } = props;
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  const handleChange = (_event, newValue) => {
    setSelectedTabIndex(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={selectedTabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          {tabNames.map((name) => (
            <Tab key={name} label={name} />
          ))}
        </Tabs>
      </AppBar>
      {tabs.map((tab, i) => (
        <TabPanel
          key={String(tab)}
          value={selectedTabIndex}
          index={i}
        >
          {tab}
        </TabPanel>
      ))}
    </div>
  );
}
