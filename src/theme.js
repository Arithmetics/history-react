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
  },
});

theme = responsiveFontSizes(theme);

export default theme;
