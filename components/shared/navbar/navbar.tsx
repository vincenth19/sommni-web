import { Group, Button, MediaQuery, useMantineTheme, Box } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { RiShoppingCartLine } from "react-icons/ri";
import { useTranslation } from "next-i18next";
import NavDrawer from "./drawer";
import UserPopover from "./userPopover";
import BtnLanguage from "./btnLanguage";
import { TNavLink } from "../../../types";

const Navbar = () => {
  const themes = useMantineTheme();
  const { t } = useTranslation("common");

  const NavLinks: TNavLink[] = [
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
      <Group
        style={{
          padding: "15px 0",
          position: "sticky",
          top: 0,
          zIndex: 5,
          backgroundColor: "white",
        }}
        position="apart"
      >
        <Group>
          <NavDrawer />
          <Link href="/" passHref>
            <Box component="a" style={{ cursor: "pointer" }}>
              <Image
                width="100vw"
                height="30vh"
                src="/sommni-blue.png"
                alt="Sommni Logo"
              />
            </Box>
          </Link>
        </Group>
        <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
          <Group position="center" spacing="lg">
            {NavLinks.map((link) => (
              <Link href={link.path} key={link.path}>
                <Button
                  variant="subtle"
                  style={{ color: themes.colors.brand[9] }}
                >
                  {link.title}
                </Button>
              </Link>
            ))}
          </Group>
        </MediaQuery>

        <Group position="right" spacing="xs">
          <UserPopover />
          <Button size="lg" variant="subtle" compact>
            <RiShoppingCartLine />
          </Button>
          <BtnLanguage />
        </Group>
      </Group>
    </>
  );
};

export default Navbar;
