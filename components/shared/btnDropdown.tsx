import { Box, Button, Group, useMantineTheme } from "@mantine/core";
import { url } from "inspector";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { TNavLink } from "../../types";

interface BtnDropdownProps {
  links: TNavLink[];
  dropdownTitle: string;
  btnSize?: "xs" | "sm" | "md" | "lg" | "xl";
}

const BtnDropdown: FC<BtnDropdownProps> = ({
  links,
  dropdownTitle,
  btnSize = "sm",
}) => {
  const [isBtnHover, setIsBtnHover] = useState(false);
  const [btnSizeChanges, setBtnSizeChanges] = useState<
    "xs" | "sm" | "md" | "lg" | "xl"
  >("md");
  const themes = useMantineTheme();

  useEffect(() => {
    setBtnSizeChanges((data) => (data = btnSize));
  }, [btnSize]);

  return (
    <Box
      onMouseOver={() => setIsBtnHover((data) => !data)}
      onMouseOut={() => setIsBtnHover((data) => !data)}
      style={{ position: "relative", display: "inline-block" }}
    >
      <Button
        size={btnSizeChanges}
        variant="subtle"
        style={{ color: themes.colors.brand[9] }}
      >
        {dropdownTitle}
        <span style={{ marginLeft: "5px" }}>
          <RiArrowDownSLine />
        </span>
      </Button>
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
                <Link href={link.path} passHref>
                  <Button
                    size={btnSizeChanges}
                    variant="subtle"
                    style={{ color: themes.colors.brand[9] }}
                  >
                    {link.title}
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
