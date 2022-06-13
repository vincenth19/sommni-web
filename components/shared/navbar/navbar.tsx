import {
  Group,
  Box,
  Button,
  Text,
  Loader,
  Image as MantineImage,
  Container,
} from "@mantine/core";
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

  const desktop = useMediaQuery(`(min-width: ${screenSizes.xl})`);
  const mobile = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isDesktop, setIsDesktop] = useState<boolean>();
  const [isMobile, setIsMobile] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsDesktop(desktop);
  }, [desktop]);

  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);

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
  }, [cookies.login, username, setUser, setUsername]);

  useEffect(() => {
    cartUpdater();
    // dont add this into the dependency
  }, []);

  return (
    <>
      <InfoBar />
      <Box
        style={{
          boxShadow: "0 2px 30px rgb(0 0 0 / 10%)",
          // padding: "1rem 0",
          position: "sticky",
          top: 0,
          zIndex: 5,
          backgroundColor: "white",
        }}
      >
        <Container size={"xl"} style={{ padding: "1rem" }}>
          <Group position="apart">
            <Group>
              {!isDesktop && <NavDrawer />}

              <Link href="/" passHref>
                <Box component="a" style={{ cursor: "pointer" }}>
                  <Image
                    width={150}
                    height="50%"
                    src="/logo-sommni-color.svg"
                    alt="Sommni Logo"
                  />
                </Box>
              </Link>
            </Group>
            <Group
              position="center"
              spacing="lg"
              style={{ display: isDesktop ? "block" : "none" }}
            >
              <BtnNavLinks />
            </Group>

            <Group position="right" spacing="xs">
              <Box style={{ display: isMobile ? "block" : "none" }}>
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
                  <RiShoppingCartLine
                    style={{ marginRight: cartItems && 10 }}
                  />
                  <Text>{cartItems && cartItems.length}</Text>
                </Button>
              </Link>
            </Group>
          </Group>
        </Container>
      </Box>
    </>
  );
};

const infoText = [
  "100 nights complimentary trial",
  "| 10 years warranty",
  "| 100% certified natural latex",
  "| Free delivery",
];
const InfoBar = () => {
  return (
    <div style={{ backgroundColor: "#4284F3", padding: "5px", color: "white" }}>
      <Group position="center" style={{ gap: "0px" }}>
        {infoText.map((text) => {
          return (
            <Text
              style={{ paddingRight: "5px" }}
              key={text}
              size="sm"
              align="center"
            >
              {text}
            </Text>
          );
        })}
      </Group>
    </div>
  );
};

export default Navbar;
