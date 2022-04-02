import { useState } from "react";
import {
  Drawer,
  Burger,
  useMantineTheme,
  Group,
  Button,
  Box,
} from "@mantine/core";
import { TNavLink } from "../../../types";
import { useTranslation } from "next-i18next";
import Image from "next/image";
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
      path: "/products",
      title: "Products",
      dropdownLinks: [
        {
          path: "/products/mattress",
          title: t("nav-mattress"),
        },
        {
          path: "/products/topper",
          title: t("nav-topper"),
        },
        {
          path: "/products/pillow",
          title: t("nav-pillow"),
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
        title={
          <Link href="/" passHref>
            <Box component="a" style={{ cursor: "pointer" }}>
              <Image
                width="100%"
                height="30vh"
                src="/sommni-blue.png"
                alt="Sommni Logo"
              />
            </Box>
          </Link>
        }
        padding="md"
        size="sm"
      >
        <Group direction="column">
          {NavLinks.map((link, index) => {
            if (!link.dropdownLinks) {
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
                    key={index}
                    path={link.path}
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
