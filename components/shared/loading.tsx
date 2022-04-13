import { Group, Text, Loader } from "@mantine/core";
import { FC } from "react";

interface LoadingProps {
  height?: string;
  text?: string;
}

const Loading: FC<LoadingProps> = ({
  height = "50vh",
  text = "Loading...",
}) => {
  return (
    <>
      <Group
        direction="column"
        position="center"
        style={{ height: height, justifyContent: "center" }}
      >
        <Text size="lg">{text}</Text>
        <Loader />
      </Group>
    </>
  );
};

export default Loading;
