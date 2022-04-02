import { Group, useMantineTheme } from "@mantine/core";
import { FC } from "react";

interface TitleSectionProps {
  title: string | string[];
  fontSize?: number;
}

const TitleSection: FC<TitleSectionProps> = ({ title, fontSize = 48 }) => {
  const themes = useMantineTheme();
  return (
    <Group
      position="center"
      style={{
        height: "150px",
      }}
    >
      <h1 style={{ fontSize: `${fontSize}px`, textTransform: "capitalize" }}>
        {title}
      </h1>
    </Group>
  );
};

export default TitleSection;
