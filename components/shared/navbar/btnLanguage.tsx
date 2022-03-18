import { useState } from "react";
import { Popover, Button, Group } from "@mantine/core";
import Link from "next/link";
// import { useRouter } from "next/router";
import { RiGlobalLine } from "react-icons/ri";

const BtnLanguage = () => {
  const [opened, setOpened] = useState(false);
  // const router = useRouter();

  return (
    <Popover
      style={{ width: "fit-content" }}
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Button
          variant="light"
          size="lg"
          compact
          onClick={() => setOpened((o) => !o)}
        >
          <RiGlobalLine />
        </Button>
      }
      width={260}
      position="bottom"
      placement="end"
      withArrow
    >
      <Group direction="column" position="right">
        <Link href="" locale={"en"}>
          <Button variant="subtle">English</Button>
        </Link>
        <Link href="" locale={"ms"}>
          <Button variant="subtle">Bahasa Melayu</Button>
        </Link>
        <Link href="" locale={"zh"}>
          <Button variant="subtle">简体中文</Button>
        </Link>
        <Link href="" locale={"zh-TW"}>
          <Button variant="subtle">簡體中文</Button>
        </Link>
        <Link href="" locale={"hi"}>
          <Button variant="subtle">हिन्दी</Button>
        </Link>
      </Group>
    </Popover>
  );
};

export default BtnLanguage;
