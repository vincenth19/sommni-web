import {
  Group,
  Button,
  MediaQuery,
  useMantineTheme,
  Box,
  // Text,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
// import { RiShoppingCartLine } from "react-icons/ri";
import { useTranslation } from "next-i18next";
// import NavDrawer from "./drawer";
// import UserPopover from "./userPopover";
// import BtnLanguage from "./btnLanguage";
import { TGetProduct, TNavLink } from "../../../types";
import BtnDropdown from "../btnDropdown";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const NavDrawer = dynamic(() => import("./drawer"));

const Navbar = () => {
  const themes = useMantineTheme();
  // const [cartQuantity, setCartQuantity] = useState<number | null>(null);
  const { t } = useTranslation("common");

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const cartItems = localStorage.getItem("cartItem");
  //     if (cartItems) {
  //       const items = JSON.parse(cartItems);
  //       setCartQuantity(items.length);
  //     }
  //   }
  // }, []);

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
                width="100%"
                height="30vh"
                src="/sommni-blue.png"
                alt="Sommni Logo"
              />
            </Box>
          </Link>
        </Group>
        <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
          <Group position="center" spacing="lg">
            {NavLinks.map((link) => {
              if (!link.dropdownLinks) {
                return (
                  <Link href={link.path} key={link.path} passHref>
                    <Button
                      component="a"
                      variant="subtle"
                      style={{ color: themes.colors.brand[9] }}
                    >
                      {link.title}
                    </Button>
                  </Link>
                );
              } else {
                return (
                  <BtnDropdown
                    key={link.path}
                    path={link.path}
                    dropdownTitle={link.title}
                    links={link.dropdownLinks}
                  />
                );
              }
            })}
          </Group>
        </MediaQuery>

        <Group position="right" spacing="xs">
          {/* <UserPopover />
          <Link href={"/cart"} passHref>
            <Button component="a" size="lg" variant="light" compact>
              <RiShoppingCartLine
                style={{ marginRight: cartQuantity ? 10 : 0 }}
              />
              {cartQuantity && (
                <Text
                  color="white"
                  style={{
                    backgroundColor: "crimson",
                    borderRadius: "100%",
                    padding: "0 10px",
                  }}
                >
                  {cartQuantity}
                </Text>
              )}
            </Button>
          </Link> */}
          {/* <BtnLanguage /> */}
        </Group>
      </Group>
    </>
  );
};

export default Navbar;
