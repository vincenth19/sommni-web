import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import dynamic from "next/dynamic";
import { getAllCollections } from "../lib/shopify";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const TitleSection = dynamic(() => import("../components/shared/titleSection"));
const ProductsSection = dynamic(
  () => import("../components/shared/collectionCards")
);
const Loading = dynamic(() => import("../components/shared/loading"));
const AlertCard = dynamic(() => import("../components/shared/alertCard"));
const PageHead = dynamic(() => import("../components/shared/pageHead"));

const Products: NextPage = ({
  collections,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (collections) {
      setIsLoading(false);
    }
  }, [collections]);

  return (
    <MainFrame>
      <PageHead title="Products - Sommni" />
      {isLoading ? (
        <Loading height="80vh" text="Getting our collections..." />
      ) : (
        <>
          <TitleSection title="Our Products" />
          {collections.errors ? (
            <div style={{ padding: "3rem 0" }}>
              <AlertCard errors={collections} />
            </div>
          ) : (
            <ProductsSection collections={collections} />
          )}
        </>
      )}
    </MainFrame>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const collections = await getAllCollections();
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
      collections,
    },
  };
};

export default Products;
