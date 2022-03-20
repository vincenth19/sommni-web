import { useState } from "react";
import { Drawer, Burger, useMantineTheme, Group, Button } from "@mantine/core";
import { TNavLink } from "../../../types";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import BtnDropdown from "../btnDropdown";

const NavDrawer = () => {
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close drawer" : "Open drawer";
  const themes = useMantineTheme();

  const { t } = useTranslation("common");

  const NavLinks: TNavLink[] = [
    { path: "/", title: "Home" },
    { path: "/about-us", title: "About Us" },
    {
      path: "",
      title: "Products",
      dropdownLinks: [
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
      ],
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
      path: "/sleep-experience",
      title: "Sleep Experience",
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
          {NavLinks.map((link) => {
            if (link.path !== "") {
              return (
                <Link href={link.path} key={link.path}>
                  <Button
                    variant="subtle"
                    size="lg"
                    style={{ color: themes.colors.brand[9] }}
                  >
                    {link.title}
                  </Button>
                </Link>
              );
            } else {
              if (link.dropdownLinks) {
                return (
                  <BtnDropdown
                    btnSize={"lg"}
                    dropdownTitle={link.title}
                    links={link.dropdownLinks}
                  />
                );
              }
            }
          })}
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
