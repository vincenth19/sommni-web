import { Button, Container, Group, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiMailLine } from "react-icons/ri";
import { screenSizes, TFooterLink } from "../../../types";

type TFooterLinkGroup = {
  linkGroup: TFooterLink[];
};

const Footer = () => {
  const themes = useMantineTheme();
  const { t } = useTranslation("footer");
  const FooterLinks: TFooterLinkGroup[] = [
    {
      linkGroup: [
        { title: t("h-product") },
        { path: "/products/mattress", title: t("p-mattress") },
        // { path: "/pillow", title: t("p-pillow") },
        // { path: "/topper", title: t("p-topper") },
        // { path: "/kids", title: t("p-kids") },
      ],
    },
    {
      linkGroup: [
        { title: t("h-company") },
        { path: "/about-us", title: t("c-about-us") },
        // { path: "/instalment", title: t("c-instalment") },
        { path: "/warranty", title: t("c-warranty") },
        { path: "/sleep-experience", title: "Sleep Experience" },
        // { path: "/reviews", title: t("c-reviews") },
        // { path: "/tnc", title: t("c-tnc") },
      ],
    },
    {
      linkGroup: [
        // { title: t("h-support") },
        { path: "/contact-us", title: t("s-contact-us") },
        { path: "/faq", title: t("s-faq") },
        { path: "/tracking", title: t("s-tracking") },
        // { path: "/covid19", title: t("s-covid19") },
      ],
    },
  ];

  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isDesktop, setIsDesktop] = useState<boolean>();

  useEffect(() => {
    setIsDesktop(biggerScreen);
  }, [biggerScreen]);

  return (
    <footer
      style={{
        padding: isDesktop ? 20 : "20px 20px 100px 20px",
        backgroundColor: themes.colors.brand[9],
        color: "white",
      }}
    >
      <Container size="xl">
        <Group position="apart" spacing={"xl"}>
          <div style={{ display: "flex", gap: "2rem" }}>
            {FooterLinks.map((links, index) => (
              <Group direction="column" key={index}>
                {links.linkGroup.map((link) => {
                  if (!link.path) {
                    return (
                      <Text key={link.title} weight="700" transform="uppercase">
                        {link.title}
                      </Text>
                    );
                  } else {
                    return (
                      <Link key={link.path} href={link.path} passHref>
                        <Text component="a" style={{ cursor: "pointer" }}>
                          {link.title}
                        </Text>
                      </Link>
                    );
                  }
                })}
              </Group>
            ))}
          </div>
          <div>
            <Text weight={700}>Sommni Bedding </Text>
            <Text weight={700}>Dommus Concept (Asia) Sdn. Bhd.</Text>
            <Text>
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
          </div>
        </Group>
        <Text color={themes.colors.gray[4]} style={{ marginTop: "30px" }}>
          {t("copyright")}
        </Text>
      </Container>
    </footer>
  );
};

export default Footer;
