import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("../../components/shared/mainFrame"));

const Mattress: NextPage = () => {
  return (
    <MainFrame>
      <p>mattress</p>
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

export default Mattress;
