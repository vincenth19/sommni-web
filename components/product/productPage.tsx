import { FC, useEffect, useState } from "react";
import {
  Accordion,
  Box,
  Group,
  Text,
  Divider,
  Image,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  screenSizes,
  TAccordionItem,
  TExtraInfo,
  TGetProduct,
  TProductVariant,
} from "../../types";
import dynamic from "next/dynamic";
import { useContextData } from "../../AppContext";
import { decrypt, encrypt } from "../../lib/cryptojs";

const Carousel = dynamic(() => import("./carousel"));
const InfoSection = dynamic(() => import("../home/infoSection"));
const OptionChips = dynamic(() => import("../shared/optionChips"));
const WhySection = dynamic(() => import("../shared/whySection"));
const AlternatingSections = dynamic(
  () => import("../shared/alternatingSections")
);
// const ShopifyBuyButon = dynamic(() => import("./shopifyBuyButton"));

interface ProductPageProps {
  productData: TGetProduct;
  valueState: any;
  valueSetter: (value: string) => void;
  prodSpecs?: TAccordionItem[] | null;
  extraInfos?: TExtraInfo[] | null;
}

const ProductPage: FC<ProductPageProps> = ({
  productData,
  valueState,
  valueSetter,
  prodSpecs,
  extraInfos,
}) => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [displayedPrice, setDisplayedPrice] = useState<string | number>("");
  const [isScreenBig, setIsScreenBig] = useState<boolean>();
  const [variantNames, setVariantNames] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<TProductVariant | null>(
    null
  );
  const [isVariantEmpty, setIsVariantEmpty] = useState<boolean>(true);
  const [cartTotalUpdateTrigger, setCartTotalUpdateTrigger] = useState(0);

  const { cartTotalUpdater } = useContextData();

  const cartObjectGenerator = (
    imageUrl: string,
    productVariant: TProductVariant
  ) => {
    return {
      product: {
        id: productVariant.node.id,
        imageUrl: imageUrl,
        name: productVariant.node.title,
        currency: productVariant.node.priceV2.currencyCode,
        price: productVariant.node.priceV2.amount,
      },
      quantity: 1,
    };
  };

  useEffect(() => {
    cartTotalUpdater();
  }, [cartTotalUpdateTrigger]);

  useEffect(() => {
    setIsScreenBig(biggerScreen);
  }, [biggerScreen]);

  useEffect(() => {
    productData.options.forEach((option) => {
      if (option.name !== "Title") {
        setVariantNames((prev) => (prev = [...prev, option.name]));
      } else {
        setIsVariantEmpty(false);
      }
    });
  }, [productData]);

  //setting displayed price based on selected variants
  useEffect(() => {
    if (valueState) {
      if (variantNames.length > 0) {
        let counterVariantSelected = 0;
        variantNames.forEach((variant) => {
          if (valueState[variant] !== "") {
            counterVariantSelected++;
          }
        });
        if (counterVariantSelected === variantNames.length) {
          let variantValues: string[] = [];
          variantNames.forEach((variant) => {
            variantValues.push(valueState[variant]);
          });

          let stringSelectedVariant = "";
          if (variantValues.length === 1) {
            stringSelectedVariant = variantValues[0];
          } else if (variantValues.length === variantNames.length) {
            stringSelectedVariant = variantValues.join(" / ");
          } else {
            throw new Error("Product variant error.");
          }
          productData.variants.edges.forEach((variant) => {
            if (variant.node.title === stringSelectedVariant) {
              setDisplayedPrice((prev) => (prev = variant.node.priceV2.amount));
              if (variant.node.availableForSale) {
                setSelectedItem(variant);
              }
              setIsVariantEmpty(
                (prev) => (prev = !variant.node.availableForSale)
              );
            }
          });
        } else {
          // initial displayed price when variant(s) is not selected
          setDisplayedPrice(productData.priceRange.minVariantPrice.amount);
          // if (
          //   productData.priceRange.minVariantPrice.amount ===
          //   productData.priceRange.maxVariantPrice.amount
          // ) {
          //   setDisplayedPrice(productData.priceRange.minVariantPrice.amount);
          // } else {
          //   setDisplayedPrice(
          //     `${productData.priceRange.minVariantPrice.amount} - ${productData.priceRange.maxVariantPrice.amount}`
          //   );
          // }
        }
      } else {
        setDisplayedPrice(productData.priceRange.minVariantPrice.amount);
      }
    }
  }, [valueState, productData, variantNames]);

  return (
    <>
      <>
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
              width: isScreenBig ? "35vw" : "100%",
              position: isScreenBig ? "sticky" : "unset",
              top: "4rem",
              zIndex: 2,
              height: "100%",
            }}
          >
            {productData.images.edges.length === 0 ? (
              <Image
                src={"/imgPlaceholder.png"}
                width={isScreenBig ? 600 : "100%"}
                height={isScreenBig ? 500 : 200}
                radius="sm"
                alt="product-image-placeholder"
              />
            ) : (
              <Carousel slides={productData.images.edges} />
            )}
          </Box>
          <Box style={{ width: "100%" }}>
            <h1 style={{ fontSize: "2.5rem" }}>{productData.title}</h1>
            <Group>
              <Text size="xl">
                {productData.priceRange.maxVariantPrice.currencyCode}{" "}
                {displayedPrice}
              </Text>
              <InfoSection />
            </Group>
            {productData.options && (
              <>
                {productData.options[0].name !== "Title" && (
                  <OptionChips
                    valueState={valueState}
                    valueSetter={valueSetter}
                    options={productData.options}
                  />
                )}
              </>
            )}
            <Button
              fullWidth={isScreenBig ? false : true}
              size="lg"
              style={{ margin: "1rem 0" }}
              disabled={isVariantEmpty}
              onClick={() => {
                if (localStorage.getItem("cartItem")) {
                  const prevCartEncrypted = localStorage.getItem("cartItem");
                  if (prevCartEncrypted) {
                    const cartItemDecrypted = decrypt(prevCartEncrypted);
                    if (cartItemDecrypted) {
                      let newCart = JSON.parse(cartItemDecrypted);
                      let selectedItemID = selectedItem?.node.id;
                      for (let i = 0; i <= newCart.length; i++) {
                        if (newCart[i] === undefined) {
                          const newItem = cartObjectGenerator(
                            productData.featuredImage.url,
                            selectedItem!
                          );
                          newCart.push(newItem);
                          break;
                        } else if (newCart[i].product.id === selectedItemID) {
                          newCart[i].quantity++;
                          break;
                        }
                      }
                      const encryptedCart = encrypt(newCart);
                      if (encryptedCart) {
                        localStorage.setItem("cartItem", encryptedCart);
                        setCartTotalUpdateTrigger((prev) => prev + 1);
                      }
                    }
                  }
                } else {
                  const newItem = cartObjectGenerator(
                    productData.featuredImage.url,
                    selectedItem!
                  );
                  let cartArr = [newItem];
                  const encryptedCartItems = encrypt(cartArr);
                  if (encryptedCartItems) {
                    localStorage.setItem("cartItem", encryptedCartItems);
                    setCartTotalUpdateTrigger((prev) => prev + 1);
                  }
                }
              }}
            >
              Add to Cart
            </Button>
            <Box style={{ padding: "1rem 0" }}>
              {/* <ShopifyBuyButon merchandiseID={productData.id} /> */}
              <InfoSection />
            </Box>
            {/* {selectedItemID && <pre>{JSON.stringify(selectedItemID)}</pre>} */}
            {productData.descriptionHtml && (
              <ProductDescription
                descriptionHtml={productData.descriptionHtml}
              />
            )}
            <Divider size="xs" style={{ margin: "1rem 0" }} />
            {prodSpecs && <ProductSpecification specs={prodSpecs} />}
          </Box>
        </div>
        <WhySection />
        {extraInfos && <AlternatingSections infos={extraInfos} />}
      </>
    </>
  );
};

interface ProductDescriptionProps {
  descriptionHtml: string;
}

const ProductDescription: FC<ProductDescriptionProps> = ({
  descriptionHtml,
}) => {
  return (
    <>
      {descriptionHtml && (
        <div
          dangerouslySetInnerHTML={{
            __html: descriptionHtml,
          }}
        ></div>
      )}
    </>
  );
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
