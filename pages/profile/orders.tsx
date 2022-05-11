import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AlertCard from "../../components/shared/alertCard";
import Loading from "../../components/shared/loading";
import MainFrame from "../../components/shared/mainFrame";
import PageHead from "../../components/shared/pageHead";
import TitleSection from "../../components/shared/titleSection";
import { decrypt } from "../../lib/cryptojs";
import { customerOrders } from "../../lib/shopify";
import { TMetafield } from "../../types";

const Orders: NextPage = () => {
  const [hasCookie, setHasCookie] = useState<boolean | null>(null);
  const [orders, setOrders] = useState<any>([]);
  const [cookies, setCookie, removeCookie] = useCookies(["login"]);
  const [usertoken, setUsertoken] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<any>();

  useEffect(() => {
    const abortCont = new AbortController();
    const getData = async (token: string) => {
      const res = await customerOrders(token, abortCont);
      console.log(res);
      if (res.errors || res === null) {
        setOrderError(res);
      } else if (res.orders.edges.length > 0) {
        setOrders(res.orders.edges.reverse());
      } else {
        setHasCookie(false);
      }
    };

    if (cookies.login) {
      setHasCookie(true);
      const decryptedID = decrypt(cookies.login);
      if (decryptedID) {
        const cleanedID = decryptedID.replace(/['"]+/g, "");
        getData(cleanedID);
        setUsertoken(cleanedID);
      }
    } else {
      setHasCookie(false);
    }
  }, []);
  return (
    <MainFrame>
      <PageHead title="My Orders - Sommni" />
      <TitleSection title={"My Orders"} />
      {orderError ? (
        <AlertCard errors={orderError} />
      ) : (
        <>
          {orders ? (
            orders.length > 0 ? (
              <OrderItem orderItems={orders} />
            ) : (
              <>
                <Group
                  direction="column"
                  position="center"
                  style={{ minHeight: "48vh", justifyContent: "center" }}
                >
                  <Text size="xl" color="gray" weight={500}>
                    You don't have any order yet. Check out our products here
                    and shop!
                  </Text>
                  <Link href={"/products"} passHref>
                    <Button component="a">Our Products</Button>
                  </Link>
                </Group>
              </>
            )
          ) : (
            <Loading />
          )}
        </>
      )}
    </MainFrame>
  );
};

interface OrderItemProps {
  orderItems: any;
}

const OrderItem: FC<OrderItemProps> = ({ orderItems }) => {
  return (
    <Group direction="column" style={{ paddingBottom: "4rem" }} spacing="md">
      {orderItems.map((item: any) => {
        const orderDate = new Date(item.node.processedAt).toLocaleDateString(
          "en-SG",
          { day: "numeric", month: "long", year: "numeric" }
        );
        return (
          <Card key={item.node.id} shadow={"sm"} style={{ width: "100%" }}>
            <Group position="apart">
              <Text color="gray">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>Order {item.node.name}</span>
                  <span>{orderDate}</span>
                </div>
              </Text>
              <div>
                {item.node.edited && <Badge color="yellow">Edited</Badge>}
              </div>
            </Group>
            <LineItems items={item.node.lineItems.edges} />
            <Group position="apart">
              <div>
                <Text>Total Price</Text>
                <Text weight={700}>
                  {item.node.totalPriceV2.currencyCode}{" "}
                  {item.node.totalPriceV2.amount}
                </Text>
              </div>
              {item.node.successfulFulfillments.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Text
                    color="gray"
                    size="sm"
                    style={{ marginRight: "0.5rem" }}
                  >
                    {item.node.successfulFulfillments[0].trackingCompany}
                  </Text>
                  <Button>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={
                        item.node.successfulFulfillments[0].trackingInfo[0].url
                      }
                    >
                      Track
                    </a>
                  </Button>
                </div>
              ) : (
                <Button disabled>Track</Button>
              )}
            </Group>
          </Card>
        );
      })}
    </Group>
  );
};

interface OrderStatusBadgeProps {
  cancelReason?: null | string;
  canceledAt?: null | string;
  financialStatus: string;
  fulfillmentStatus: string;
  metafield: null | TMetafield;
}

const OrderStatusBadge: FC = () => {
  return <Badge variant="filled"></Badge>;
};

type TLineItem = {
  node: {
    currentQuantity: number;
    discountedTotalPrice: {
      amount: number;
      currencyCode: number;
    };
    originalTotalPrice: {
      amount: number;
      currencyCode: number;
    };
    quantity: number;
    title: string;
    variant: {
      availableForSale: boolean;
      currentlyNotInStock: boolean;
      id: string;
      image: {
        url: string;
      };
      priveV2: {
        amount: number;
        currencyCode: number;
      };
      title: string;
    };
  };
};

interface LineItemProps {
  items: TLineItem[];
}

const LineItems: FC<LineItemProps> = ({ items }) => {
  return (
    <div style={{ padding: "1rem 0" }}>
      {items && (
        <>
          {items.map((item) => {
            return (
              <Group key={item.node.variant.id} style={{ padding: "0.5rem 0" }}>
                <Image
                  src={item.node.variant.image.url}
                  width="70px"
                  height="70px"
                  radius={5}
                />
                <div>
                  <Text color="gray">
                    {item.node.title} - {item.node.variant.title}
                  </Text>
                  <Text color="gray">
                    {item.node.quantity}{" "}
                    {`item${item.node.quantity > 1 ? "s" : ""}`}
                  </Text>
                </div>
              </Group>
            );
          })}
        </>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};

export default Orders;
