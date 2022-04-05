import { Group, Text, useMantineTheme } from "@mantine/core";
import { FC } from "react";

const ComingSoon: FC = ({ children }) => {
  const themes = useMantineTheme();
  return (
    <Group
      position="center"
      direction="column"
      style={{ minHeight: "55vh", padding: "40px 0", justifyContent: "center" }}
    >
      <Text
        weight={700}
        style={{ fontSize: "4rem", color: themes.colors.brand[9] }}
      >
        Coming Soon
      </Text>
      {children}
    </Group>
  );
};

export default ComingSoon;
