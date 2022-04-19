import {
  Group,
  Card,
  Text,
  Button,
  Modal,
  Divider,
  LoadingOverlay,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { RiDeleteBinLine } from "react-icons/ri";
import { useContextData } from "../AppContext";
import AlertCard from "../components/shared/alertCard";
import ModalAddEditAddress from "../components/shared/modalAddEditAddress";
import { decrypt, encrypt } from "../lib/cryptojs";
import { checkoutCreate, getCustomer } from "../lib/shopify";
import {
  screenSizes,
  TCartItem,
  TCustomer,
  TCustomerAddress,
  TCustomerAddressWithNode,
  TLineItem,
} from "../types";
import { AddressBox } from "./profile";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const PageHead = dynamic(() => import("../components/shared/pageHead"));
const TitleSection = dynamic(() => import("../components/shared/titleSection"));
const Loading = dynamic(() => import("../components/shared/loading"));

const Cart: NextPage = () => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies(["login"]);

  const [isLoading, setIsLoading] = useState(true);
  const [hasItem, setHasItem] = useState<boolean | null>(null);
  const [checkoutError, setCheckoutError] = useState<any>();
  const [subtotal, setSubtotal] = useState<any>(0.0);
  const [userToken, setUserToken] = useState<string>("");
  const [loginModal, setLoginModal] = useState(false);
  const [addAddressModal, setAddAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<TCustomerAddress>();
  const [userData, setUserData] = useState<TCustomer | null>(null);
  const [visible, setVisible] = useState(false);

  const router = useRouter();
  const { user, cartItems, cartUpdater } = useContextData();

  const generateLineItems = (items: TCartItem[]) => {
    let lineItems: TLineItem[] = [];
    items.forEach((item) => {
      lineItems.push({ variantId: item.product.id, quantity: item.quantity });
    });

    return lineItems;
  };

  useEffect(() => {
    setIsDesktop(biggerScreen);
  }, [biggerScreen]);

  useEffect(() => {
    // setup prevPage for redirect
    return () => {
      sessionStorage.setItem("prevPage", router.pathname);
      cartUpdater();
    };
  }, []);

  useEffect(() => {
    if (hasItem !== null) {
      setIsLoading(false);
    }
  }, [hasItem]);

  useEffect(() => {
    const abortCont = new AbortController();
    const getData = async (token: string) => {
      const res = await getCustomer(token, abortCont);
      if (res.errors || null) {
        setCheckoutError(res);
      } else if (res.displayName) {
        setUserData(res);
        const encryptedUser = encrypt(res);
        if (encryptedUser) {
          localStorage.setItem("user", encryptedUser);
        }
      }
    };

    if (cookies.login) {
      const decryptedID = decrypt(cookies.login);
      if (decryptedID) {
        const cleanedID = decryptedID.replace(/['"]+/g, "");
        getData(cleanedID);
        setUserToken(cleanedID);
      }
    }

    return () => {
      abortCont.abort();
    };
  }, [cookies.login]);

  useEffect(() => {
    if (cartItems) {
      if (cartItems.length > 0) {
        setHasItem(true);
        if (cartItems.length === 1) {
          setSubtotal(
            (prev: any) =>
              (prev =
                parseFloat(cartItems[0].product.price) * cartItems[0].quantity)
          );
        } else {
          let result = 0;
          for (let i = 0; i < cartItems.length; i++) {
            result =
              result +
              parseFloat(cartItems[i].product.price) * cartItems[i].quantity;
          }
          setSubtotal(result);
        }
      } else {
        setHasItem(false);
      }
    } else {
      setHasItem(false);
    }
  }, [cartItems]);

  return (
    <MainFrame>
      <PageHead title="Cart - Sommni " />
      <div style={{ position: "relative" }}>
        <TitleSection title={"Cart"} />
        <ModalLogin opened={loginModal} setOpened={setLoginModal} />
        <LoadingOverlay visible={visible} />
        {userData && (
          <ModalAddAddress
            opened={addAddressModal}
            setOpened={setAddAddressModal}
            token={userToken}
            setterAddress={setSelectedAddress}
            addresses={userData.addresses.edges}
            selectedAddress={
              selectedAddress?.address1 + selectedAddress?.address2!
            }
          />
        )}

        {isLoading ? (
          <>
            <Loading text="Checking your cart..." />
          </>
        ) : (
          <>
            {checkoutError && <AlertCard errors={checkoutError} />}
            {!isLoading && !hasItem && (
              <Group
                direction="column"
                position="center"
                style={{ minHeight: "48vh", justifyContent: "center" }}
              >
                <Text size="xl" color="gray" weight={500}>
                  Your cart is empty. Check out our products here and shop!
                </Text>
                <Link href={"/products"} passHref>
                  <Button component="a">Our Products</Button>
                </Link>
              </Group>
            )}
            {!isLoading && hasItem && (
              <Group
                direction={isDesktop ? "row" : "column"}
                style={{
                  alignItems: "start",
                  minHeight: "33.4vh",
                  paddingBottom: "2rem",
                }}
              >
                <Card shadow={"sm"} style={{ width: "100%" }}>
                  <h2>Your Items</h2>
                  <Group
                    style={{ marginTop: "1rem" }}
                    spacing="xl"
                    direction="column"
                  >
                    {cartItems.map((item) => {
                      return (
                        <CartItem
                          key={item.product.id}
                          item={item}
                          isDesktop={isDesktop}
                        />
                      );
                    })}
                  </Group>
                  <Divider style={{ width: "100%" }} my="sm" />
                  <Group direction="column" position="right" spacing={"xs"}>
                    <Text size="xl">{cartItems.length} item(s)</Text>
                    <Group position="right" spacing={"xs"}>
                      <Text size="md" color="gray">
                        Subtotal:
                      </Text>
                      <Text size="lg" weight={700}>
                        {`${
                          cartItems.length > 0 && cartItems[0].product.currency
                        } ${subtotal}`}
                      </Text>
                    </Group>
                    <Text size="sm" color="gray">
                      Taxes and shipping calculated at checkout
                    </Text>
                    <Button
                      variant="light"
                      onClick={() => {
                        if (user) {
                          setAddAddressModal(true);
                        } else {
                          setLoginModal(true);
                        }
                      }}
                    >
                      Select Address
                    </Button>
                    <Button
                      fullWidth={!isDesktop}
                      disabled={selectedAddress ? false : true}
                      onClick={async () => {
                        // if (sessionStorage.getItem("checkout")) {
                        //   console.log("has checkout");
                        //   const encryptedCheckoutID =
                        //     sessionStorage.getItem("checkout");
                        //   if (encryptedCheckoutID) {
                        //     const decryptCheckoutID =
                        //       decrypt(encryptedCheckoutID);
                        //     if (decryptCheckoutID) {
                        //       const cleanedCheckoutID = decryptCheckoutID.replace(
                        //         /['"]+/g,
                        //         ""
                        //       );
                        //       const lineItems = generateLineItems(cartItems);
                        //       const abortCont = new AbortController();
                        //       const res = await checkoutLineItemsReplace(
                        //         lineItems,
                        //         cleanedCheckoutID,
                        //         abortCont
                        //       );

                        //       if (res.errors || Array.isArray(res)) {
                        //         setCheckoutError(res);
                        //       } else {
                        //         if (res.webUrl) {
                        //           sessionStorage.removeItem("checkout");
                        //           router.push(res.webUrl);
                        //         }
                        //         // router.push(`/checkout`);
                        //       }
                        //     }
                        //   }
                        // } else {
                        if (userData && selectedAddress) {
                          if (userData.defaultAddress) {
                            const lineItems = generateLineItems(cartItems);
                            const abortCont = new AbortController();
                            const res = await checkoutCreate(
                              lineItems,
                              userData.email,
                              abortCont,
                              selectedAddress
                            );
                            if (res.errors || Array.isArray(res)) {
                              setCheckoutError(res);
                            } else {
                              const encryptedCheckoutID = encrypt(res.id);
                              if (encryptedCheckoutID) {
                                sessionStorage.setItem(
                                  "checkout",
                                  encryptedCheckoutID
                                );

                                if (res.webUrl) {
                                  setVisible(true);
                                  router.push(res.webUrl);
                                }
                              }
                            }
                          }
                        }
                      }}
                      // }
                    >
                      Checkout
                    </Button>
                  </Group>
                </Card>
              </Group>
            )}
          </>
        )}
      </div>
    </MainFrame>
  );
};

interface CartItemProps {
  item: TCartItem;
  isDesktop: boolean;
}

const CartItem: FC<CartItemProps> = ({ item, isDesktop }) => {
  const { updateItemQuantity } = useContextData();
  return (
    <Group position="apart" spacing={"xs"} style={{ width: "100%" }}>
      <Group spacing={"xs"} style={{ width: isDesktop ? "75%" : "100%" }}>
        <span style={{ borderRadius: "10px" }}>
          <Image
            src={item.product.imageUrl}
            width={200}
            height={150}
            alt="product thumbnail"
          />
        </span>
        <Text size="lg">{item.product.name}</Text>
      </Group>

      <Group position="apart" style={{ flexGrow: 1 }}>
        <Group>
          <Group>
            <Button
              onClick={() => updateItemQuantity("reduce", item.product.id)}
              disabled={item.quantity === 1}
              compact
              variant="light"
            >
              -
            </Button>
            <Text>{item.quantity}</Text>
            <Button
              onClick={() => updateItemQuantity("add", item.product.id)}
              compact
              variant="light"
              disabled={item.quantity > 9}
            >
              +
            </Button>
          </Group>
          <ModalDeleteItem
            itemID={item.product.id}
            itemName={item.product.name}
          />
        </Group>

        <Text
          weight={700}
          style={{ textAlign: "right" }}
        >{`${item.product.currency} ${item.product.price}`}</Text>
      </Group>
    </Group>
  );
};

interface ModalDeleteItemProps {
  itemName: string;
  itemID: string;
}
const ModalDeleteItem: FC<ModalDeleteItemProps> = ({ itemID, itemName }) => {
  const { updateItemQuantity } = useContextData();
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Modal
        opened={opened}
        withCloseButton
        centered
        onClose={() => setOpened(false)}
        title={`Delete '${itemName}' ?`}
      >
        <Text>Do you want to delete this item?</Text>

        <Group position="right">
          <Button compact variant="subtle" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button
            compact
            variant="subtle"
            color="red"
            onClick={() => {
              updateItemQuantity("delete", itemID);
              setOpened(false);
            }}
          >
            Delete
          </Button>
        </Group>
      </Modal>

      <Button compact variant="subtle" onClick={() => setOpened(true)}>
        <Text size="lg">
          <RiDeleteBinLine />
        </Text>
      </Button>
    </>
  );
};

interface ModalLoginProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const ModalLogin: FC<ModalLoginProps> = ({ opened, setOpened }) => {
  return (
    <>
      <Modal
        opened={opened}
        withCloseButton
        centered
        onClose={() => setOpened(false)}
        title={`Need Sign In`}
      >
        <Group direction="column">
          <Text>
            You need to
            <span style={{ textDecoration: "underline", margin: "0 0.25rem" }}>
              sign in &#38; add an address
            </span>
            in your account before checkout.
          </Text>

          <Link href={"/sign-in"} passHref>
            <Button fullWidth component="a">
              Sign In &#38; Add Address
            </Button>
          </Link>
        </Group>
      </Modal>
    </>
  );
};

interface ModalAddAddressProps {
  addresses: TCustomerAddressWithNode[];
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  token: string;
  selectedAddress: string;
  setterAddress: Dispatch<SetStateAction<TCustomerAddress | undefined>>;
}

const ModalAddAddress: FC<ModalAddAddressProps> = ({
  opened,
  setOpened,
  token,
  addresses,
  selectedAddress,
  setterAddress,
}) => {
  return (
    <>
      <Modal
        opened={opened}
        withCloseButton
        centered
        onClose={() => setOpened(false)}
        title={`Add an Address`}
      >
        {(addresses && addresses.length) > 0 ? (
          <>
            <Group direction="column" spacing={"lg"}>
              {addresses.map((address) => {
                return (
                  <div
                    key={address.node.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25rem",
                      width: "100%",
                    }}
                  >
                    <AddressBox
                      address={address.node}
                      isSelected={
                        address.node.address1 + address.node.address2! ===
                        selectedAddress
                          ? true
                          : false
                      }
                    />
                    <Group>
                      <ModalAddEditAddress
                        address={address.node}
                        token={token}
                        id={address.node.id ? address.node.id : ""}
                      />
                      {address.node.address1 + address.node.address2! !==
                        selectedAddress && (
                        <Button
                          onClick={() => {
                            setterAddress(address.node);
                            const encryptedAddr = encrypt(address.node);
                            sessionStorage.setItem(
                              "selectedAddr",
                              encryptedAddr!
                            );
                            setOpened(false);
                          }}
                          compact
                          variant="subtle"
                        >
                          Select Address
                        </Button>
                      )}
                    </Group>
                  </div>
                );
              })}
              <Group
                style={{ width: "100%", paddingTop: "1.5rem" }}
                position="center"
              >
                <ModalAddEditAddress mode="add" token={token} />
              </Group>
            </Group>
          </>
        ) : (
          <>
            <Group
              direction="column"
              position="center"
              style={{ width: "100%" }}
            >
              <Text align="center">
                You need to have at least an address to proceed to checkout.
              </Text>

              <ModalAddEditAddress
                modalBtnFullWidth={true}
                token={token}
                mode="add"
              />
            </Group>
          </>
        )}
      </Modal>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};

export default Cart;
