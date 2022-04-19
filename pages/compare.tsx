import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const PageHead = dynamic(() => import("../components/shared/pageHead"));
const TitleSection = dynamic(() => import("../components/shared/titleSection"));

const Compare: NextPage = () => {
  return (
    <MainFrame>
      <PageHead title="Compare - Sommni" />
      <TitleSection title={"Compare"} />
      <div style={{ minHeight: "48vh" }}>
        <p>compare page</p>
      </div>
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
