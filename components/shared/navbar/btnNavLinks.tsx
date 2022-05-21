import { Button, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { DefaltNavLinks } from "../../../AppContext";
import { getNavLinks } from "../../../lib/shopify";
import { TNavLink } from "../../../types";
import BtnDropdown from "../btnDropdown";

const BtnNavLinks: FC = () => {
  const themes = useMantineTheme();

  const [navbarLinks, setNavbarLinks] = useState<TNavLink[] | null>(null);

  useEffect(() => {
    const abortCont = new AbortController();

    const getRunner = async () => {
      const data = await getNavLinks(DefaltNavLinks, abortCont);
      if (data) {
        setNavbarLinks(data);
      } else {
        setNavbarLinks(DefaltNavLinks);
      }
    };
    getRunner();

    return () => abortCont.abort();
  }, []);

  return (
    <>
      {navbarLinks &&
        navbarLinks.map((link) => {
          if (!link.dropdownLinks) {
            return (
              <Link href={link.path} key={link.path} passHref>
                <Button
                  size="md"
                  component="a"
                  variant="subtle"
                  style={{ color: themes.colors.brand[9] }}
                >
                  {link.title}
                </Button>
              </Link>
            );
          } else {
            return (
              <BtnDropdown
                key={link.path}
                path={link.path}
                dropdownTitle={link.title}
                links={link.dropdownLinks}
              />
            );
          }
        })}
    </>
  );
};

export default BtnNavLinks;
