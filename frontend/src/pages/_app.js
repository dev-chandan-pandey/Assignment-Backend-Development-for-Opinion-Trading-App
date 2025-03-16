import '../../styles/globals.css'; // Adjust if the file is not directly accessible


// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }
// export default MyApp;
import { ThemeProvider } from "styled-components";
import { theme } from "../theme";
// export const theme = {
//   colors: {
//     primary: "#0070f3",
//     background: "#f0f0f0",
//     text: "#333",
//     cardBackground: "#fff"
//   }
// };
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

