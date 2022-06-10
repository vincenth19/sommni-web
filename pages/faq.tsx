import { Accordion, Text, Group, Select, Box } from "@mantine/core";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { FC, useEffect, useState } from "react";
import { TAccordionItem } from "../types";

import dynamic from "next/dynamic";

const PageHead = dynamic(() => import("../components/shared/pageHead"));
interface IFaqData extends FaqCategoryProps {
  value: string;
}

const FaqData: IFaqData[] = [
  {
    value: "order_shipping",
    category: "Orders & Shipping",
    categoryItems: [
      {
        label:
          "When Will I receive my Sommni mattress if I place an order now?",
        content: `Your Sommni mattress will be handled by our delivery partners. You can expect to
        receive your Sommni in 2-5 working days (Check East Malaysia)`,
      },
      {
        label: "What Payment methods are accepted?",
        content: `We accept all FPX payments, Visa and Mastercard (check E-wallets and AMEX)`,
      },
      {
        label: "Can I pay for the mattress via installment?",
        content: `IDK`,
      },
      {
        label: "How much does Shipping cost?",
        content: `Shipping is free nationwide. Express shipping for East Malaysia comes at an extra
        cost of XXXX`,
      },
      {
        label: "Do I need to be home in order to receive my delivery?",
        content: `Yes, you would need to be home to receive your Sommni. Alternatively, a family
        member or friend to receive your Sommni on your behalf.`,
      },
      {
        label: "Do I need to unbox the mattress myself?",
        content: `Yes, you would be unboxing the mattress yourself. However, we at Sommni has made
        sure that your unboxing process will be smooth & easy. Please refer to the set up
        instructions included in the box.`,
      },
      {
        label: "How big is the box?",
        content: `The measurements of the box is as below:
        Length: 45cm
        Width: 45cm
        Height: 110cm`,
      },
      {
        label: "Can I pick up the mattress by myself?",
        content: `Unfortunately, all orders will only be shipped via our delivery partners. Self pick-ups
        will be made possible in the near future.`,
      },
      {
        label: "Can my Delivery address be changed after my order is placed?",
        content: `Yes, your delivery address can be changed as long as your item has not been picked up by our delivery partners. Do contact us at XXX for our assistance.`,
      },
      {
        label: "Can you help me dispose my old mattress?",
        content: `Unfortunately, we do not offer mattress disposing service at this given time. Mattress disposing services will be made available in the near future.`,
      },
    ],
  },
  {
    value: "mattress",
    category: "Mattress",
    categoryItems: [
      {
        label: "Do you have a showroom where we can try out the mattress?",
        content: `Sommni currently does not have any showrooms.`,
      },
      {
        label: "What is Sommni's mattress made of?",
        content: `The Sommni is a dual comfort Mattress made of a combination of 100% Natural Latex, PU Foam and Memory Foam (Check out our mattress construction here)`,
      },
      {
        label: "Will my existing sheets fit Sommni's mattress?",
        content: `It depends on the size of your existing sheets, The Sommni's size is designed as standard and it measures out as below:
        
        L x W x H

        Single
        190cm x 90cm x 23cm

        Super Single
        106cm x 90cm x 23cm

        Queen
        190cm x 150cm x 23cm

        King
        190cm x 180cm x 23cm`,
      },
      {
        label: "Do I need to flip the mattress?",
        content: `No, your Sommni does not need to be flipped like a traditional mattress. However, your Sommni is specially designed with dual comfort which allows you to enjoy having a soft mattress on one side and a firm mattress on the other side.`,
      },
      {
        label: "Will my Sommni Mattress sag overtime?",
        content: `Your Sommni is designed to not sag. However, your sommni will succumb to your body impression.`,
      },
      {
        label: "How long can the mattress be kept inside the delivery box?",
        content: `It is recommended that you do not keep your mattress inside the delivery box longer than 5 months from your delivered date to ensure that your mattress expands back to its original shape and form.`,
      },
      {
        label: "Will the mattress feel hot?",
        content: `We have designed the Sommni to be well ventilated by incorporating a pin hole design on our 100% Natural Latex that is used in the mattress. The pinhole design helps with air ventilation, thus cooling down the mattress.`,
      },
      {
        label: "What is the lifespan of Sommni's mattress?",
        content: `The Sommni's lifespan is estimated at 30 years. However, we recommend that you do not use your Sommni Mattress for more than 10 years as bacteria from our human body builds up on the mattress overtime.`,
      },
    ],
  },
  {
    value: "return-warranty",
    category: "Returns & Warranty",
    categoryItems: [
      {
        label: "Do you allow exchanges?",
        content: `All Sommni Mattresses are exchangeable 7 days after delivery if they do not meet our quality guideline. Please contact XXX for further assistance.`,
      },
      {
        label:
          "Do I need to keep the box for the exchange/ warranty claim process?",
        content: `You do not have to keep the box for exchange and warranty claim.`,
      },
      {
        label: "Is there a return fee?",
        content: `All eligible returns are free of charge and delivery will be arranged and covered by Sommni.`,
      },
      {
        label: "Does my Sommni come with warranty and what does it cover?",
        content: `Your Sommni comes with a 10 years comprehensive warranty and it covers all aspects of defects caused by our manufacturing process such as sagging. Please check our warranty policy by clicking here`,
      },
      {
        label: "Does Sommni offer more than a 10 years warranty?",
        content: `No, Sommni only offers a maximum of 10 years warranty on our mattress as we believe that a mattress' lifespan is 10 years where it is best performed.`,
      },
      {
        label: "How do i make a warranty claim?",
        content: `Please contact our customer support XXX for further information and warranty claim process if your Sommni is defective.`,
      },
    ],
  },
  {
    value: "sleep-exp",
    category: "Sommni's Sleep Experience",
    categoryItems: [
      {
        label: `What is Sommni's Sleep Experience, how does it work?`,
        content: `Sommni's Sleep Experience is essentially a mattress testing programme that differs from the trials offered elsewhere. The 100 Night Sommni Sleep Experience is complimentary with your mattress purchase with no complex Terms & Condition.
        
        If you do not feel like you require testing the mattress, you may opt to skip the
        Sleep Experience package and purchase your mattress at a discounted rate.

        For more information, please click here
        `,
      },
      {
        label: `Why does Sommni Discourage Trials?`,
        content: `Sommni strongly discourage trials as tried on mattresses carry unwanted bacteria and germs. With companies offering free trials, there is no guarantee that your mattress has not been tried on by previous users who have opted to return their mattresses. After all, realistically speaking, there's saying that there is no free lunch in this world.

        Check out Sommni's sleep experience here.`,
      },
      {
        label: `When does the 100 Night, 125 Night and 150 Night Sleep Experience Begin?`,
        content: `Your Sommni Sleep experience begins when our delivery partner confirms that your Sommni has been successfully delivered`,
      },
      {
        label: `If I decide to return the mattress after the Sleep experience, do I need to original box?`,
        content: `No, you do not need your original box to return your mattress.`,
      },
      {
        label: `If I decide to return the mattress after the Sleep experience, How do I do it?`,
        content: `If you decide that Sommni is not the mattress for you, please contact XXX for further assistance. 
        
        Please provide your full name and order number. Please note that your return had to be initiated within the Sleep experience time frame, any returns initiated after are not eligible for a refund.`,
      },
      {
        label: `What if my mattress is damaged or stained?`,
        content: `Damaged and stained mattresses are still eligible for a full refund under Sommni's Sleep Experience.`,
      },
      {
        label: `When will I expect my refund after a return?`,
        content: `You can expect to get your refund through your original payment method in 7-10 working days after we have received the returned mattress in our warehouse`,
      },
      {
        label: `What happens to my returned mattress?`,
        content: `Your returned mattress will be recycled and donated to the needy. Sommni has invested in industrial grinding machines to grind down the core materials of the mattress to be repurposed.
        
        With mattresses that are returned in good condition, Sommni will sanitise and replace the cover for it to be donated. Sommni will never deliver a used and tried mattress to a new customer.
        `,
      },
      {
        label: `Am I able to return more than 1 mattress?`,
        content: `Only one mattress return per address is allowed. This ensures that all Sommni customers are treated fairly and nobody takes advantage of our Sleep Experience.`,
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
      <PageHead title="FAQ - Sommni" />
      <>
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
        <div style={{ paddingBottom: "4rem" }}>
          {FaqData.map((data) => (
            <FaqCategory
              value={data.value}
              category={data.category}
              categoryItems={data.categoryItems}
              key={data.value}
            />
          ))}
        </div>
      </>
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
