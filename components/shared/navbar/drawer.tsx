import { useState } from "react";
import { Drawer, Burger, useMantineTheme, Group, Box } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

import dynamic from "next/dynamic";
const BtnNavLinks = dynamic(() => import("./btnNavLinks"));

const NavDrawer = () => {
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close drawer" : "Open drawer";
  const themes = useMantineTheme();

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
