import { Group, MediaQuery, Box, Button, Text, Loader } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
// import BtnLanguage from "./btnLanguage";
import dynamic from "next/dynamic";
import { useContextData } from "../../../AppContext";
import { RiShoppingCartLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { decrypt } from "../../../lib/cryptojs";
import { getCustomer } from "../../../lib/shopify";

const NavDrawer = dynamic(() => import("./drawer"));
const BtnNavLinks = dynamic(() => import("./btnNavLinks"));

const Navbar = () => {
  const { user, totalCart, setUser } = useContextData();
  const [cookies, setCookie, removeCookie] = useCookies(["login"]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (token: string) => {
    const res = await getCustomer(token);
    if (res) {
      setUser(res.displayName);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getData = async (token: string) => {
      const res = await getCustomer(token);
      if (res) {
        setUser(res.displayName);
        setIsLoading(false);
      }
    };

    if (cookies.login) {
      const decryptedID = decrypt(cookies.login);
      if (decryptedID) {
        const cleanedID = decryptedID.replace(/['"]+/g, "");
        getData(cleanedID);
      }
    } else {
      setIsLoading(false);
    }
  }, [cookies.login, setUser]);

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
            <BtnNavLinks />
          </Group>
        </MediaQuery>

        <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
          <Group position="right" spacing="xs">
            {user ? (
              <Link href="/profile" passHref>
                <Button size="md" component="a" compact variant="light">
                  Hi, {user}
                </Button>
              </Link>
            ) : (
              <>
                {isLoading ? (
                  <Loader size={"sm"} />
                ) : (
                  <Link href={"/sign-up"} passHref>
                    <Button component="a" compact variant="light" size="md">
                      Sign Up / Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
            <Link href={"/cart"} passHref>
              <Button component="a" size="md" variant="light" compact>
                <RiShoppingCartLine
                  style={{ marginRight: totalCart ? 10 : 0 }}
                />
                {totalCart !== 0 && <Text>{totalCart}</Text>}
              </Button>
            </Link>
          </Group>
        </MediaQuery>
      </Group>
    </>
  );
};

export default Navbar;
