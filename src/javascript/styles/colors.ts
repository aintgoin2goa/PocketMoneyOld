const WHITE = '#FFFFFF';
const BLACK = '#000000';
const RED = '#ff0000';
const GREY = '#aaa2a2';

export type ColorScheme = {
  background: string;
  text: string;
  text2: string;
  highlight: string;
};

const colorScheme: ColorScheme = {
  background: WHITE,
  text: BLACK,
  text2: GREY,
  highlight: RED,
};

const darkModeColorScheme: ColorScheme = {
  background: BLACK,
  text: WHITE,
  text2: GREY,
  highlight: RED,
};

export const getColors = (isDarkMode: boolean): ColorScheme => {
  if (isDarkMode) {
    return darkModeColorScheme;
  }

  return colorScheme;
};
