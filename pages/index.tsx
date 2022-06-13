import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Image as MantineImage,
  Text,
  useMantineTheme,
} from "@mantine/core";
import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Image from "next/image";
import { screenSizes, TExtraInfo, TProductOption } from "../types";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import { FC, useEffect, useMemo, useState } from "react";

const AlternatingSections = dynamic(
  () => import("../components/shared/alternatingSections")
);
const WhySection = dynamic(() => import("../components/shared/whySection"));
const PageHead = dynamic(() => import("../components/shared/pageHead"));

const cardItems: TCardItem[] = [
  {
    imagePath: "/100-nights-blue.png",
    title: "Complementary Sleep Trial",
    content:
      "Sommni's guaranteed sleep experience is a 100 nights complementary sleep trial. Through these 100 nights, Malaysians can truly feel and experience The Sommni",
  },
  {
    imagePath: "/better-price-blue.png",
    title: "Better Price",
    content:
      "Sommni provides the option to exclude the guaranteed sleep experience pack. Hence, allowing you to purchase your Sommni at a reasonable price!",
  },
  {
    imagePath: "/purchase.png",
    title: "Upgrade & Worry Free Returns",
    content:
      "Sommni also provides extra nights for your sleep experience pack. Along with the complementary 100 nights, Malaysians may opt for a 125 nights or 150 nights upgrade. If you are not satisfied at the end of your trial, you may return your Sommni for a 100% refund.",
  },
];

const Home: NextPage = () => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isScreenBig, setIsScreenBig] = useState<boolean>();

  const homeInfos: TExtraInfo[] = useMemo(() => {
    return [
      {
        imageURL:
          "https://images.ctfassets.net/uvwd10ivtduz/AcIjMxTc5w29DxUzIf8Q9/a36667abc14279e76e569757e47cc009/trees.png??w=2048&h=1152&q=75&fit=fill&fm=webp",
        title: "About Us",
        content: (
          <>
            <p>
              Under Domnus Concept (Asia) Sdn. Bhd., Sommni was create to cater
              Malaysians.
            </p>
            <p>
              With humble beginning since 2013, Domnus Concept is a mattress
              manufacturer based in Malaysia that specialised in OEM mattress
              &amp; bedding exports. Our facility is located in Mantin, Negeri
              Sembilan on 200,000 sq. ft. land where we manufacture and export
              to many of our partnering clients worldwide.
            </p>
            <Link href="/about-us" passHref>
              <Button
                variant="light"
                fullWidth={isScreenBig ? false : true}
                component="a"
              >
                Learn More
              </Button>
            </Link>
          </>
        ),
      },
      {
        imageURL:
          "https://images.ctfassets.net/uvwd10ivtduz/1B9EVnmF1k4GosTQAXE3sc/070a95a82be0fed9418132b4d22b92ba/DSCF9802.jpg??w=2048&h=1152&q=75&fit=fill&fm=webp",
        title: "Providing Excellent Sleep at the Most Competitive Price",
        content: (
          <>
            <p>
              Sommni is revolutionising the traditional mattress shopping
              experience by eliminating the need of physical mattress store. In
              view of the Coronavirus pandemic in 2019, Sommni has entered the
              online marketplace by making appearance in Lazada and Shopee.
            </p>
            <p>
              Through lengthy research and development process, Sommni has
              specially set out to bring The Sommni to your doorstep by adapting
              the latest technology which allows us to provide Malaysia with
              excellent sleep through a Mattress in a box.
            </p>
          </>
        ),
      },
    ];
  }, [isScreenBig]);

  useEffect(() => {
    setIsScreenBig(biggerScreen);
  }, [biggerScreen]);

  return (
    <div>
      <PageHead title="Sommni Malaysia" />
      <MantineImage
        height={"500px"}
        src="https://www.thespruce.com/thmb/rmDEwUoAgwucuusBRvFoE4JBc0o=/4000x2250/smart/filters:no_upscale()/master-bedroom-in-new-luxury-home-with-chandelier-and-large-bank-of-windows-with-view-of-trees-1222623844-212940f4f89e4b69b6ce56fd968e9351.jpg"
        alt="Swiper Image"
        style={{
          position: "relative",
          width: "99vw",
          left: "calc(-49.55vw + 50%)",
        }}
      />
      <Group direction="column" position="center" style={{ padding: "4rem 0" }}>
        <Divider
          size={"xs"}
          color="gray"
          style={{ width: "100%", textAlign: "center" }}
          label={<h1>9 Years of Manufacturing Experience!</h1>}
          labelPosition="center"
        />

        <p style={{ textAlign: "center" }}>
          For many years, we have focused on OEM exports. <br /> Now, we are
          proud to serve Malaysia for a better sleep!
        </p>
      </Group>
      <div style={{ paddingBottom: "4rem" }}>
        <SingleProductShowcase isDesktop={isScreenBig} />
      </div>
      <div style={{ paddingBottom: "4rem" }}>
        <div
          style={{
            backgroundColor: "#f8f8f8",
            padding: "2rem",
            borderRadius: "10px",
          }}
        >
          <AlternatingSections infos={homeInfos} />
        </div>
      </div>
      <div style={{ paddingBottom: "4rem" }}>
        <WhySection />
      </div>
      <div style={{ paddingBottom: "4rem" }}>
        <SleepExperienceSection
          isScreenBig={isScreenBig}
          cardItems={cardItems}
        />
      </div>
    </div>
  );
};

