import { extendTheme, keyframes } from "@chakra-ui/react";

// Keyframes for animations
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const animateIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shadowLoop = keyframes`
  0%, 100% { box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.2); }
  25% { box-shadow: 2px 10px 2px rgba(0, 0, 0, 0.2); }
  50% { box-shadow: -3px 15px 10px rgba(0, 0, 0, 0.2); }
  75% { box-shadow: 2px 10px 100px rgba(0, 0, 0, 0.2); }
`;

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.97); opacity: .7; }
`;

const fonts = {
  rubik: { variable: "Rubik, sans-serif" },
  inter: { variable: "Inter, sans-serif" },
  roboto_mono: { variable: "Roboto Mono, monospace" },
};
// Extending the theme
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
    black: "#0f1010",
    gray: {
      50: "#f9fafa",
      100: "#f1f2f2",
      200: "#e6e8e8",
      300: "#d1d4d4",
      400: "#a9aeae",
      500: "#7c8080",
      600: "#535555",
      700: "#353737",
      800: "#1f2020",
      900: "#191a1a",
    },
    cyan: {
      50: "#f8fafa",
      100: "#e4eaec",
      200: "#d8e1e4",
      300: "#cad7da",
      400: "#a2b8bf",
      500: "#90aab2",
      600: "#7b9ba4",
      700: "#5a818d",
      800: "#3e6c79",
      900: "#1f5565",
    },
    blue: {
      50: "#f5f6f8",
      100: "#d9dee5",
      200: "#bec6d2",
      300: "#a0adbd",
      400: "#8595aa",
      500: "#6d809a",
      600: "#556c89",
      700: "#375275",
      800: "#264369",
      900: "#17365f",
    },
    purple: {
      50: "#f7f6f9",
      100: "#e1dde8",
      200: "#cbc4d6",
      300: "#aca0be",
      400: "#9788ad",
      500: "#7c6998",
      600: "#6a558a",
      700: "#59427c",
      800: "#4b3272",
      900: "#3a1f64",
    },
    pink: {
      50: "#f9f7f8",
      100: "#e8dee3",
      200: "#d7c4cc",
      300: "#bfa2af",
      400: "#af8b9b",
      500: "#9b6e81",
      600: "#8d5970",
      700: "#7d425c",
      800: "#6d2b48",
      900: "#5c1333",
    },
    red: {
      50: "#f9f7f6",
      100: "#e8dedd",
      200: "#d4c1c0",
      300: "#bc9f9d",
      400: "#ae8c8a",
      500: "#9c7370",
      600: "#8d5d5a",
      700: "#7c4541",
      800: "#713632",
      900: "#5f1c18",
    },
    orange: {
      50: "#fbfaf9",
      100: "#f0ede9",
      200: "#ded8cf",
      300: "#c6baac",
      400: "#afa08c",
      500: "#9c8970",
      600: "#897254",
      700: "#745936",
      800: "#62431c",
      900: "#56350a",
    },
    yellow: {
      50: "#fefefe",
      100: "#f9f9f6",
      200: "#eeede6",
      300: "#e1dfd3",
      400: "#cfccb9",
      500: "#ada988",
      600: "#8d885a",
      700: "#706a30",
      800: "#574f0b",
      900: "#484103",
    },
    green: {
      50: "#fafcfb",
      100: "#e4ede9",
      200: "#c8d9d2",
      300: "#aac4b9",
      400: "#8aae9e",
      500: "#6a9884",
      600: "#498168",
      700: "#23674a",
      800: "#0b5635",
      900: "#034729",
    },
    teal: {
      50: "#f8fafa",
      100: "#e1eaea",
      200: "#c8d8d9",
      300: "#aac2c4",
      400: "#84a8aa",
      500: "#649194",
      600: "#40787b",
      700: "#1d5f63",
      800: "#085055",
      900: "#034246",
    },
    primary: {
      50: "#f5f8f8",
      100: "#d9e2e5",
      200: "#b8c8ce",
      300: "#90aab2",
      400: "#7a99a3",
      500: "#5d838f",
      600: "#44707e",
      700: "#285b6b",
      800: "#174d5f",
      900: "#033849",
    },
  },

  styles: {
    global: {
      body: {
        "--max-width": "1100px",
        width: "100vw",
        overflowX: "hidden",
      },
      ".bottomInputFormFrame": {
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 10,
        color: "onyx",
        backgroundColor: "silver",
        borderWidth: "1px",
        borderColor: "onyx",
      },
      ".chatButton": {
        position: "fixed",
        bottom: "5px",
        left: "5px",
      },
      "::-webkit-scrollbar": {
        width: "8px",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "#f0f0f0",
        borderRadius: "3px",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "5px",
        "&:hover": {
          backgroundColor: "#555",
        },
      },
      main: {
        bgGradient: "linear(to-b, silver 25%, white 75%)",
      },
      input: {
        borderRadius: "1rem",
      },
      a: {
        _hover: {
          transition: "color 0.3s", // Transition time for the hover effect
        },
      },
      ".code": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "5px",
        left: "40%",
        fontSize: "xx-small",
        border: "1px solid",
        borderColor: "#374151",
        borderBottomLeftRadius: ".2rem",
      },
      ".image-card": {
        borderWidth: "1px",
        borderColor: "#454545ff",
        width: "auto",
        padding: "10px",
        animation: `${shadowLoop} 20s linear infinite`,
      },
      ".element-fade-in": {
        animation: `${fadeIn} .2s ease-in`,
      },
      ".element-fade-out": {
        animation: `${fadeOut} 2s linear`,
      },
      ".element-pulse": {
        animation: `${pulse} .5s linear infinite`,
      },
      ".fade-in-from-top": {
        animation: `${animateIn} 1.5s`,
      },
      ".Logo": {
        transition: "fill 0.5s ease-in-out",
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
    pulsing: `{${pulse} 0.5s ease-in-out`,
    longFadeIn: `${fadeIn} 15s ease-in-out`,
  },

  tabPanelStyles: {
    borderRadius: "8px",
    background: "linear-gradient(to top right, #F6F6F6, #FFFFFF)",
    boxShadow:
      "0px 4px 8px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.05)",
    borderTop: "2px solid #FFA65D",
    padding: "16px",
  },

  components: {
    FeatureCard: {
      baseStyle: {
        padding: "20px",
        boxShadow: "xl",
        rounded: "lg",
        borderRadius: "15px",
        
        _hover: {
          bg: "gray.600",
          transform: "translateY(-5px)",
          boxShadow: "lg",
        },
        transition: "all 0.2s",
      },
    },
  },
});
