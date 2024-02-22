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

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
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
          color: "orange", // Use your defined color here
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
    borderRadius: "8px", // Rounded corners for a softer look
    background: "linear-gradient(to top right, #F6F6F6, #FFFFFF)", // Gradient background
    boxShadow:
      "0px 4px 8px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.05)", // 3D box-shadow
    borderTop: "2px solid #FFA65D",
    padding: "16px", // Padding for content inside the tab panel
  },
});
