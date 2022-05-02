import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router, { useRouter } from "next/router";
import {
  getAllCollectionsHandle,
  getProductsByCollection,
} from "../../../lib/shopify";

import dynamic from "next/dynamic";
import ComingSoon from "../../../components/shared/comingSoon";
import { useEffect, useState } from "react";
import Loading from "../../../components/shared/loading";

const MainFrame = dynamic(() => import("../../../components/shared/mainFrame"));
const AlertCard = dynamic(() => import("../../../components/shared/alertCard"));
const ProductCardsSection = dynamic(
  () => import("../../../components/shared/productCards")
);
const PageHead = dynamic(() => import("../../../components/shared/pageHead"));

const ProductsInCollection: NextPage = ({
  collectionProducts,
  params,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (collectionProducts) {
      if (collectionProducts.length === 1) {
        // console.log(collectionProducts[0]);
        router.push(
          `/products/${params.collectionHandle}/${collectionProducts[0].node.handle}`
        );
      } else {
        setIsLoading(false);
      }
    }
  }, [collectionProducts]);

  return (
    <>
      <PageHead title={`${params.collectionHandle} - Sommni`} />
      <MainFrame>
        <div style={{ minHeight: "80vh" }}>
          {isLoading ? (
            <Loading height="80vh" text="Getting our products..." />
          ) : (
            <>
              {"errors" in collectionProducts ? (
                <AlertCard errors={collectionProducts} />
              ) : (
                <>
                  {collectionProducts.length === 0 ? (
                    <ComingSoon>
                      <p>Product is coming soon.</p>
                      <p>Subscribe to our newsletter to get our latest news.</p>
                    </ComingSoon>
                  ) : (
                    <ProductCardsSection
                      collectionHandle={params.collectionHandle}
                      products={collectionProducts}
                      collectionTitle={params.collectionHandle}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </MainFrame>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const handles = await getAllCollectionsHandle();
  let paths = null;
  if (!handles.errors) {
    paths = handles.map((handle: any) => {
      return {
        params: { collectionHandle: handle.node.handle },
      };
    });
  } else {
    const router = Router;
    router.push("/");
  }
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const collectionHandle = params?.collectionHandle;
  let collectionProducts: any = [];
  if (collectionHandle) {
    collectionProducts = await getProductsByCollection(collectionHandle);
  }
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
      collectionProducts,
      params,
    },
  };
};

export default ProductsInCollection;
