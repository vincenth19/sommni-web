import { Group, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import styles from "../../styles/Products.module.css";
import { screenSizes, TGetAllCollections } from "../../types";

import dynamic from "next/dynamic";

const AlertCard = dynamic(() => import("./alertCard"));

interface CollectionCardsSectionProps {
  collections: TGetAllCollections[];
}

const CollectionCardsSection: FC<CollectionCardsSectionProps> = ({
  collections,
}) => {
  return (
    <Group
      spacing={"lg"}
      style={{
        paddingTop: "1rem",
        paddingBottom: "2rem",
        alignItems: "baseline",
      }}
    >
      {collections.length === 0 ? (
        <>
          <AlertCard title="Oops... There is an issue when getting our products">
            Please try again later or contact us.
          </AlertCard>
        </>
      ) : (
        <>
          {collections.map((collection) => {
            return (
              <ProductCard
                key={collection.node.id}
                imageURL={collection.node.image}
                title={collection.node.title}
                path={`/products/${collection.node.handle}`}
                descriptionHtml={collection.node.descriptionHtml}
              />
            );
          })}
        </>
      )}
    </Group>
  );
};

type TImageUrl = {
  url: string;
};

type TProductCard = {
  imageURL: TImageUrl | null;
  title: string;
  path: string;
  descriptionHtml: string;
};

const ProductCard = ({
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
    <Link href={path} passHref>
      <Group
        className={styles.productCard}
        direction="column"
        position="apart"
        spacing={"xs"}
        style={{
          width: isMediumScreen ? "48.5%" : isSmallScreen ? "48.5%" : "100%",
        }}
      >
        <div
          style={{
            height: "250px",
            width: "100%",
            overflow: "hidden",
            objectFit: "cover",
          }}
        >
          <Image
            src={imageURL !== null ? imageURL.url : "/imgPlaceholder.png"}
            width={"100%"}
            height={250}
            radius="sm"
            alt="collection-placeholder-image"
          />
        </div>
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

export default CollectionCardsSection;
