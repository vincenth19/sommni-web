import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import {
  getAllCollectionsHandle,
  getProductsByCollection,
} from "../../../lib/shopify";

import dynamic from "next/dynamic";
import ComingSoon from "../../../components/shared/comingSoon";
import Head from "next/head";

const MainFrame = dynamic(() => import("../../../components/shared/mainFrame"));
const AlertCard = dynamic(() => import("../../../components/shared/alertCard"));
const ProductCardsSection = dynamic(
  () => import("../../../components/shared/productCards")
);

const ProductsInCollection: NextPage = ({
  collectionProducts,
  params,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{`Sommni - ${params.collectionHandle}`}</title>
        <meta
          name="description"
          content={`Sommni - ${params.collectionHandle}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainFrame>
        {"errors" in collectionProducts ? (
          <AlertCard>
            <p>Errors:</p>
            {collectionProducts.errors.map((error: any) => {
              return <p>{error.message}</p>;
            })}
          </AlertCard>
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