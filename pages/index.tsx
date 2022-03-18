import { Image } from "@mantine/core";
import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import InfoSection from "../components/home/infoSection";
import ProductsSection from "../components/home/products";
import TopSection from "../components/home/topSection";
import WhySection from "../components/shared/whySection";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sommni</title>
        <meta name="description" content="Sommni Bedding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <InfoSection />
      <Image
        height={"500px"}
        src="https://www.thespruce.com/thmb/rmDEwUoAgwucuusBRvFoE4JBc0o=/4000x2250/smart/filters:no_upscale()/master-bedroom-in-new-luxury-home-with-chandelier-and-large-bank-of-windows-with-view-of-trees-1222623844-212940f4f89e4b69b6ce56fd968e9351.jpg"
        alt="Swiper Image"
      />
      <TopSection />
      <ProductsSection />
      <WhySection />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const res = await fetch("https://data.covid19.go.id/public/api/update.json");
  const update = await res.json();

  return {
    props: {
      update,
      ...(await serverSideTranslations(locale as string, [
        "common",
        "home",
        "footer",
      ])),
    },
  };
};

export default Home;
