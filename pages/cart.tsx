import { Group, Card, Text, Button, Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useContextData } from "../AppContext";
import AlertCard from "../components/shared/alertCard";
import { decrypt, encrypt } from "../lib/cryptojs";
import { checkoutCreate, checkoutLineItemsReplace } from "../lib/shopify";
import { screenSizes, TCartItem, TLineItem } from "../types";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const PageHead = dynamic(() => import("../components/shared/pageHead"));
const TitleSection = dynamic(() => import("../components/shared/titleSection"));
const Loading = dynamic(() => import("../components/shared/loading"));

const Cart: NextPage = () => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasItem, setHasItem] = useState<boolean | null>(null);
  const [checkoutError, setCheckoutError] = useState<any>();
  const [subtotal, setSubtotal] = useState<any>(0.0);
  const [loginModal, setLoginModal] = useState(false);

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
    // console.log(user);
    return () => {
      console.log("unmounting cart");
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
    if (cartItems && cartItems.length > 0) {
      setHasItem(true);
      if (cartItems.length === 1) {
        setSubtotal(
          (prev: any) =>
            (prev =
              parseFloat(cartItems[0].product.price) * cartItems[0].quantity)
        );
      } else {
        const result = cartItems.reduce(
          //@ts-ignore //the return is not TCartItem, thats why its complaining
          (prev, current) => {
            const totalPrev = parseFloat(prev.product.price) * prev.quantity;
            const totalCurrent =
              parseFloat(current.product.price) * current.quantity;
            return totalPrev + totalCurrent;
          }
        );
        setSubtotal(result);
      }
    } else {
      setHasItem(false);
    }
  }, [cartItems]);

  return (
    <MainFrame>
      <PageHead title="Cart - Sommni " />
      <TitleSection title={"Cart"} />
      <Modal
        opened={loginModal}
        withCloseButton
        centered
        onClose={() => setLoginModal(false)}
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
              style={{ minHeight: "45vh", justifyContent: "center" }}
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
              <Card
                shadow={"sm"}
                style={{ width: isDesktop ? "68.7%" : "100%" }}
              >
                <h2>Your Items</h2>
                <Group style={{ marginTop: "1rem" }} direction="column">
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
              </Card>
              <Card
                // className={isDesktop ? "" : "mobileBottomButton"}
                shadow={"sm"}
                style={{ width: isDesktop ? "30%" : "100%" }}
              >
                <Group direction="column">
                  <Text size="xl">{cartItems.length} item(s)</Text>
                  <Group style={{ width: "100%" }}>
                    <Text size="md" color="gray">
                      Subtotal:
                    </Text>
                    <Text size="lg" weight={700}>
                      {`${cartItems[0].product.currency} ${subtotal}`}
                    </Text>
                    <Button
                      fullWidth
                      onClick={async () => {
                        if (sessionStorage.getItem("checkout")) {
                          console.log("has checkout");
                          const encryptedCheckoutID =
                            sessionStorage.getItem("checkout");
                          if (encryptedCheckoutID) {
                            const decryptCheckoutID =
                              decrypt(encryptedCheckoutID);
                            if (decryptCheckoutID) {
                              const cleanedCheckoutID =
                                decryptCheckoutID.replace(/['"]+/g, "");
                              const lineItems = generateLineItems(cartItems);
                              const abortCont = new AbortController();
                              const res = await checkoutLineItemsReplace(
                                lineItems,
                                cleanedCheckoutID,
                                abortCont
                              );

                              if (res.errors || Array.isArray(res)) {
                                setCheckoutError(res);
                              } else {
                                router.push(`/checkout`);
                              }
                            }
                          }
                        } else {
                          console.log("no checkout");
                          if (user) {
                            console.log("has user");
                            if (user.defaultAddress) {
                              const lineItems = generateLineItems(cartItems);
                              const abortCont = new AbortController();
                              const res = await checkoutCreate(
                                lineItems,
                                user.email,
                                abortCont,
                                user.defaultAddress
                              );
                              if (res.errors || Array.isArray(res)) {
                                setCheckoutError(res);
                              } else {
                                const encryptedCheckoutID = encrypt(res);
                                if (encryptedCheckoutID) {
                                  sessionStorage.setItem(
                                    "checkout",
                                    encryptedCheckoutID
                                  );
                                  router.push(`/checkout`);
                                }
                              }
                            } else {
                              console.log("no address user");
                              setLoginModal(true);
                            }
                          } else {
                            console.log("no user");
                            setLoginModal(true);
                          }
                        }
                      }}
                    >
                      Checkout
                    </Button>
                  </Group>
                </Group>
              </Card>
            </Group>
          )}
        </>
      )}
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
      <Group style={{ flexGrow: 1 }}>
        <span style={{ borderRadius: "10px" }}>
          <Image
            src={item.product.imageUrl}
            width={300}
            height={200}
            alt="product thumbnail"
          />
        </span>

        <Group
          direction="column"
          spacing={"xs"}
          style={{ width: isDesktop ? "45%" : "100%" }}
        >
          <Text size="lg">{item.product.name}</Text>
          <Group position="apart" style={{ width: "100%" }}>
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
        </Group>
      </Group>

      <Text
        weight={700}
        style={{ width: isDesktop ? "auto" : "100%", textAlign: "right" }}
      >{`${item.product.currency} ${item.product.price}`}</Text>
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
        Delete
      </Button>
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
