import { Button, Group, Stepper, Table } from "@mantine/core";
import { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import MainFrame from "../components/shared/mainFrame";
import PageHead from "../components/shared/pageHead";
import { BiPackage } from "react-icons/bi";
import { BsFillCartCheckFill, BsSearch, BsCheckCircle } from "react-icons/bs";
import {
  MdPrecisionManufacturing,
  MdOutlineLocalShipping,
} from "react-icons/md";
import { GiFactory } from "react-icons/gi";
import TitleSection from "../components/shared/titleSection";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import { screenSizes } from "../types";
import StepperTracking from "../components/shared/stepperTracking";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type TTableTrackingInfo = {
  title: string;
  description: string;
};

const tableTrackingInfo: TTableTrackingInfo[] = [
  {
    title: "Order Placed",
    description:
      "Your order has been successfully placed online and our production team has taken notice of your order.",
  },
  {
    title: "Manufacturing",
    description:
      "Your Sommni's raw materials are being manufactured. This is namely Sommni's 100% Certified Natural Latex that's cooking in the oven.",
  },
  {
    title: "Assembly",
    description:
      "Your Sommni is being assembled. At this stage, the Sommni team is layering up the comforts in your mattress and sealing it up with its cover.",
  },
  {
    title: "Quality Control Check",
    description:
      "A thorough QC check is being conducted on your Sommni to ensure the highest expected quality before delivery.",
  },
  {
    title: "Packing",
    description:
      "Your Sommni is being vacuum packed and rolled into the shipping box. Right after, you Sommni will be stored in our warehouse while it awaits its ride to your home",
  },
  {
    title: "Shipping",
    description:
      "At this stage, our delivery partner has picked up your Sommni and is set to deliver your new mattress. A tracking number of our delivery partner will be attached with Sommni Tracking",
  },
  {
    title: "Successfully Delivered",
    description:
      "YAY! You have finally received your long awaited Sommni and you're set out on your journey to discover your newly found comfort",
  },
];

const Tracking: NextPage = () => {
  const [active, setActive] = useState(-1);
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isScreenBig, setIsScreenBig] = useState<boolean>();

  useEffect(() => {
    setIsScreenBig(biggerScreen);
  }, [biggerScreen]);

  return (
    <MainFrame>
      <PageHead title="Tracking - Sommni" />
      <TitleSection title={"Tracking"} />
      <StepperTracking defaultActive={-1} />
      <Group position="center" style={{ padding: "4rem 0" }}>
        <h2>What are the 7 stages of Sommni Tracking?</h2>
        <Table>
          <tbody>
            {tableTrackingInfo.map((list) => {
              return (
                <tr key={list.title}>
                  <td>
                    <h3>{list.title}</h3>
                  </td>
                  <td>{list.description}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Link href={"/profile/orders"} passHref>
          <Button fullWidth={!isScreenBig} component="a">
            Track My Orders
          </Button>
        </Link>
      </Group>
    </MainFrame>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};

export default Tracking;
