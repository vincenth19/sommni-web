import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import dynamic from "next/dynamic";
import Head from "next/head";
const MainFrame = dynamic(() => import("../components/shared/mainFrame"));

const Compare: NextPage = () => {
  return (
    <MainFrame>
      <Head>
        <title>Sommni - Compare</title>
        <meta name="description" content="Sommni - Compare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>compare page</p>
    </MainFrame>
  );
};

export default Compare;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};
