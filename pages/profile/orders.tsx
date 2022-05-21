import {
  Accordion,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AlertCard from "../../components/shared/alertCard";
import Loading from "../../components/shared/loading";
import PageHead from "../../components/shared/pageHead";
import TitleSection from "../../components/shared/titleSection";
import { decrypt } from "../../lib/cryptojs";
import { customerOrders } from "../../lib/shopify";

import { useMediaQuery } from "@mantine/hooks";
import { screenSizes } from "../../types";
import StepperTracking, {
  steps,
} from "../../components/shared/stepperTracking";
// import { RiArrowLeftSLine } from "react-icons/ri";
// import { useRouter } from "next/router";

const Orders: NextPage = () => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [hasCookie, setHasCookie] = useState<boolean | null>(null);
  const [orders, setOrders] = useState<any>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["login"]);
  const [usertoken, setUsertoken] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<any>();

  // const router = useRouter();

  useEffect(() => {
    setIsDesktop(biggerScreen);
  }, [biggerScreen]);

  useEffect(() => {
    const abortCont = new AbortController();
    const getData = async (token: string) => {
      const res = await customerOrders(token, abortCont);
      // console.log(res);
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
    <>
      <PageHead title="My Orders - Sommni" />
      {/* <Button onClick={() => router.back()} variant="subtle">
        <Group position="center" spacing={"xs"}>
          <span style={{ marginRight: "0.5rem" }}>
            <RiArrowLeftSLine />
          </span>
          Back
        </Group>
      </Button> */}
      <TitleSection title={"My Orders"} />
      {hasCookie ? (
        <>
          {orderError ? (
            <AlertCard errors={orderError} />
          ) : (
            <>
              {orders ? (
                orders.length > 0 ? (
                  <OrderItem orderItems={orders} isDesktop={isDesktop} />
                ) : (
                  <>
                    <Group
                      direction="column"
                      position="center"
                      style={{ minHeight: "48vh", justifyContent: "center" }}
                    >
                      <Text size="xl" color="gray" weight={500}>
                        You don&amp;t have any order yet. Check out our products
                        here and shop!
                      </Text>
                      <Link href={"/products"} passHref>
                        <Button component="a">Our Products</Button>
                      </Link>
                    </Group>
                  </>
                )
              ) : (
                <Loading text="Getting your orders..." />
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Group
            direction="column"
            position="center"
            style={{ minHeight: "45vh", justifyContent: "center" }}
          >
            <Text size="xl">Please sign in to view your orders</Text>
            <Link href="/sign-in" passHref>
              <Button size="lg" component="a">
                Sign In
              </Button>
            </Link>
          </Group>
        </>
      )}
    </>
  );
};

interface OrderItemProps {
  orderItems: any;
  isDesktop: boolean;
}

const OrderItem: FC<OrderItemProps> = ({ orderItems, isDesktop }) => {
  return (
    <Group direction="column" style={{ paddingBottom: "4rem" }} spacing="md">
      {orderItems.map((item: any) => {
        const orderDate = new Date(item.node.processedAt).toLocaleDateString(
          "en-SG",
          { day: "numeric", month: "long", year: "numeric" }
        );
        const orderTime = new Date(item.node.processedAt).getTime();
        const timeNow = new Date().getTime();
        const diff = Math.abs(timeNow - orderTime) / 3600000;

        let status = "";
        if (item.node.canceledAt) {
          status = "Cancelled";
        } else if (item.node.successfulFulfillments.length > 0) {
          status = "Shipping";
        } else {
          switch (true) {
            case diff >= 12:
              status = "Packing";
              break;
            case diff < 12 && diff >= 9:
              status = "Quality Control Check";
              break;
            case diff < 9 && diff >= 6:
              status = "Assembly";
              break;
            case diff < 6 && diff >= 3:
              status = "Manufacturing";
            case diff < 3:
              status = "Order Placed";
          }
        }

        return (
          <Card key={item.node.id} shadow={"sm"} style={{ width: "100%" }}>
            <Group position="apart">
              <Text color="gray">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>Order {item.node.name}</span>
                  <span>{orderDate}</span>
                </div>
              </Text>
              <Group>
                {item.node.edited && (
                  <Badge variant="filled" color="yellow">
                    Edited
                  </Badge>
                )}
                <OrderStatusBadge
                  canceledAt={item.node.canceledAt}
                  cancelReason={item.node.cancelReason}
                  status={status}
                  financialStatus={item.node.financialStatus}
                />
              </Group>
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
              <Group>
                {item.node.successfulFulfillments.length > 0 ? (
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
                ) : (
                  <>
                    {item.node.financialStatus === "PARTIALLY_PAID" && (
                      <>
                        <Button>
                          <a href={item.node.statusUrl} rel="noreferrer">
                            Complete Payment
                          </a>
                        </Button>
                      </>
                    )}
                  </>
                )}
                <Button variant="light">
                  <a rel="noreferrer" href={item.node.statusUrl}>
                    Order Details
                  </a>
                </Button>
              </Group>
            </Group>
            {!item.node.cancelReason && item.node.financialStatus === "PAID" && (
              <>
                {isDesktop ? (
                  <OrderStatusStepper status={status} />
                ) : (
                  <Accordion>
                    <Accordion.Item label="Order Progress">
                      <OrderStatusStepper status={status} />
                    </Accordion.Item>
                  </Accordion>
                )}
              </>
            )}
          </Card>
        );
      })}
    </Group>
  );
};

interface OrderStatusBadgeProps {
  status: string;
  financialStatus: string;
  cancelReason: null | string;
  canceledAt: null | string;
}

const OrderStatusBadge: FC<OrderStatusBadgeProps> = ({
  status,
  cancelReason,
  canceledAt,
  financialStatus,
}) => {
  const [badgeColor, setBadgeColor] = useState("primary");
  const [cancelDate, setCancelDate] = useState<null | string>();
  useEffect(() => {
    if (cancelReason) setBadgeColor("red");
    if (canceledAt) {
      setCancelDate(
        new Date(canceledAt).toLocaleDateString("en-SG", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    }
  }, [cancelReason, canceledAt]);
  return (
    <Group style={{ alignItems: "baseline" }}>
      {financialStatus !== "PAID" && (
        <Badge variant="filled" color="orange">
          {financialStatus}
        </Badge>
      )}
      {financialStatus !== "REFUNDED" &&
      financialStatus !== "PARTIALLY_PAID" ? (
        <Badge color={badgeColor} variant="filled">
          {status}
        </Badge>
      ) : (
        cancelReason && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Badge color={badgeColor} variant="filled">
              {status} {cancelReason && `: ${cancelReason}`}
            </Badge>
            <Text size="sm" color="gray">
              {cancelDate}
            </Text>
          </div>
        )
      )}
    </Group>
  );
};

interface OrderStatusStepperProps {
  status: string;
}

const OrderStatusStepper: FC<OrderStatusStepperProps> = ({ status }) => {
  const [active, setActive] = useState(1);

  useEffect(() => {
    for (let i = 0; i < steps.length; i++) {
      if (status === "Successfully Delivered" || steps[i].title === status) {
        setActive(i);
        return;
      }
      if (steps[i].title === status) setActive(i - 1);
    }
  }, [status]);
  return (
    <div style={{ padding: "1rem 0" }}>
      <StepperTracking defaultActive={active} />
    </div>
  );
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
                    {item.node.quantity}
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
