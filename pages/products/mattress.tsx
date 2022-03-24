import { FC, isValidElement, ReactElement, useEffect, useState } from "react";
import { Accordion, Box, Button, Group, Text, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DOMPurify from "isomorphic-dompurify";
import dynamic from "next/dynamic";
import { screenSizes, TAccordionItem, TOptionData } from "../../types";

const MainFrame = dynamic(() => import("../../components/shared/mainFrame"));
const Carousel = dynamic(() => import("../../components/product/carousel"));
const InfoSection = dynamic(() => import("../../components/home/infoSection"));
const OptionChips = dynamic(
  () => import("../../components/shared/optionChips")
);
const WhySection = dynamic(() => import("../../components/shared/whySection"));

const slides = [
  "https://images.ctfassets.net/uvwd10ivtduz/6Qg7oy05IqzITZMvX04hJd/b73cf717b7131b983e440bbbc85ee6eb/LS1_Queen.jpg??w=1920&h=1440&q=75&fit=fill&fm=webp",
  "https://images.ctfassets.net/uvwd10ivtduz/2h9vqkwn7BuOayrB4yULRm/1bc4d69a1a4e7734d5eab505d4dc1afe/210621_koala_jballa_ls1_01_hero_427_queen.jpg??w=1920&h=1440&q=75&fit=fill&fm=webp",
  "https://images.ctfassets.net/uvwd10ivtduz/g0DEwjo7QS7uhOYZyrL4s/eb53412c1a707736d9059895dc545398/3._Copy_of_R0552_SK_LS1_Customised_Topper_Queen_NAKED_11576.jpg??w=1920&h=1440&q=75&fit=fill&fm=webp",
  "https://images.ctfassets.net/uvwd10ivtduz/3gLtgQINriL54BVUUJwlRA/dee0751f993d9e9a2dc771c895eca2df/T00742_AU_LS1_MattressQueenAU_Queen_NAKED_24203.jpg??w=1920&h=1440&q=75&fit=fill&fm=webp",
  "https://images.ctfassets.net/uvwd10ivtduz/5YsPp51GQgTjpBL3lZfMUe/c6fd746d4cb6c61471df6a68766c97d5/5._Copy_of_Copy_of_R0551_SK_LS1_Customised_Topper_Queen_NAKED_11583.jpg??w=1920&h=1440&q=75&fit=fill&fm=webp",
  "https://images.ctfassets.net/uvwd10ivtduz/6qGhEZvRLz4KWRt6upjmN5/f40f268e0a1f1f81317960d02981d377/R0571_AU_LS1_MattressQueenAU_Queen_NAKED_11789.jpg??w=1920&h=1440&q=75&fit=fill&fm=webp",
  "https://images.ctfassets.net/uvwd10ivtduz/18b4xSzMHLIdRxQy5co4Un/e431c847c07091bf7d2f47f1658e6b61/LS1_Queen_360174.png??w=1920&h=1440&q=75&fit=pad&fm=webp",
];

const sizeData: TOptionData[] = [
  { value: "single", label: "Single", disable: false },
  { value: "super_single", label: "Super Single", disable: false },
  { value: "queen", label: "Queen", disable: true },
  { value: "king", label: "King", disable: false },
];

const productDescription: ReactElement | HTMLElement = (
  <article>
    <p>
      Crafted by experienced Manufacturers. The Sommni provides Dual Comfort in
      one Mattress for a good night’s sleep.
    </p>
    <h3>Why you'll love The Sommni</h3>
    <ul>
      <li>Dual Comfort, Plush and FIRM in one</li>
      <li>Certified 100% Natural Latex</li>
      <li>Extraordinary 5 Layers of comfort</li>
      <li>10 Years Manufacturer's Warranty</li>
      <li>Flexible trial plan</li>
    </ul>
  </article>
);
const mattressSpecs: TAccordionItem[] = [
  {
    label: "Materials & Certification",
    content: (
      <article>
        <p>
          All our polyurethane foams are CertiPUR-US® certified. They are made
          without ozone-depleting chemicals and phthalates regulated by the
          Consumer Product Safety Commission. The foams have been tested for low
          VOC (Volatile Organic Compound) emissions for indoor air quality (less
          than 0.5 parts per million).
        </p>
        <ul>
          <li>
            Planet-friendly textiles: up to 121 recycled bottles in each cover
          </li>
          <li>
            Top layer of breathable polyurethane foam coated with phase change
            cooling material
          </li>
          <li>Second layer of natural latex</li>
          <li>Third layer of zoned memory foam</li>
          <li>Fourth layer of polyurethane foam with gel pods</li>
          <li>Durable base of polyurethane foam with encased springs</li>
        </ul>
      </article>
    ),
  },
  {
    label: "Weight & Dimension",
    content: (
      <Group spacing={"xl"} direction="column">
        <Group spacing={"xl"}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>Single</strong>
            <Text>90cm W x 190cm L x 15cm H</Text>
            <Text>10 kg</Text>
            <Text>35.43” W x 74.8” L x 5.91” H </Text>
            <Text>22.05 pounds</Text>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>Super Single</strong>
            <Text>106cm W x 190cm L x 15cm H</Text>
            <Text>12 kg</Text>
            <Text>41.73” W x 74.8” L x 5.91” H </Text>
            <Text>24.26 pounds</Text>
          </div>
        </Group>
        <Group spacing={"xl"}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>Queen</strong>
            <Text>9170cm W x 190cm L x 15cm H</Text>
            <Text>13.4 kg</Text>
            <Text>66.93” W x 74.8” L x 5.91” H</Text>
            <Text>29.54 pounds</Text>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>King</strong>
            <Text>180cm W x 190cm L x 15cm H</Text>
            <Text>14 kg</Text>
            <Text>70.87” W x 74.8” L x 5.91” H</Text>
            <Text>30.86 pounds</Text>
          </div>
        </Group>
      </Group>
    ),
  },
];

const Mattress: NextPage = () => {
  const [size, setSize] = useState("single");
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isScreenBig, setIsScreenBig] = useState<Boolean>();

  useEffect(() => {
    setIsScreenBig(biggerScreen);
  }, [biggerScreen]);

  return (
    <MainFrame>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: isScreenBig ? "nowrap" : "wrap",
          gap: isScreenBig ? "1rem" : 0,
          padding: "1rem 0",
        }}
      >
        <Box
          style={{
            maxWidth: isScreenBig ? "45vw" : "100%",
            position: isScreenBig ? "sticky" : "unset",
            top: "4rem",
            zIndex: 2,
            height: "100%",
          }}
        >
          <Carousel slides={slides} />
        </Box>
        <Box>
          <h1 style={{ fontSize: "2.5rem" }}>The Sommni</h1>
          <Group>
            <Text size="xl">RM 1,238</Text>
            <InfoSection />
          </Group>

          <OptionChips
            valueState={size}
            valueSetter={setSize}
            options={sizeData}
          />
          <Button
            fullWidth={isScreenBig ? false : true}
            size="lg"
            style={{ margin: "1rem 0" }}
          >
            Add to Cart
          </Button>
          <ProductDescription description={productDescription} />
          <ProductSpecification specs={mattressSpecs} />
        </Box>
      </div>
      <WhySection />
      <div
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem 0",
          alignItems: "center",
          flexDirection: isScreenBig ? "row" : "column",
        }}
      >
        <img
          style={{ width: isScreenBig ? "50%" : "100%", borderRadius: "5px" }}
          src="https://images.ctfassets.net/uvwd10ivtduz/63ZP2CJyW2fvtLk0LbooQY/fae86c5734920aa2242122bfde02b0bf/16_9-Mattress__1_.png??w=1200&h=675&q=75&fit=fill&fm=webp"
        />
        <Group direction="column" spacing={"xs"}>
          <h3 style={{ margin: 0 }}>Support in all the right places</h3>
          <p>
            We have a firmer support base right beneath the hips that prevents
            your body from sinking into the mattress. This comes in real handy
            when it comes to helping you maintain a healthy sleeping posture.
          </p>
        </Group>
      </div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem 0",
          alignItems: "center",
          flexDirection: isScreenBig ? "row" : "column-reverse",
        }}
      >
        <Group direction="column" spacing={"xs"}>
          <h3 style={{ margin: 0 }}>Adjustable firmness levels</h3>
          <p>
            What might feel right to your mate, doesn't feel right to you.
            That's why we've created our double-sided comfort layer that gives
            you the choice between medium-firm support and firm support. Just
            unzip and flip it to find what works for you.
          </p>
        </Group>
        <img
          style={{ width: isScreenBig ? "50%" : "100%", borderRadius: "5px" }}
          src="https://images.ctfassets.net/uvwd10ivtduz/6xROkM3MgHXs5kFRtJwRUz/3289bbe5dd6898acc3c6654bedd5091c/T00461_AU_Paddington_bedbaseQueenAU_Queen_Eucalyptus_17101.jpg??w=1200&h=675&q=75&fit=fill&fm=webp"
        />
      </div>
    </MainFrame>
  );
};

interface ProductDescriptionProps {
  description: string | HTMLElement | ReactElement;
}

const ProductDescription: FC<ProductDescriptionProps> = ({ description }) => {
  if (description) {
    if (typeof description === "string") {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        ></div>
      );
    } else if (isValidElement(description)) {
      return description;
    } else {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        ></div>
      );
    }
  } else {
    return <></>;
  }
};

interface ProductSpecificationProps {
  specs: TAccordionItem[];
}

const ProductSpecification: FC<ProductSpecificationProps> = ({ specs }) => {
  const items = specs.map((spec) => (
    <Accordion.Item label={spec.label} key={spec.label}>
      <Text size="md" color="gray" style={{ whiteSpace: "pre-line" }}>
        {spec.content}
      </Text>
    </Accordion.Item>
  ));

  return (
    <Box style={{ padding: "1rem 0" }}>
      <h3>Product Specification</h3>
      <Accordion initialItem={0} iconPosition="right" multiple>
        {items}
      </Accordion>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        "common",
        "footer",
        "home",
      ])),
    },
  };
};

export default Mattress;
