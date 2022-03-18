import { Group, Text, useMantineTheme } from "@mantine/core";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { FC } from "react";

const WhySection = () => {
  const { t } = useTranslation();
  const themes = useMantineTheme();
  const SectionItems: IWhySectionItemProps[] = [
    {
      itemImage: "/natural.png",
      itemText: "100% certified natural latex",
    },
    {
      itemImage: "/sleeping.png",
      itemText: "Sommni guaranteed sleeping experience",
    },
    {
      itemImage: "/9years.svg",
      itemText: "9 years of experience",
    },
    {
      itemImage: "/air-mattress.png",
      itemText: "Dual comfort",
    },
    {
      itemImage: "/radiation.png",
      itemText: "EMF Free",
    },
    {
      itemImage: "/free-delivery.png",
      itemText: "Free shipping worldwide",
    },
    {
      itemImage: "/logistic.png",
      itemText: "150,000+ mattress exported worldwide",
    },
    {
      itemImage: "/warranty.png",
      itemText: "10 years warranty",
    },
  ];

  return (
    <Group direction="column" position="center" style={{ paddingBottom: 40 }}>
      <h1>Why Sommni?</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          columnGap: "1.5rem",
          rowGap: "3rem",
          width: "100%",
        }}
      >
        {SectionItems.map((item) => (
          <WhySectionItem itemImage={item.itemImage} itemText={item.itemText} />
        ))}
      </div>
    </Group>
  );
};

interface IWhySectionItemProps {
  itemImage: string;
  itemText: string;
}

const WhySectionItem: FC<IWhySectionItemProps> = ({ itemImage, itemText }) => {
  const themes = useMantineTheme();
  return (
    <Group direction="column" position="center" style={{ width: "45%" }}>
      <Image width="100px" height="100px" src={itemImage} />
      <Text size="xl" weight={500} style={{ color: themes.colors.gray[6] }}>
        {itemText}
      </Text>
    </Group>
  );
};

export default WhySection;
