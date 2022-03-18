import { Button, Group, Text, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { ReactElement } from "react";
import { RiMoonClearLine, RiNumber0 } from "react-icons/ri";

type TTopCardItem = {
  linkTitle?: string;
  path: string;
  title: string;
  description?: string;
  icon: ReactElement;
  backgroundColor: string;
};

const TopSection = () => {
  const themes = useMantineTheme();

  const CardItems: TTopCardItem[] = [
    {
      path: "/nights-trial",
      title: "100 Nights trial",
      icon: <RiMoonClearLine />,
      backgroundColor:
        "linear-gradient(to right, rgba(208, 230, 255, 0.4), rgba(208, 255, 221, 0.6))",
    },
    {
      path: "/nights-trial",
      title: "0% Instalment",
      icon: <RiNumber0 />,
      backgroundColor:
        "linear-gradient(to right, rgba(221, 236, 250, 0.63), #DACEFF)",
    },
  ];
  return (
    <Group
      position="center"
      spacing={"lg"}
      style={{ padding: "1rem 0", width: "100%" }}
    >
      {CardItems.map((item) => (
        <TopCard
          path={item.path}
          title={item.title}
          icon={item.icon}
          backgroundColor={item.backgroundColor}
        />
      ))}
    </Group>
  );
};

const TopCard = ({
  backgroundColor,
  linkTitle = "Learn More",
  path,
  title,
  description,
  icon,
}: TTopCardItem) => {
  const themes = useMantineTheme();
  return (
    <Group
      spacing={"xs"}
      direction="column"
      position="center"
      style={{
        background: backgroundColor,
        flex: 1,
        padding: "1.5rem 0",
        borderRadius: "10px",
      }}
    >
      <span
        style={{
          color: themes.colors.teal[5],
          fontSize: "1.75rem",
        }}
      >
        {icon}
      </span>
      <Text weight={700} style={{ color: themes.colors.brand[9] }}>
        {title}
      </Text>
      {description && (
        <Text style={{ color: themes.colors.gray[5] }}>{description}</Text>
      )}
      <Link href={path}>
        <Button variant="subtle">{linkTitle}</Button>
      </Link>
    </Group>
  );
};

export default TopSection;
