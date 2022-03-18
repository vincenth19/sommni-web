import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Container, MantineProvider } from "@mantine/core";
import { appWithTranslation } from "next-i18next";
import MainFrame from "../components/shared/mainFrame";

function MyApp({ Component, pageProps }: AppProps) {
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
      <Container size="xl">
        <MainFrame>
          <Component {...pageProps} />
        </MainFrame>
      </Container>
    </MantineProvider>
  );
}

export default appWithTranslation(MyApp);
