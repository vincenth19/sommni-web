import { Button, Card, Group, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FC, useEffect, useState } from "react";
import { useContextData } from "../../AppContext";
import MainFrame from "../../components/shared/mainFrame";
import PageHead from "../../components/shared/pageHead";
import TitleSection from "../../components/shared/titleSection";
import { screenSizes, TCartItem } from "../../types";

const CheckoutPage: NextPage = () => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isDesktop, setIsDesktop] = useState<boolean>();

  useEffect(() => {
    setIsDesktop(biggerScreen);
  }, [biggerScreen]);

  const { cartItems } = useContextData();

  return (
    <MainFrame>
      <PageHead title="Checkout - Sommni " />
      <TitleSection title={"Checkout"} />
      <Group
        direction={isDesktop ? "row" : "column"}
        style={{
          alignItems: "start",
          padding: "3.65rem 0",
        }}
      >
        <Card shadow={"sm"} style={{ width: isDesktop ? "68.7%" : "100%" }}>
          <h2>Your Items</h2>
          <Group style={{ marginTop: "1rem" }} direction="column">
            {cartItems.map((item) => {
              return <CartItem key={item.product.id} item={item} />;
            })}
          </Group>
        </Card>
        <Card
          className={isDesktop ? "" : "mobileBottomButton"}
          shadow={"sm"}
          style={{ width: isDesktop ? "30%" : "100%" }}
        >
          <Group style={{ marginTop: "1rem" }} direction="column">
            <Text size="xl">{cartItems.length} item(s)</Text>
            <Group style={{ width: "100%" }}>
              <Text size="md" color="gray">
                Subtotal:
              </Text>
              <Text size="lg" weight={700}>
                {`${cartItems[0].product.currency} ${cartItems.reduce(
                  //@ts-ignore //the return is not TCartItem, thats why its complaining
                  (prev, current) => {
                    const totalPrev =
                      parseFloat(prev.product.price) * prev.quantity;
                    const totalCurrent =
                      parseFloat(current.product.price) * current.quantity;
                    return totalPrev + totalCurrent;
                  }
                )}`}
              </Text>
              <Button fullWidth>Checkout</Button>
            </Group>
          </Group>
        </Card>
      </Group>
    </MainFrame>
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
            width={300}
            height={200}
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
