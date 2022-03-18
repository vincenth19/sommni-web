import { useState } from "react";
import { Popover, Button, Group } from "@mantine/core";
import Link from "next/link";
// import { useRouter } from "next/router";
import { RiGlobalLine } from "react-icons/ri";

type TBtnLanguage = {
  text: string;
  locale: string;
};

const Languages: TBtnLanguage[] = [
  {
    text: "English",
    locale: "en",
  },
  {
    text: "Bahasa Melayu",
    locale: "ms",
  },
  {
    text: "简体中文",
    locale: "zh",
  },
  {
    text: "簡體中文",
    locale: "zh-TW",
  },
  {
    text: "हिन्दी",
    locale: "hi",
  },
];

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
        {Languages.map((lang) => (
          <Link href="" locale={lang.locale} passHref key={lang.locale}>
            <Button component="a" variant="subtle">
              {lang.text}
            </Button>
          </Link>
        ))}
      </Group>
    </Popover>
  );
};

export default BtnLanguage;
