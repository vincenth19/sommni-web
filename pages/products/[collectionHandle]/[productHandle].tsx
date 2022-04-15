import { Button, Group, Text } from "@mantine/core";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProduct } from "../../../lib/shopify";
import {
  TAccordionItem,
  TExtraInfo,
  // TGetProduct,
  TProductOption,
} from "../../../types";

import dynamic from "next/dynamic";
import Loading from "../../../components/shared/loading";

const AlertCard = dynamic(() => import("../../../components/shared/alertCard"));
const ProductPage = dynamic(
  () => import("../../../components/product/productPage")
);
const MainFrame = dynamic(() => import("../../../components/shared/mainFrame"));
const PageHead = dynamic(() => import("../../../components/shared/pageHead"));

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

const mattressExtraInfos: TExtraInfo[] = [
  {
    imageURL:
      "https://images.ctfassets.net/uvwd10ivtduz/63ZP2CJyW2fvtLk0LbooQY/fae86c5734920aa2242122bfde02b0bf/16_9-Mattress__1_.png??w=1200&h=675&q=75&fit=fill&fm=webp",
    title: "Support in all the right places",
    content:
      "We have a firmer support base right beneath the hips that prevents your body from sinking into the mattress. This comes in real handy when it comes to helping you maintain a healthy sleeping posture.",
  },
  {
    imageURL:
      "https://images.ctfassets.net/uvwd10ivtduz/6xROkM3MgHXs5kFRtJwRUz/3289bbe5dd6898acc3c6654bedd5091c/T00461_AU_Paddington_bedbaseQueenAU_Queen_Eucalyptus_17101.jpg??w=1200&h=675&q=75&fit=fill&fm=webp",
    title: "Adjustable firmness levels",
    content:
      "What might feel right to your mate, doesn't feel right to you. That's why we've created our double-sided comfort layer that gives you the choice between medium-firm support and firm support. Just unzip and flip it to find what works for you.",
  },
];

const ProductView: NextPage = () => {
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [productTitle, setProductTitle] = useState<string>("");
  const [variants, setVariants] = useState<any>(null);
  const [productSpec, setProductSpec] = useState<TAccordionItem[] | null>(null);
  const [productExtraInfo, setProductExtraInfo] = useState<TExtraInfo[] | null>(
    null
  );
  const [collectionHandle, setCollectionHandle] = useState<
    string | string[] | undefined
  >("");
  const [fetchedProduct, setFetchedProduct] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const abortCont = new AbortController();
    setCollectionHandle(router.query.collectionHandle);
    const fetchProduct = async () => {
      const res = await getProduct(router.query.productHandle, abortCont);
      if (res) {
        setFetchedProduct(res);
        setProductTitle(res.title);
        setIsloading(false);
      }
    };
    fetchProduct();
  }, [router.query.collectionHandle, router.query.productHandle]);

  useEffect(() => {
    if (fetchedProduct && "errors" in fetchedProduct === false) {
      if (fetchedProduct.options.length > 0) {
        fetchedProduct.options.forEach((option: TProductOption) => {
          if (option.name !== "Title") {
            setVariants((prev: any) => (prev = { ...prev, [option.name]: "" }));
          }
        });
      }
    }
  }, [fetchedProduct]);

  useEffect(() => {
    if (collectionHandle === "mattress") {
      setProductSpec(mattressSpecs);
      setProductExtraInfo(mattressExtraInfos);
    } else {
      setProductSpec(null);
      setProductExtraInfo(null);
    }
  }, [collectionHandle]);

  return (
    <>
      <PageHead title={`${productTitle} - Sommni`} />
      <MainFrame>
        {isLoading ? (
          <Loading height="80vh" text="Getting our product..." />
        ) : (
          <>
            {fetchedProduct ? (
              "errors" in fetchedProduct ? (
                <div style={{ padding: "3rem 0" }}>
                  <AlertCard errors={fetchedProduct} />
                </div>
              ) : (
                <>
                  <ProductPage
                    productData={fetchedProduct}
                    valueState={variants}
                    valueSetter={setVariants}
                    prodSpecs={productSpec}
                    extraInfos={productExtraInfo}
                  />
                </>
              )
            ) : (
              <>
                <div style={{ padding: "3rem 0" }}>
                  <AlertCard
                    title={`Oops... '${router.query.productHandle}' is not found`}
                  >
                    <p>Try search other product.</p>
                    <Link href="/products" passHref>
                      <Button component="a">Go to Products</Button>
                    </Link>
                  </AlertCard>
                </div>
              </>
            )}
          </>
        )}
      </MainFrame>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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

export default ProductView;
