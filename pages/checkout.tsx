import {
  Button,
  Card,
  Divider,
  Group,
  Loader,
  Modal,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useContextData } from "../AppContext";
import MainFrame from "../components/shared/mainFrame";
import PageHead from "../components/shared/pageHead";
import TitleSection from "../components/shared/titleSection";
import {
  screenSizes,
  TCartItem,
  TCustomer,
  TCustomerAddress,
  TCustomerAddressWithNode,
} from "../types";
import { decrypt, encrypt } from "../lib/cryptojs";
import { AddressBox } from "./profile";
import Link from "next/link";
import ModalAddEditAddress from "../components/shared/modalAddEditAddress";
import { useCookies } from "react-cookie";
import { checkoutShippingAddressUpdateV2, getCustomer } from "../lib/shopify";
import AlertCard from "../components/shared/alertCard";

const CheckoutPage: NextPage = () => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isDesktop, setIsDesktop] = useState<boolean>();
  const [token, setToken] = useState("");
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [subtotal, setSubtotal] = useState<any>(0.0);
  const [SST, setSST] = useState<any>(0.0);
  const [grandTotal, setGrandTotal] = useState<any>(0.0);
  const [currentAddress, setCurrentAddress] = useState<TCustomerAddress>();
  const [userData, setUserData] = useState<TCustomer | null>(null);
  const [checkoutError, setCheckoutError] = useState<any>();
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);

  const [cookies] = useCookies(["login"]);
  const { cartItems } = useContextData();

  useEffect(() => {
    const abortCont = new AbortController();
    const getData = async (token: string) => {
      const res = await getCustomer(token, abortCont);
      if (res) {
        if (res.errors || Array.isArray(res)) {
          setCheckoutError(res);
        } else if (res.displayName) {
          setUserData(res);
          if (!currentAddress) {
            if (sessionStorage.getItem("selectedAddr")) {
              const decryptedAddr = decrypt(
                sessionStorage.getItem("selectedAddr")
              );
              if (decryptedAddr) {
                setCurrentAddress(JSON.parse(decryptedAddr));
              } else {
                setCurrentAddress(res.defaultAddress);
              }
            } else {
              setCurrentAddress(res.defaultAddress);
            }
          }

          if (checkoutId && currentAddress) {
            setIsUpdatingAddress(true);
            const updateRes = await checkoutShippingAddressUpdateV2(
              checkoutId,
              currentAddress,
              abortCont
            );

            if (updateRes.errors || Array.isArray(updateRes)) {
              setCheckoutError(updateRes);
            } else {
              setIsUpdatingAddress(false);
            }
          }
        }
      }
    };

    if (cookies.login) {
      const decryptedID = decrypt(cookies.login);
      if (decryptedID) {
        const cleanedID = decryptedID.replace(/['"]+/g, "");
        setToken(cleanedID);
        getData(cleanedID);
      }
    }
    return () => {
      abortCont.abort();
    };
  }, [currentAddress, checkoutId]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      if (cartItems.length === 1) {
        const result =
          parseFloat(cartItems[0].product.price) * cartItems[0].quantity;
        setSubtotal(result);
        //@ts-ignore
        const tax = result * 0.06;
        //@ts-ignore
        const total = result + tax;
        setSST(tax);
        setGrandTotal(total);
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
        //@ts-ignore
        const tax = result * 0.06;
        //@ts-ignore
        const total = result + tax;
        setSubtotal(result);
        setSST(tax);
        setGrandTotal(total);
      }
    }
  }, [cartItems]);

  useEffect(() => {
    setIsDesktop(biggerScreen);
  }, [biggerScreen]);

  useEffect(() => {
    if (sessionStorage.getItem("checkout")) {
      const encryptedCheckoutID = sessionStorage.getItem("checkout");
      if (encryptedCheckoutID) {
        const decryptCheckoutID = decrypt(encryptedCheckoutID);
        if (decryptCheckoutID) {
          const cleanedCheckoutID = decryptCheckoutID.replace(/['"]+/g, "");
          setCheckoutId(cleanedCheckoutID);
        }
      }
    }
  }, []);

  return (
    <MainFrame>
      <PageHead title="Checkout - Sommni " />
      <TitleSection title={"Checkout"} />
      {checkoutError && <AlertCard errors={checkoutError} />}
      {cartItems ? (
        <>
          <Group
            direction={isDesktop ? "row" : "column"}
            style={{
              alignItems: "start",
              padding: "3.65rem 0",
            }}
          >
            <Group
              direction="column"
              style={{ width: isDesktop ? "68.7%" : "100%" }}
            >
              {currentAddress && (
                <Card shadow="sm" style={{ width: "100%" }}>
                  <h3 style={{ marginBottom: "1rem" }}>Address</h3>
                  <AddressBox address={currentAddress} isDefault={false} />
                  {userData && (
                    <ModalChangeAddress
                      addresses={userData.addresses.edges}
                      setterAddress={setCurrentAddress}
                      selectedAddress={
                        currentAddress.address1 + currentAddress.address2!
                      }
                      token={token}
                    />
                  )}
                </Card>
              )}
              <Card shadow={"sm"} style={{ width: "100%" }}>
                <h3>Items</h3>
                <Group style={{ marginTop: "1rem" }} direction="column">
                  {cartItems.map((item) => {
                    return <CartItem key={item.product.id} item={item} />;
                  })}
                </Group>
              </Card>
            </Group>
            <Card shadow={"sm"} style={{ width: isDesktop ? "30%" : "100%" }}>
              <Group direction="column">
                <Text size="xl">
                  {cartItems.length} {`item${cartItems.length > 1 ? "s" : ""}`}
                </Text>
                <Group style={{ width: "100%" }} position="apart">
                  <Text size="md" color="gray">
                    Subtotal:
                  </Text>
                  <Text size="lg" weight={700}>
                    {`${
                      cartItems &&
                      cartItems.length > 0 &&
                      cartItems[0].product.currency
                    } ${subtotal}`}
                  </Text>
                </Group>
                <Group style={{ width: "100%" }} position="apart">
                  <Text size="md" color="gray">
                    Shipping:
                  </Text>
                  <Text size="lg" weight={700} color="teal">
                    Free
                  </Text>
                </Group>
                <Group style={{ width: "100%" }} position="apart">
                  <Text size="md" color="gray">
                    SST (6%):
                  </Text>
                  <Text size="lg" weight={700}>
                    {`${
                      cartItems &&
                      cartItems.length > 0 &&
                      cartItems[0].product.currency
                    } ${SST}`}
                  </Text>
                </Group>
                <Divider size={"sm"} style={{ width: "100%" }} />
                <Group style={{ width: "100%" }} position="apart">
                  <Text size="md" color="gray">
                    Grand Total:
                  </Text>
                  <Text size="lg" weight={700}>
                    {`${
                      cartItems &&
                      cartItems.length > 0 &&
                      cartItems[0].product.currency
                    } ${grandTotal}`}
                  </Text>
                </Group>
                <Button disabled={isUpdatingAddress} fullWidth>
                  {isUpdatingAddress ? (
                    <Group>
                      <Loader size={"xs"} />
                      <Text color="gray">Updating your address...</Text>
                    </Group>
                  ) : (
                    "Proceed to Payment"
                  )}
                </Button>
              </Group>
            </Card>
          </Group>
        </>
      ) : (
        <>
          <Group
            position="center"
            direction="column"
            style={{ minHeight: "51vh", justifyContent: "center" }}
          >
            <Text>
              You don't have item in your cart. Shop to get your products!
            </Text>
            <Link href={"/products"} passHref>
              <Button component="a">Go to Products</Button>
            </Link>
          </Group>
        </>
      )}
    </MainFrame>
  );
};

interface ModalChangeAddressProps {
  addresses: TCustomerAddressWithNode[];
  selectedAddress: string;
  token: string;
  setterAddress: Dispatch<SetStateAction<TCustomerAddress | undefined>>;
}

const ModalChangeAddress: FC<ModalChangeAddressProps> = ({
  addresses,
  selectedAddress,
  token,
  setterAddress,
}) => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Modal
        opened={opened}
        withCloseButton
        centered
        onClose={() => setOpened(false)}
        title={`Change Address`}
      >
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
                        sessionStorage.setItem("selectedAddr", encryptedAddr!);
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
      </Modal>

      <Button compact variant="subtle" onClick={() => setOpened(true)}>
        Change Address
      </Button>
    </>
  );
};

interface CartItemProps {
  item: TCartItem;
}

const CartItem: FC<CartItemProps> = ({ item }) => {
  return (
    <Group position="apart" style={{ width: "100%" }}>
      <Group>
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

      <Text
        weight={700}
      >{`${item.product.currency} ${item.product.price}`}</Text>
    </Group>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};

export default CheckoutPage;
