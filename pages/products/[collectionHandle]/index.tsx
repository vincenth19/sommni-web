import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { getProductsByCollection } from "../../../lib/shopify";

import dynamic from "next/dynamic";
import ComingSoon from "../../../components/shared/comingSoon";
import { useEffect, useState } from "react";
import Loading from "../../../components/shared/loading";

const AlertCard = dynamic(() => import("../../../components/shared/alertCard"));
const ProductCardsSection = dynamic(
  () => import("../../../components/shared/productCards")
);
const PageHead = dynamic(() => import("../../../components/shared/pageHead"));

const ProductsInCollection: NextPage = ({
  collectionProducts,
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
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
