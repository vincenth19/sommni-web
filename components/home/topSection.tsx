import { Button, Group, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { ReactElement } from "react";
import { RiMoonClearLine, RiNumber0 } from "react-icons/ri";
import { screenSizes } from "../../types";

type TTopCardItem = {
  linkTitle?: string;
  path: string;
  title: string;
  description?: string;
  icon: ReactElement;
  backgroundColor: string;
};

const TopSection = () => {
  const smallScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);

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
      position="apart"
      direction={smallScreen ? "row" : "column"}
      spacing={"sm"}
      style={{ padding: "1rem 0", width: "100%" }}
    >
      {CardItems.map((item) => (
        <TopCard
          path={item.path}
          title={item.title}
          icon={item.icon}
          backgroundColor={item.backgroundColor}
          smallScreen={smallScreen}
        />
      ))}
    </Group>
  );
};

interface TopCardProps extends TTopCardItem {
  smallScreen: boolean;
}

const TopCard = ({
  backgroundColor,
  linkTitle = "Learn More",
  path,
  title,
  description,
  icon,
  smallScreen,
}: TopCardProps) => {
  const themes = useMantineTheme();
  return (
    <Group
      spacing={"xs"}
      direction={smallScreen ? "column" : "row"}
      position={smallScreen ? "center" : "apart"}
      style={{
        background: backgroundColor,
        width: smallScreen ? "48%" : "100%",
        padding: "1rem",
        borderRadius: "10px",
      }}
    >
      <Group>
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
      </Group>
      <Link href={path}>
        <Button variant="subtle">{linkTitle}</Button>
      </Link>
    </Group>
  );
};

export default TopSection;
