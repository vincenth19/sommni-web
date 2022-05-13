import { Button, useMantineTheme } from "@mantine/core";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { FC, useEffect, useMemo, useState } from "react";
import { getNavLinks } from "../../../lib/shopify";
import { TNavLink } from "../../../types";
import BtnDropdown from "../btnDropdown";

const BtnNavLinks: FC = () => {
  const { t } = useTranslation("common");
  const themes = useMantineTheme();
  const NavLinks: TNavLink[] = useMemo(
    () => [
      { path: "/", title: "Home" },
      { path: "/about-us", title: "About Us" },
      {
        path: "/products",
        title: "Products",
        dropdownLinks: [
          {
            path: "/products/mattress",
            title: "Mattress",
          },
          // {
          //   path: "/products/topper",
          //   title: "Topper",
          // },
          // {
          //   path: "/products/pillow",
          //   title: "Pillow",
          // },
        ],
      },
      {
        path: "/faq",
        title: "FAQ",
      },
      {
        path: "/compare",
        title: "Compare",
      },
      {
        path: "/sleep-experience",
        title: "Sleep Experience",
      },
      {
        path: "/tracking",
        title: "Tracking",
      },
    ],
    []
  );

  const [navbarLinks, setNavbarLinks] = useState<TNavLink[]>(NavLinks);

  useEffect(() => {
    const abortCont = new AbortController();
    if (sessionStorage.getItem("navbarLinks")) {
      const links = sessionStorage.getItem("navbarLinks");
      if (links) setNavbarLinks(JSON.parse(links));
    } else {
      const getRunner = async () => {
        const data = await getNavLinks(NavLinks, abortCont);
        if (data) {
          setNavbarLinks(data);
        }
      };
      getRunner();
    }

    return () => abortCont.abort();
  }, []);

  return (
    <>
      {navbarLinks.map((link) => {
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
