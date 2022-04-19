import { Group, Box, Button, Text, Loader } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
// import BtnLanguage from "./btnLanguage";
import dynamic from "next/dynamic";
import { useContextData } from "../../../AppContext";
import { RiShoppingCartLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { decrypt, encrypt } from "../../../lib/cryptojs";
import { getCustomer } from "../../../lib/shopify";
import { useMediaQuery } from "@mantine/hooks";
import { screenSizes } from "../../../types";

const NavDrawer = dynamic(() => import("./drawer"));
const BtnNavLinks = dynamic(() => import("./btnNavLinks"));

const Navbar = () => {
  const { username, cartItems, setUsername, setUser, cartUpdater } =
    useContextData();
  const [cookies, setCookie, removeCookie] = useCookies(["login"]);

  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.md})`);
  const [isScreenBig, setIsScreenBig] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsScreenBig(biggerScreen);
  }, [biggerScreen]);

  useEffect(() => {
    const abortCont = new AbortController();
    const getData = async (token: string) => {
      const res = await getCustomer(token, abortCont);
      if (res) {
        setUsername(res.displayName);
        const encryptedUser = encrypt(res);
        if (encryptedUser) {
          localStorage.setItem("user", encryptedUser);
          setIsLoading(false);
        }
      }
    };

    if (!username) {
      if (localStorage.getItem("user")) {
        const decryptedUserString = decrypt(localStorage.getItem("user"));
        if (decryptedUserString) {
          const userdata = JSON.parse(decryptedUserString);
          setUsername(userdata.displayName);
          setUser(userdata);
        }
      } else {
        if (cookies.login) {
          const decryptedID = decrypt(cookies.login);
          if (decryptedID) {
            const cleanedID = decryptedID.replace(/['"]+/g, "");
            getData(cleanedID);
          }
        } else {
          setIsLoading(false);
        }
      }
    }

    return () => abortCont.abort();
  }, [cookies.login]);

  useEffect(() => {
    cartUpdater();
  }, []);

  return (
    <>
      <Group
        style={{
          padding: "1rem",
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
        <Group
          position="center"
          spacing="lg"
          style={{ display: isScreenBig ? "block" : "none" }}
        >
          <BtnNavLinks />
        </Group>

        <Group position="right" spacing="xs">
          <Box style={{ display: isScreenBig ? "block" : "none" }}>
            {username ? (
              <Link href="/profile" passHref>
                <Button size="md" component="a" compact variant="light">
                  Hi, {username}
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
          </Box>
          <Link href={"/cart"} passHref>
            <Button component="a" size="md" variant="light" compact>
              <RiShoppingCartLine style={{ marginRight: cartItems && 10 }} />
              <Text>{cartItems && cartItems.length}</Text>
            </Button>
          </Link>
        </Group>
      </Group>
    </>
  );
};

export default Navbar;
