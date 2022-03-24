import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import dynamic from "next/dynamic";
import Head from "next/head";

const MainFrame = dynamic(() => import("../../components/shared/mainFrame"));
const ComingSoon = dynamic(() => import("../../components/shared/comingSoon"));

const Pillow: NextPage = () => {
  return (
    <MainFrame signUp={false}>
      <Head>
        <title>Sommni - Pillow Coming Soon</title>
        <meta name="description" content="Sommni - Pillow Coming Soon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ComingSoon />
    </MainFrame>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};

export default Pillow;
