import { Platform } from "react-native";

const theme = {
    roundness: 3,
    colors: {
      backgroundColor: "#F5F5DC",
      appBarBackground: "#607D8B",
      textPrimary: "#24292e",
      textSecondary: "#586069",
      contrastText: "#fafafa",
      primary: "#CC7722",
      error: '#d73a4a',
      divider: '#d1d5da',
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System',
      }),
    },
    fontWeights: {
      normal: "400",
      bold: "700",
    },
  };
  
  export default theme;