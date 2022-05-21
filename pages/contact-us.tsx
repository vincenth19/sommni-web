import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageHead from "../components/shared/pageHead";
import TitleSection from "../components/shared/titleSection";
import { Container, Group, Text } from "@mantine/core";
import { RiMailLine } from "react-icons/ri";
import Image from "next/image";

const ContactUs: NextPage = () => {
  return (
    <>
      <PageHead title="Contact Us - Sommni" />
      <TitleSection title={"Contact Us"} />
      <Container size={"md"} style={{ padding: "4rem 0" }}>
        <Group position="center" direction="column">
          <Image width={350} height={100} src="/logo-sommni-color.svg" />
          <div>
            <Text align="center" size="xl" weight={700}>
              Sommni Bedding
            </Text>
            <Text align="center" size="xl" weight={700}>
              Dommus Concept (Asia) Sdn. Bhd.
            </Text>
          </div>
          <Text size="xl">
            Lot 1707-1, Sungai Long, Batu 11, Cheras, 43000 Kajang, Selangor
          </Text>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ fontSize: "1.4rem" }}>
              <RiMailLine />
            </p>
            <Text style={{ marginBottom: "8px", marginLeft: "5px" }}>
              <a href="mailto:support@sommni.com">support@sommni.com</a>
            </Text>
          </div>
        </Group>
      </Container>
    </>
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
