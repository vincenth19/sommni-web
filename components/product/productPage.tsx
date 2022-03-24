import { FC, isValidElement, ReactElement, useEffect, useState } from "react";
import { Accordion, Box, Group, Text, Divider } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import DOMPurify from "isomorphic-dompurify";
import dynamic from "next/dynamic";
import {
  screenSizes,
  TAccordionItem,
  TExtraInfo,
  TOptionData,
} from "../../types";

const MainFrame = dynamic(() => import("../shared/mainFrame"));
const Carousel = dynamic(() => import("./carousel"));
const InfoSection = dynamic(() => import("../home/infoSection"));
const OptionChips = dynamic(() => import("../shared/optionChips"));
const WhySection = dynamic(() => import("../shared/whySection"));
const AlternatingSections = dynamic(
  () => import("../shared/alternatingSections")
);

interface ProductPageProps {
  prodTitle: string;
  prodPrice: string;
  valueState: string;
  valueSetter: (value: string) => void;
  slideImages: string[];
  btnAddToCart: ReactElement;
  variants?: TOptionData[];
  prodDescription?: string | HTMLElement | ReactElement;
  prodSpecs?: TAccordionItem[];
  extraInfos?: TExtraInfo[];
}

const ProductPage: FC<ProductPageProps> = ({
  prodTitle,
  prodPrice,
  valueState,
  valueSetter,
  slideImages,
  btnAddToCart,
  variants,
  prodDescription,
  prodSpecs,
  extraInfos,
}) => {
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
          <Carousel slides={slideImages} />
        </Box>
        <Box>
          <h1 style={{ fontSize: "2.5rem" }}>{prodTitle}</h1>
          <Group>
            <Text size="xl">{prodPrice}</Text>
            <InfoSection />
          </Group>
          {variants && (
            <OptionChips
              valueState={valueState}
              valueSetter={valueSetter}
              options={variants}
            />
          )}
          {btnAddToCart}
          {prodDescription && (
            <ProductDescription description={prodDescription} />
          )}
          <Divider size="xs" />
          {prodSpecs && <ProductSpecification specs={prodSpecs} />}
        </Box>
      </div>
      <WhySection />
      {extraInfos && <AlternatingSections infos={extraInfos} />}
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

export default ProductPage;
