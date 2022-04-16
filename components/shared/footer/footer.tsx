import { Button, Group, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
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
        { path: "/mattress", title: t("p-mattress") },
        { path: "/pillow", title: t("p-pillow") },
        { path: "/topper", title: t("p-topper") },
        // { path: "/kids", title: t("p-kids") },
      ],
    },
    {
      linkGroup: [
        { title: t("h-company") },
        { path: "/about-us", title: t("c-about-us") },
        // { path: "/instalment", title: t("c-instalment") },
        // { path: "/warranty", title: t("c-warranty") },
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
      <Text color={themes.colors.gray[4]} style={{ marginTop: "30px" }}>
        {t("copyright")}
      </Text>
    </footer>
  );
};

export default Footer;
