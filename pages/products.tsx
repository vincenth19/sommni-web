import { NextPage } from "next";
import dynamic from "next/dynamic";

const MainFrame = dynamic(() => import("../components/shared/mainFrame"));
const TitleSection = dynamic(() => import("../components/shared/titleSection"));
const ProductsSection = dynamic(() => import("../components/home/products"));

const Products: NextPage = () => {
  return (
    <MainFrame>
      <TitleSection title="Our Products" />
      <ProductsSection />
    </MainFrame>
  );
};

export default Products;
