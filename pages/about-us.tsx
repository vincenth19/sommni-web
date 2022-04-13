import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const PageHead = dynamic(() => import("../components/shared/pageHead"));

const AboutUs: NextPage = () => {
  return (
    <MainFrame>
      <PageHead title="About Us - Sommni" />
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
