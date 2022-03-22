import { Image } from "@mantine/core";
import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

import dynamic from "next/dynamic";

const WhySection = dynamic(() => import("../components/shared/whySection"));
const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const ProductsSection = dynamic(() => import("../components/home/products"));

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sommni</title>
        <meta name="description" content="Sommni Bedding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainFrame>
        <Image
          height={"500px"}
          src="https://www.thespruce.com/thmb/rmDEwUoAgwucuusBRvFoE4JBc0o=/4000x2250/smart/filters:no_upscale()/master-bedroom-in-new-luxury-home-with-chandelier-and-large-bank-of-windows-with-view-of-trees-1222623844-212940f4f89e4b69b6ce56fd968e9351.jpg"
          alt="Swiper Image"
        />
        <ProductsSection />
        <WhySection />
      </MainFrame>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        "common",
        "home",
        "footer",
      ])),
    },
  };
};

export default Home;
