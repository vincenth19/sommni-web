import { useState } from "react";
import {
  Drawer,
  Burger,
  useMantineTheme,
  Group,
  Box,
  Button,
  Text,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

import dynamic from "next/dynamic";
import { useContextData } from "../../../AppContext";
import { RiShoppingCartLine } from "react-icons/ri";
const BtnNavLinks = dynamic(() => import("./btnNavLinks"));

const NavDrawer = () => {
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close drawer" : "Open drawer";
  const themes = useMantineTheme();

  const { user } = useContextData();

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
        size="md"
      >
        <Group direction="column">
          {user ? (
            <Link href="/profile" passHref>
              <Button size="md" component="a" variant="light">
                Hi, {user}
              </Button>
            </Link>
          ) : (
            <>
              <Link href={"/sign-up"} passHref>
                <Button component="a" variant="light" size="md">
                  Sign Up / Sign In
                </Button>
              </Link>
            </>
          )}
          <BtnNavLinks />
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
