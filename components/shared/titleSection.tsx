import { Group, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FC, useEffect, useState } from "react";
import { screenSizes } from "../../types";

interface TitleSectionProps {
  title: string | string[];
}

const TitleSection: FC<TitleSectionProps> = ({ title }) => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isDesktop, setIsDesktop] = useState<boolean>();

  useEffect(() => {
    setIsDesktop(biggerScreen);
  }, [biggerScreen]);
  return (
    <Group
      position="center"
      style={{
        height: isDesktop ? "150px" : "100px",
      }}
    >
      <h1
        style={{ fontSize: isDesktop ? 48 : 36, textTransform: "capitalize" }}
      >
        {title}
      </h1>
    </Group>
  );
};

export default TitleSection;
