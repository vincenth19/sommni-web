import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("../../components/shared/mainFrame"));
const ComingSoon = dynamic(() => import("../../components/shared/comingSoon"));

const Pillow: NextPage = () => {
  return (
    <MainFrame signUp={false}>
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
