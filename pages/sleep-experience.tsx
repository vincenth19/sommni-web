import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import dynamic from "next/dynamic";
import Head from "next/head";
const MainFrame = dynamic(() => import("../components/shared/mainFrame"));

const SleepExperience: NextPage = () => {
  return (
    <MainFrame>
      <Head>
        <title>Sommni - Sleep Experience</title>
        <meta name="description" content="Sommni - Sleep Experience" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>Sleep experience page</p>
    </MainFrame>
  );
};

export default SleepExperience;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};
