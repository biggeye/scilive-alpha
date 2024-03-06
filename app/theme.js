import { useColorModeValue, extendTheme, keyframes, theme as baseTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

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

// Fonts configuration
const fonts = {
  heading: "Rubik, sans-serif",
  body: "Inter, sans-serif",
  mono: "Roboto Mono, monospace",
};

// Theme extension for Chakra UI
export const sciLiveTheme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  fonts,
  fontSizes: {
    sm: "12px",
    md: "16px",
    lg: "18px",
    xl: "20px",
  },
   components: {
    Button: {
      // Example component customization
      baseStyle: (props) => ({
        fontWeight: "normal",
        _hover: {
          boxShadow: mode('lg', 'dark-lg')(props),
        },
      }),
    },
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
  animations: {
    slideDown: `${slideDown} 0.5s ease-in-out`,
    fadeIn: `${fadeIn} 0.3s ease-in-out`,
    fadeOut: `${fadeOut} 0.3s ease-in-out`,
    pulse: `${pulse} 2s infinite ease-in-out`,
    animateIn: `${animateIn} 0.8s ease-in-out`,
    shadowLoop: `${shadowLoop} 10s infinite linear`
  }
  
})

