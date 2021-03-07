/* eslint-disable import/no-mutable-exports */
import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#10cdd3',
      main: '#0eaab0',
      dark: '#0b878c',
    },
    secondary: {
      light: '#f75b60',
      main: '#d65155',
      dark: '#9e383c',
      darkest: '#752a2c',
    },
    success: {
      light: '#27ceb8',
      main: '#20a08f',
      dark: '#136F63',
      darkest: '#0f564d',
    },
    graph: {
      graph1: '#20a08f',
      graph2: '#d65155',
      graph3: '#7D3BC1',
      graph4: '#EABE3B',
      graph5: '#DE542D',
      graph6: '#1CAADE',
      graph7: '#F0A58F',
    },
  },
  overrides: {
    // Style sheet name ⚛️
    MuiLink: {
      // Name of the rule
      root: {
        // Some CSS
        '&:hover': {
          color: '#d65155',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
