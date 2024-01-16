import { extendTheme, keyframes } from "@chakra-ui/react";
import { fonts } from './fonts';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0); }
  to { opacity: 1; transform: scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0); }
`;

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
          bgGradient: "linear(to-b, silver 50%, white 75%)",
            },
      input: {
        borderRadius: '1rem',
        borderColor: 'onyx',
        color: 'onyx',
      },
      link: {
        color: 'onyx',
        padding: '5px',
        margin: '5px',
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
  },
  animations: {
    fadeIn: `${fadeIn} 0.3s ease-in-out`,
    fadeOut: `${fadeOut} 0.3s ease-in-out`
  }
});
