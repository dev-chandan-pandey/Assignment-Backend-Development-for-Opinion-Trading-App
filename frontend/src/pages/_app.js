import '../../styles/globals.css'; 
import { ThemeProvider } from "styled-components";
import { theme } from "../theme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

