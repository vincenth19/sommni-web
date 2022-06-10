import { Group, List, Text, ThemeIcon, Title } from "@mantine/core";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { RiCheckLine } from "react-icons/ri";

const PageHead = dynamic(() => import("../components/shared/pageHead"));
const TitleSection = dynamic(() => import("../components/shared/titleSection"));

const AboutUs: NextPage = () => {
  return (
    <>
      <PageHead title="About Us - Sommni" />
      <TitleSection title={"About Us"} />
      <Group
        position="center"
        spacing={"xl"}
        style={{ minHeight: "48vh", padding: "4rem 0", textAlign: "center" }}
      >
        <Group
          direction="column"
          position="center"
          style={{ paddingBottom: "4rem" }}
        >
          <h2>Our Story</h2>
          <Text align="center">
            Sommni Bedding by Domus Concept (Asia) Sdn Bhd With humble
            beginnings since 2013, Domus Concept is a mattress manufacturer
            based in Malaysia that specialises in OEM export mattresses. Our
            facility is located in Negeri Sembilan, on a 200,000 sq ft land
            where we manufacture and export mattresses to many of our partnering
            clients worldwide. Along the growing demand of B2C Mattresses in
            Malaysia, Domus Concept has taken the initiative to Create a in
            house brand, Sommni. Sommni aims to bring Malaysians nationwide with
            a new generation of comfort by providing excellent crafted
            mattresses that are customarily exported worldwide.
          </Text>
        </Group>
        <Group
          direction="column"
          position="center"
          style={{ paddingBottom: "4rem" }}
        >
          <h2>Our Mission</h2>
          <Text align="center">
            To provide excellent sleep and comfort to everyone at the most
            competitive price point. At Sommni, we aim to produce mattresses at
            the most sustainable and efficient practice and to provide access to
            Sommni mattresses at the most convenient manner to our customers.
          </Text>
        </Group>
        <Group
          direction="column"
          position="center"
          style={{ paddingBottom: "4rem" }}
        >
          <h2>Our Logo</h2>
          <Text align="center">
            Sommni&apos;s logo has been carefully thought after at it represents
            our brand image. Our logo consist of a curve around the piano which
            represents a mattress being rolled before being packaged into our
            Sommni boxes. The piano that it is wrapping symbolises music in
            sleep whereby music plays an important role in easing most people to
            sleep. Finally, the Sommni logo wears a bright blue colour which is
            catchy and modern.
          </Text>
        </Group>
        <Group
          direction="column"
          position="center"
          style={{ paddingBottom: "4rem" }}
        >
          <h2>
            How we made modern day mattress economical through cost-effective
            and sustainable manufacturing
          </h2>
          <Text align="center">
            At Sommni, we have put our blood, sweat and tears into producing the
            most comfortable mattress for our customers. However, all these
            efforts will be wasted if our product is affordable to our customers
            .Without sacrificing the quality and workmanship of our product,
            Sommni has invested heavily on the latest machinery in our
            manufacturing facility. These up to date equipments and machines are
            not only more efficient, but they are more sustainable in terms of
            energy consumption. Moreover, our R&#38;D team are always working on
            ways in reducing waste and saving energy where to date, we have
            successfully implemented several energy saving elements into our
            production lines which includes solar energy. We are also constantly
            exploring new green manufacturing methods in hopes of reducing our
            carbon footprint.
          </Text>
        </Group>
        <Group
          direction="column"
          position="center"
          style={{ paddingBottom: "4rem" }}
        >
          <h2>Where do we source our materials?</h2>
          <Text align="center">
            We believe that all Sommni customers deserve the best. Therefore, we
            only source our materials from the best suppliers in the market. Our
            raw latex materials are strategically sourced from a renowned
            company who extracts their latex sap from trees in the South of
            Peninsular Malaysia. This is because South of Peninsular Malaysia
            houses the best temperature and humidity for latex trees to grow,
            this ultimately produces the best quality latex sap for our 100%
            Natural Latex core used in our mattresses. Further to that, we
            source our other materials from ethically operated factories who not
            only conduct sustainable green manufacturing, but also have fair
            labour practices.
          </Text>
        </Group>
        <Group
          align={"center"}
          direction="column"
          style={{ paddingBottom: "4rem" }}
        >
          <h2>Our Certifications</h2>
          <Text>Sommni as a manufacturer is proudly</Text>
          <List
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <RiCheckLine />
              </ThemeIcon>
            }
          >
            <List.Item>
              Eco Institute Certified for using 100% Natural Latex
            </List.Item>
            <List.Item>
              European ECO certified, no Chlorofluorocarbon (CFC) Used
            </List.Item>
          </List>
        </Group>
      </Group>
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

export default AboutUs;
