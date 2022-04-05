import { Accordion, Text, Group, Select, Box } from "@mantine/core";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { FC, useEffect, useState } from "react";
import { TAccordionItem } from "../types";

import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
interface IFaqData extends FaqCategoryProps {
  value: string;
}

const FaqData: IFaqData[] = [
  {
    value: "order_shipping",
    category: "Orders & Shipping",
    categoryItems: [
      {
        label: "When can I expect to receive my order?",
        content: `Within Klang Valley, you will receive your delivery the next day or you could schedule it at another date. 
        From Monday to Saturday, 9 a.m. to 6 p.m.
        For the rest of West Malaysia, you will receive your delivery in 2-5 working days.
        For East Malaysia, the delivery is still completely free and you will receive your delivery in 25-30 working days. 
        You could also opt for the express, paid air freight delivery, which takes 5-9 working days. 
        `,
      },
      {
        label: "How will my item(s) be delivered?",
        content: `For deliveries within Klang Valley, your item will be delivered to your doorstep by LALAMOVE. 
Deliveries to the rest of West Malaysia will be handled and delivered by GDEX.
For deliveries to East Malaysia, you can track the status of your delivery by contacting our customer support team. 
The mattress weighs around 18 to 35 KG depending on the size. If you think you'll struggle with carrying it, we recommend inviting someone over to help.
        `,
      },
    ],
  },
  {
    value: "trial",
    category: "Trial & Returns",
    categoryItems: [
      {
        label: "How do I return the mattress?",
        content: `You can initiate the return with our customer service team at support@sommni.com. Please provide us your full name, order number and product.`,
      },
    ],
  },
  {
    value: "mattress",
    category: "Mattress",
    categoryItems: [
      {
        label: "How can I clean the mattress?",
        content: `We recommend spot cleaning using a slightly-damp cleaning cloth and air-dry it naturally or using a blow dryer on low heat settings.
        `,
      },
    ],
  },
];

type TSelectCategoryOptions = {
  value: string;
  label: string;
};

const Faq: NextPage = () => {
  const [selectCategoryOptions, setSelectCategoryOptions] = useState<
    TSelectCategoryOptions[]
  >([]);

  useEffect(() => {
    let options: TSelectCategoryOptions[] = [];
    FaqData.forEach((element) => {
      options.push({ value: element.value, label: element.category });
    });
    setSelectCategoryOptions((data) => (data = options));
  }, []);

  return (
    <>
      <Head>
        <title>Sommni - FAQ</title>
        <meta name="description" content="Sommni - FAQ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainFrame>
        <Group
          position="center"
          direction="column"
          style={{ height: "30vh", justifyContent: "center" }}
        >
          <h1 style={{ margin: 0 }}>FAQ</h1>
          <Select
            placeholder="Select a Category"
            data={selectCategoryOptions}
            style={{ minWidth: "40vw" }}
            onChange={(val) => {
              if (val !== null) {
                let element = document.getElementById(val);
                let headerOffset = 50;
                let elementPosition;
                if (element) {
                  elementPosition = element.getBoundingClientRect().top;
                  let offsetPosition =
                    elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }
            }}
          />
        </Group>
        {FaqData.map((data) => (
          <FaqCategory
            value={data.value}
            category={data.category}
            categoryItems={data.categoryItems}
            key={data.value}
          />
        ))}
      </MainFrame>
    </>
  );
};

interface FaqCategoryProps {
  value: string;
  category: string;
  categoryItems: TAccordionItem[];
}

const FaqCategory: FC<FaqCategoryProps> = ({
  category,
  categoryItems,
  value,
}) => {
  const items = categoryItems.map((item) => (
    <Accordion.Item label={item.label} key={item.label}>
      <Text size="md" color="gray" style={{ whiteSpace: "pre-line" }}>
        {item.content}
      </Text>
    </Accordion.Item>
  ));

  return (
    <Box style={{ padding: "1rem 0" }} id={value}>
      <h3>{category}</h3>
      <Accordion iconPosition="right" multiple>
        {items}
      </Accordion>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};

export default Faq;
