import {
  Group,
  MediaQuery,
  Box,
  // Text,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
// import { RiShoppingCartLine } from "react-icons/ri";
import { useTranslation } from "next-i18next";
// import UserPopover from "./userPopover";
// import BtnLanguage from "./btnLanguage";
import dynamic from "next/dynamic";

const NavDrawer = dynamic(() => import("./drawer"));
const BtnNavLinks = dynamic(() => import("./btnNavLinks"));

const Navbar = () => {
  // const [cartQuantity, setCartQuantity] = useState<number | null>(null);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const cartItems = localStorage.getItem("cartItem");
  //     if (cartItems) {
  //       const items = JSON.parse(cartItems);
  //       setCartQuantity(items.length);
  //     }
  //   }
  // }, []);

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

        {/* <Group position="right" spacing="xs">
          <UserPopover />
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
          </Link>
          <BtnLanguage />
        </Group> */}
      </Group>
    </>
  );
};

export default Navbar;
