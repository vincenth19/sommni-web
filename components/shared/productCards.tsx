import { Badge, Group, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import styles from "../../styles/Products.module.css";
import { screenSizes, TGetProductsByCollection } from "../../types";
import TitleSection from "./titleSection";

interface ProductCardsSectionProps {
  collectionHandle: string;
  products: TGetProductsByCollection[];
  collectionTitle?: string;
}

const ProductCardsSection: FC<ProductCardsSectionProps> = ({
  collectionHandle,
  products,
  collectionTitle,
}) => {
  return (
    <>
      {collectionTitle && <TitleSection title={collectionTitle} />}
      <Group
        spacing={"lg"}
        style={{
          paddingTop: "1rem",
          paddingBottom: "2rem",
          alignItems: "flex-start",
        }}
      >
        {products.map((product) => {
          return (
            <ProductCard
              availableForSale={product.node.availableForSale}
              key={product.node.id}
              imageURL={product.node.featuredImage}
              title={product.node.title}
              path={`/products/${collectionHandle}/${product.node.handle}`}
              descriptionHtml={product.node.descriptionHtml}
            />
          );
        })}
      </Group>
    </>
  );
};

type TImageUrl = {
  url: string;
};

type TProductCard = {
  availableForSale: boolean;
  imageURL: TImageUrl | null;
  title: string;
  path: string;
  descriptionHtml: string;
};

const ProductCard = ({
  availableForSale,
  imageURL,
  title,
  path,
  descriptionHtml,
}: TProductCard) => {
  const mediumScreen = useMediaQuery(`(min-width: ${screenSizes.md})`);
  const smallScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);

  const [isMediumScreen, setIsMediumScreen] = useState<boolean>(true);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(true);

  useEffect(() => {
    setIsMediumScreen(mediumScreen);
  }, [mediumScreen]);

  useEffect(() => {
    setIsSmallScreen(smallScreen);
  }, [smallScreen]);

  return (
    <Link href={availableForSale ? path : "#"} passHref>
      <Group
        className={styles.productCard}
        direction="column"
        position="apart"
        spacing={"xs"}
        style={{
          width: isMediumScreen ? "24.25%" : isSmallScreen ? "48.5%" : "100%",
        }}
      >
        <div
          style={{
            height: "200px",
            width: "100%",
            overflow: "hidden",
            objectFit: "cover",
            color: "gray",
          }}
        >
          <Image
            src={imageURL !== null ? imageURL.url : "/imgPlaceholder.png"}
            width={"100%"}
            height={200}
            radius="sm"
            alt="placeholder-image"
          />
        </div>
        {availableForSale ? <></> : <Badge color="red">Out of stock</Badge>}
        <h2 style={{ marginBottom: 0 }}>{title}</h2>
        {descriptionHtml && (
          <div
            dangerouslySetInnerHTML={{
              __html: descriptionHtml,
            }}
          ></div>
        )}
      </Group>
    </Link>
  );
};

export default ProductCardsSection;
