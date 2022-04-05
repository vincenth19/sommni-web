import { Box, Button, Group, useMantineTheme, Text } from "@mantine/core";
import Link from "next/link";
import { FC, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { TNavLink } from "../../types";

interface BtnDropdownProps {
  links: TNavLink[];
  path?: string;
  dropdownTitle: string;
  btnSize?: "xs" | "sm" | "md" | "lg" | "xl";
}

const BtnDropdown: FC<BtnDropdownProps> = ({
  links,
  path,
  dropdownTitle,
  btnSize = "md",
}) => {
  const [isBtnHover, setIsBtnHover] = useState(false);
  const themes = useMantineTheme();

  return (
    <Box
      onMouseOver={() => setIsBtnHover((data) => !data)}
      onMouseOut={() => setIsBtnHover((data) => !data)}
      style={{ position: "relative", display: "inline-block" }}
    >
      {path ? (
        <Link href={path} passHref>
          <Button
            component="a"
            size={btnSize}
            variant="subtle"
            style={{ color: themes.colors.brand[9] }}
          >
            {dropdownTitle}
            <span style={{ marginLeft: "5px" }}>
              <RiArrowDownSLine />
            </span>
          </Button>
        </Link>
      ) : (
        <Button
          size={btnSize}
          variant="subtle"
          style={{ color: themes.colors.brand[9] }}
        >
          {dropdownTitle}
          <span style={{ marginLeft: "5px" }}>
            <RiArrowDownSLine />
          </span>
        </Button>
      )}
      <Box
        style={{
          display: !isBtnHover ? "none" : "block",
          position: "absolute",
          padding: "10px",
          boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
          zIndex: 1,
          backgroundColor: "white",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
        }}
      >
        <Group direction="column">
          {links &&
            links.map((link) => {
              return (
                <Link href={link.path} passHref key={link.path}>
                  <Button
                    fullWidth
                    size={btnSize}
                    variant="subtle"
                    style={{ color: themes.colors.brand[9] }}
                  >
                    <Text align="left">{link.title}</Text>
                  </Button>
                </Link>
              );
            })}
        </Group>
      </Box>
    </Box>
  );
};

export default BtnDropdown;
