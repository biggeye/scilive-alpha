import { extendTheme } from "@chakra-ui/react";
import { fonts } from './fonts';

export const sciLiveTheme = extendTheme({
  fonts: {
    heading: fonts.rubik.variable,
    main: fonts.inter.variable,
    mono: fonts.roboto_mono.variable,
  },
  fontSizes: {
    md: "16px",  // Base size for 'md'
    lg: "18px",  // Base size for 'lg'
    xl: "20px",  // Base size for 'xl'
    // Add more sizes if needed
  },
  colors: {
    black: '#070708ff',
    onyx: '#454545ff',
    orange: 'rgb(255, 166, 93)',
    lightBlue: 'rgb(75, 108, 255)',
    silver: '#f0f0f0',
    seasalt: '#F6F6F6ff',
  },
  styles: {
    global: {
        main: {
        height: '100vh',
        bgGradient: "linear(to-b, silver 50%, white 75%)",
      
      },
      'a': {
        color: 'inherit',
        textDecoration: 'none',
        _hover: {
          color: 'orange', // Use your defined color here
          transition: 'color 0.3s', // Transition time for the hover effect
        },
      },
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
        },
  },
  tabs: {
    md: "sm",
    lg: "md",
    xl: "lg"
  }
});
