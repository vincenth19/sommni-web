import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { getAllCollections } from "../lib/shopify";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { Group, Loader, Text } from "@mantine/core";
import AlertCard from "../components/shared/alertCard";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const TitleSection = dynamic(() => import("../components/shared/titleSection"));
const ProductsSection = dynamic(
  () => import("../components/shared/collectionCards")
);

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
      <Head>
        <title>Sommni - Products</title>
        <meta name="description" content="Sommni - Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? (
        <Group
          direction="column"
          position="center"
          style={{ height: "80vh", justifyContent: "center" }}
        >
          <Text size="lg">Getting our collections...</Text>
          <Loader />
        </Group>
      ) : (
        <>
          <TitleSection title="Our Products" />
          {collections.errors ? (
            <div style={{ padding: "3rem 0" }}>
              <AlertCard>
                <p>Errors:</p>
                {collections.errors.map((error: any) => {
                  return <p key={error}>{error.message}</p>;
                })}
              </AlertCard>
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
