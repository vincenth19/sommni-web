import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { getAllCollections } from "../lib/shopify";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const TitleSection = dynamic(() => import("../components/shared/titleSection"));
const ProductsSection = dynamic(
  () => import("../components/shared/collectionCards")
);

const Products: NextPage = ({
  collections,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <MainFrame>
      <Head>
        <title>Sommni - Products</title>
        <meta name="description" content="Sommni - Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TitleSection title="Our Products" />
      <ProductsSection collections={collections} />
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
