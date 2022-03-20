import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { appWithTranslation } from "next-i18next";
import MainFrame from "../components/shared/mainFrame";
import { useMediaQuery } from "@mantine/hooks";
import { screenSizes } from "../types";

function MyApp({ Component, pageProps }: AppProps) {
  const screenSize = useMediaQuery(`(max-width: ${screenSizes.xs})`);
  return (
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
        primaryColor: "brand",
      }}
    >
      <div>
        <MainFrame>
          <Component {...pageProps} />
        </MainFrame>
      </div>
    </MantineProvider>
  );
}

export default appWithTranslation(MyApp);
