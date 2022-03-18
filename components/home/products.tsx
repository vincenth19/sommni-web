import { Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import styles from "../../styles/Products.module.css";
import { screenSizes } from "../../types";
type TProductCard = {
  imageURL: string;
  title: string;
  path: string;
};

const ProductsSection = () => {
  const ProductsData: TProductCard[] = [
    {
      imageURL:
        "https://cdn.shopify.com/s/files/1/0378/8133/products/Bedding-Mattress_1200x.jpg?v=1571271426",
      title: "Mattress",
      path: "/mattress",
    },
    {
      imageURL:
        "https://m.media-amazon.com/images/I/71m1E2u-GQL._AC_SL1500_.jpg",
      title: "Topper",
      path: "/topper",
    },
    {
      imageURL:
        "https://caspercontent.imgix.net/4koN3X3zp2DF2mA2hN0BX0/a15ba158b6d4c78291dae69cbd82457f/pillows-catGrid-desktop-lg.webp?auto=compress,format&cs=strip&q=65&w=750",
      title: "Pillow",
      path: "/pillow",
    },
  ];

  return (
    <Group spacing={"lg"} style={{ paddingTop: "1rem", paddingBottom: "2rem" }}>
      {ProductsData.map((product) => {
        return (
          <ProductCard
            imageURL={product.imageURL}
            title={product.title}
            path={product.path}
          />
        );
      })}
    </Group>
  );
};

const ProductCard = ({ imageURL, title, path }: TProductCard) => {
  const mediumScreen = useMediaQuery(`(min-width: ${screenSizes.md})`);
  const smallScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);

  return (
    <Link href={path}>
      <Group
        className={styles.productCard}
        direction="column"
        position="apart"
        spacing={"xs"}
        style={{
          width: mediumScreen ? "31.5%" : smallScreen ? "48.5%" : "100%",
        }}
      >
        <div
          style={{
            height: "200px",
            width: "100%",
            overflow: "hidden",
            objectFit: "cover",
          }}
        >
          <img
            src={imageURL}
            style={{ height: "100%", width: "100%", borderRadius: "5px" }}
          />
        </div>
        <h2 style={{ marginBottom: 0 }}>{title}</h2>
      </Group>
    </Link>
  );
};

export default ProductsSection;
