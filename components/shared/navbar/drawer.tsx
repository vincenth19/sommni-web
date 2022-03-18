import { useState } from "react";
import { Drawer, Burger, useMantineTheme, Text, Group } from "@mantine/core";
import { TNavLink } from "../../../types";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const NavDrawer = () => {
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close drawer" : "Open drawer";
  const themes = useMantineTheme();

  const { t } = useTranslation("common");

  const NavLinks: TNavLink[] = [
    {
      path: "/",
      title: t("nav-home"),
    },
    {
      path: "/mattress",
      title: t("nav-mattress"),
    },
    {
      path: "/pillow",
      title: t("nav-pillow"),
    },
    {
      path: "/topper",
      title: t("nav-topper"),
    },
    {
      path: "/faq",
      title: t("nav-faq"),
    },
    {
      path: "/compare",
      title: t("nav-compare"),
    },
    {
      path: "/tracking",
      title: t("nav-tracking"),
    },
  ];

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Sommni"
        padding="md"
        size="sm"
      >
        <Group direction="column">
          {NavLinks.map((link) => (
            <Link href={link.path} key={link.path}>
              <Text
                weight={500}
                style={{ color: themes.colors.brand[9], cursor: "pointer" }}
              >
                {link.title}
              </Text>
            </Link>
          ))}
        </Group>
      </Drawer>

      <Burger
        color={themes.colors.brand[9]}
        opened={opened}
        onClick={() => setOpened((o) => !o)}
        title={title}
      />
    </>
  );
};

export default NavDrawer;
