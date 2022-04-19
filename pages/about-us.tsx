import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const PageHead = dynamic(() => import("../components/shared/pageHead"));
const TitleSection = dynamic(() => import("../components/shared/titleSection"));

const AboutUs: NextPage = () => {
  return (
    <MainFrame>
      <PageHead title="About Us - Sommni" />
      <TitleSection title={"About Us"} />
      <div style={{ minHeight: "48vh" }}>
        <p>about us</p>
      </div>
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
