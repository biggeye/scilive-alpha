import { extendTheme, keyframes } from "@chakra-ui/react";
import { fonts } from "./fonts";

export const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0) rotate(0deg); }
  to { opacity: 1; transform: scale(1) rotate(360deg); }
`;

export const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0); }
`;

export const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.5); }
`;


export const sciLiveTheme = extendTheme({
  fonts: {
    heading: fonts.rubik.variable,
    main: fonts.inter.variable,
    mono: fonts.roboto_mono.variable,
  },

  fontSizes: {
    sm: "12px", // 
    md: "16px", // Base size for 'md'
    lg: "18px", // Base size for 'lg'
    xl: "20px", // Base size for 'xl'
    // Add more sizes if needed
  },

  colors: {
    black: "#070708ff",
    onyx: "#454545ff",
    orange: "rgb(255, 166, 93)",
    lightBlue: "rgb(75, 108, 255)",
    silver: "#f0f0f0",
    seasalt: "#F6F6F6ff",
  },

  styles: {
    global: {
      body: {
        width: "100vw",
        overflowX: "hidden",
      },
      
      main: {
        width: "100vw",
        height: "100%",
        overflowY: "scroll",
        overflowX: "hidden",
        bgGradient: "linear(to-b, silver 50%, white 75%)",
      },

      input: {
        borderRadius: "1rem",
      },
      a: {
        _hover: {
          color: "orange", // Use your defined color here
          transition: "color 0.3s", // Transition time for the hover effect
        },
      },
     },
  },
  tabs: {
    sm: "xs",
    md: "sm",
    lg: "md",
    xl: "lg",
  },
  animations: {
    fadeIn: `${fadeIn} 0.3s ease-in-out`,
    fadeOut: `${fadeOut} 0.3s ease-in-out`,
  },
});
