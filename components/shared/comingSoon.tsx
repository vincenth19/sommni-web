import { Group, Text, useMantineTheme } from "@mantine/core";
import { FC } from "react";

const ComingSoon: FC = () => {
  const themes = useMantineTheme();
  return (
    <Group
      position="center"
      direction="column"
      style={{ height: "50vh", padding: "40px 0", justifyContent: "center" }}
    >
      <Text
        weight={700}
        style={{ fontSize: "4rem", color: themes.colors.brand[9] }}
      >
        Coming Soon
      </Text>
      <Text color="gray" size="lg">
        Subscribe to our newsletter to get the latest update for this product.
      </Text>
    </Group>
  );
};

export default ComingSoon;
