import { GetStaticProps, NextPage } from "next";
import { Group, Table, Text } from "@mantine/core";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { screenSizes } from "../types";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const PageHead = dynamic(() => import("../components/shared/pageHead"));
const TitleSection = dynamic(() => import("../components/shared/titleSection"));

type TTableFindingsData = {
  title: string;
  description: string;
};

const tableFindingsData: TTableFindingsData[] = [
  {
    title: "Bacteria and Germs",
    description:
      "A used mattress can be infested with bacteria and germs that are naked to the human eye to ensure that the customer will receive a clean and fresh mattress everytime, Sommni discourages trials",
  },
  {
    title: "Protective Layer",
    description:
      "To ensure that the mattress will not be stained, the customer is required to restlessly keep the mattress clean at all times during the trial, this may result in discomfort and possibly lead to further issues",
  },
  {
    title: "Dirty Mattress",
    description:
      "The customer has no way of telling whether the mattress received is used or brand new, to ensure that the customer will receive a clean and fresh mattress everytime, Sommni discourages trials",
  },
  {
    title: "Body Impression",
    description:
      "Used and refurbished mattresses may have already succumbed to it's previous trial owner's body impression, thus it may create unease and discomfort the its next potential user",
  },
  {
    title: "Bad Odour",
    description:
      "A used mattress can be seen as clean and safe at first glance, but it may contain odour and smell left over by food, dust, sweat, pets, smoke and more. A used mattress can be cleaned and deodorized but it may not solve the issue entirely",
  },
  {
    title: "Allergies",
    description:
      "As different particles will settle onto a used mattress. It's new user may encounter allergy symptoms which may lead to sleep disruption and asthma",
  },
];

type TTableDifferenceData = {
  title: string;
  trial: string;
  guaranteed: string;
};

const tableDifferenceData: TTableDifferenceData[] = [
  {
    title: "Cost",
    trial: "Free",
    guaranteed: "Free",
  },
  {
    title: "Choice",
    trial: "No options",
    guaranteed:
      "Option to skip the experience and purchase the mattress at a more reasonable price",
  },
  {
    title: "Return Time Frame",
    trial: "Not accepted",
    guaranteed: "Not accepted",
  },
  {
    title: "Damages and Stain",
    trial: "Returns are rejected",
    guaranteed: "Returns are accepted",
  },
  {
    title: "Compensation Fee if Damaged",
    trial: "RM300 - RM500",
    guaranteed: "Not Applicable",
  },
  {
    title: "Fees on Return",
    trial: "Free (charge of RM100-RM200 only applicable on second trip)",
    guaranteed: "RM100 for shipping and handling",
  },
  {
    title: "Time Frame of Refund",
    trial: "After arrival of product at warehouse",
    guaranteed: "After arrival of product at warehouse",
  },
  {
    title: "Returned Mattress",
    trial: "Donated, but no way of 100% ensuring that",
    guaranteed:
      "Shredded and Recycled or Refurbished and donated (can be tracked with Sommni Tracking)",
  },
];

const SleepExperience: NextPage = () => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);

  const [isDesktop, setIsDesktop] = useState<boolean>();

  useEffect(() => {
    setIsDesktop(biggerScreen);
  }, [biggerScreen]);

  return (
    <MainFrame>
      <PageHead title="Sleep Experience - Sommni" />
      <TitleSection title={"Sleep Experience"} />
      <Group direction="column" spacing={"xl"} style={{ minHeight: "48vh" }}>
        <Text>
          A free trial has become a trend in the mattress industry lately and we
          heard you! However, with all honesty to our beloved customers we do
          not encourage trials as a tried mattress may carry unwanted germs and
          bacteria.
        </Text>
        <Text>
          Businesses at this field who are doing trials may repack returned
          mattresses to new customers as disposing or donating them would cost
          financially. Alternatively, customers are required to keep the
          original layer of plastic that came with the mattress during their
          free trial, this is very unfortunate and uncomfortable for the
          customer.
        </Text>
        <Text>
          As the customer&apos;s health and safety is at risk, a tried mattress
          should be disposed if returned. To ensure that we protect Mother Earth
          from unwanted waste and to provide our clients with clean and fresh
          mattresses,We regret to inform our esteemed clients that we discourage
          trials for the above reasons.
        </Text>
        <Text>
          Despite the down side, Sommni truly understands the excitement our
          customers have for a trial. Therefore, Sommni has decided to introduce
          a Guaranteed trial where the customer has the option to purchase the
          mattress with a 100 night trial with no complex terms &#38;
          conditions.By preference, customers can also opt to
          <strong>waive</strong> their guaranteed trial for a more reasonable
          price! Don&apos;t forget, we still provide a comprehensive 10 year
          warranty for your Sommni !
        </Text>

        <Group direction="column" style={{ padding: "2rem 0" }}>
          <Group direction="column" position="center" style={{ width: "100%" }}>
            <h2>Why do we discourage trials?</h2>
            <Text align="center" style={{ width: "100%" }}>
              How sure are you that a tried mattress is not recycled and sold to
              a new customer? How do you ensure that the mattress you are
              receiving is fresh and new?
            </Text>
          </Group>
          <Text align="center" style={{ width: "100%" }}>
            We have listed our findings
          </Text>
          <Table>
            <tbody>
              {tableFindingsData.map((list) => {
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
        </Group>

        <Group direction="column" position="center">
          <h2>
            Difference between 100 Nights Trial and Sommni&apos;s 100 Nights
            Guaranteed Experience
          </h2>
          <Table>
            <thead>
              <td></td>
              <td>100 Nights Trial</td>
              <td>Sommni&apos;s 100 Nights Guaranteed Experience</td>
            </thead>
            <tbody>
              {tableDifferenceData.map((data) => {
                return (
                  <tr key={data.title}>
                    <td>
                      <h3>{data.title}</h3>
                    </td>
                    <td>{data.trial}</td>
                    <td>{data.guaranteed}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Group>
      </Group>
    </MainFrame>
  );
};

export default SleepExperience;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};
