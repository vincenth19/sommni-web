import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import MainFrame from "../components/shared/mainFrame";

const AboutUs: NextPage = () => {
  return (
    <MainFrame>
      <Head>
        <title>Sommni - About Us</title>
        <meta name="description" content="Sommni - About Us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>about us</p>
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

export default AboutUs;
