import type { AppProps } from "next/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { lightTheme } from "@/themes/lightTheme";
import darkTheme from "@/themes/darkTheme";
import { ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import "../styles/globals.css";
import { useRouter } from "next/router";
import PageTransition from "@/components/UI/PageTransition";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import UserContextProvider from "@/store/user-context";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () => (prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageTransition path={router.route}>
          <UserContextProvider>
            <Component {...pageProps} key={router.route} />
          </UserContextProvider>
        </PageTransition>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
