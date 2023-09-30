const primary = '#813531';
const primaryLight = '#AC6F6C';
// const primaryLight = '#C48986';
const primaryDark = '#591E1B';
const secondary = '#49805E';
const secondaryDark = '#245235';
const tintColorDark = '#fff';
const linkColor = '#3676B3';

// todo: should be stylesheet

const globalStyle = {
   light: {
      black: '#111',
      white: '#fff',
      background: '#F0EBEA',
      backgroundDarker: '#E3DAD8',
      primary,
      primaryDark,
      primaryLight,
      secondary,
      secondaryDark,
      tabIconDefault: '#ccc',
      tabIconSelected: primary,
      linkColor,
   },
   dark: {
      text: '#fff',
      background: '#111',
      primary,
      primaryDark,
      primaryLight,
      secondary,
      tabIconDefault: '#ccc',
      tabIconSelected: tintColorDark,
   },
};

export default globalStyle;
