import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const PageHead = dynamic(() => import("../components/shared/pageHead"));
const TitleSection = dynamic(() => import("../components/shared/titleSection"));

const SleepExperience: NextPage = () => {
  return (
    <MainFrame>
      <PageHead title="Sleep Experience - Sommni" />
      <TitleSection title={"Sleep Experience"} />
      <div style={{ minHeight: "48vh" }}>
        <p>sleep experience</p>
      </div>
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
