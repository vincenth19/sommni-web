import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { appWithTranslation } from "next-i18next";
import { CookiesProvider } from "react-cookie";
import { AppProvider } from "../AppContext";
import MainFrame from "../components/shared/mainFrame";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <CookiesProvider>
        <MantineProvider
          theme={{
            fontFamily: "Outfit, sans-serif",
            fontFamilyMonospace: "Monaco, Courier, monospace",
            colors: {
              brand: [
                "#E4F5FF",
                "#D0E6FF",
                "#BCE2FF",
                "#88C4FF",
                "#5FA4FC",
                "#4285F4",
                "#1F6ADF",
                "#1259C6",
                "#0847A7",
                "#003687",
              ],
            },
            fontSizes: {
              d1: 32,
              d2: 48,
            },
            primaryColor: "brand",
          }}
        >
          <MainFrame>
            <Component {...pageProps} />
          </MainFrame>
        </MantineProvider>
      </CookiesProvider>
    </AppProvider>
  );
}

export default appWithTranslation(MyApp);
