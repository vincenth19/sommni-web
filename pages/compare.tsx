import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const PageHead = dynamic(() => import("../components/shared/pageHead"));

const Compare: NextPage = () => {
  return (
    <MainFrame>
      <PageHead title="Compare - Sommni" />
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
