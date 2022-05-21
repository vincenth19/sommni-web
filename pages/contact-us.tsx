import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainFrame from "../components/shared/mainFrame";
import PageHead from "../components/shared/pageHead";
import TitleSection from "../components/shared/titleSection";

const ContactUs: NextPage = () => {
  return (
    <MainFrame>
      <PageHead title="Contact Us - Sommni" />
      <TitleSection title={"Contact Us"} />
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

export default ContactUs;
