import { extendTheme } from "@chakra-ui/react";

export const sciLiveTheme = extendTheme({
  fonts: {
    // Define your font stack here if needed
  },
  fontSizes: {
    md: "16px",  // Base size for 'md'
    lg: "18px",  // Base size for 'lg'
    xl: "20px",  // Base size for 'xl'
    // Add more sizes if needed
  },
  tabs: {
    md: "sm",
    lg: "md",
    xl: "lg"
  }
  // Any other global styles or configurations
});