interface SingleProductShowcaseProps {
  isDesktop: boolean | undefined;
}
const SingleProductShowcase: FC<SingleProductShowcaseProps> = ({
  isDesktop,
}) => {
  return (
    <>
      <Group
        position="center"
        direction="column"
        style={{ paddingBottom: "4rem" }}
      >
        <h1>Best Seller</h1>
        <Text>Time to unlock your goodnight sleep.</Text>
      </Group>
      <div
        style={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <MantineImage
          width={isDesktop ? "45vw" : "100%"}
          alt="single-product-showcase-image"
          height="100%"
          radius={10}
          src="https://images.ctfassets.net/uvwd10ivtduz/35mSXLQVqOQCfKri6Ohm3H/2a29eefe6e8ee262d7db7f3e82c706b8/210621_koala_jballa_ls2_02_lowangle_656_queen.jpeg??w=1920&h=1440&q=75&fit=fill&fm=webp"
        />
        <div style={{ textAlign: isDesktop ? "left" : "center" }}>
          <h2 style={{ paddingBottom: "1.5rem" }}>The Sommni</h2>
          <Text style={{ paddingBottom: "2.5rem" }}>
            Prone to a sensitive back, hip, or joints? Our multi-layered 3 zone
            support helps relieve the pressure, plus, our COOLMAX® Tech helps
            you wake up cool and dry.
          </Text>
          <Link href={"/products/mattress/the-sommni"} passHref>
            <Button size="lg" component="a">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

type TCardItem = {
  title: string;
  content: string;
  imagePath: string;
};
interface SleepExperienceSectionProps {
  isScreenBig: boolean | undefined;
  cardItems: TCardItem[];
}
const SleepExperienceSection: FC<SleepExperienceSectionProps> = ({
  cardItems,
  isScreenBig,
}) => {
  const themes = useMantineTheme();
  return (
    <Box>
      <h1 style={{ textAlign: "center", padding: "2rem 0" }}>
        Sommni&apos;s Guaranteed Sleep Experience
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "stretch",
          gap: "1rem",
          flexDirection: isScreenBig ? "row" : "column",
        }}
      >
        {cardItems.map((item) => {
          return (
            <Card
              key={item.imagePath}
              style={{ width: isScreenBig ? "33%" : "100%" }}
              shadow="sm"
              p="lg"
            >
              <Card.Section>
                <Group
                  position="center"
                  style={{
                    padding: "2rem 0",
                    backgroundColor: themes.colors.brand[0],
                  }}
                >
                  <Image width={100} height={100} src={item.imagePath} />
                </Group>
              </Card.Section>

              <Text
                style={{ color: themes.colors.brand[9], marginTop: "1rem" }}
                weight={500}
              >
                {item.title}
              </Text>

              <Text
                size="sm"
                style={{ lineHeight: 1.5, color: themes.colors.gray[7] }}
              >
                {item.content}
              </Text>
            </Card>
          );
        })}
      </div>
      <Group position="center" style={{ marginTop: "2rem" }}>
        <Link href={"/sleep-experience"} passHref>
          <Button variant="light" fullWidth={!isScreenBig} component="a">
            Learn More
          </Button>
        </Link>
      </Group>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        "common",
        "home",
        "footer",
      ])),
    },
  };
};

export default Home;
