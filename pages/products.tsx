import { NextPage } from "next";
import { Head } from "next/document";
import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const TitleSection = dynamic(() => import("../components/shared/titleSection"));
const ProductsSection = dynamic(() => import("../components/home/products"));

const Products: NextPage = () => {
  return (
    <MainFrame>
      <Head>
        <title>Sommni - Products</title>
        <meta name="description" content="Sommni - Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TitleSection title="Our Products" />
      <ProductsSection />
    </MainFrame>
  );
};

export default Products;
