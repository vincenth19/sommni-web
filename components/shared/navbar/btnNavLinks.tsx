import { Button, Group, useMantineTheme } from "@mantine/core";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { THeaderOptions, TNavLink } from "../../../types";
import BtnDropdown from "../btnDropdown";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;
const URL = `https://${domain}/api/2022-04/graphql.json`;
const query = `
  {
    collections(first: 50) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
`;

const options: THeaderOptions = {
  endpoint: URL,
  method: "POST",
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query }),
};

const BtnNavLinks: FC = () => {
  const { t } = useTranslation("common");
  const themes = useMantineTheme();
  const NavLinks: TNavLink[] = [
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
        {
          path: "/products/topper",
          title: "Topper",
        },
        {
          path: "/products/pillow",
          title: "Pillow",
        },
      ],
    },
    {
      path: "/faq",
      title: t("nav-faq"),
    },
    {
      path: "/compare",
      title: t("nav-compare"),
    },
    {
      path: "/sleep-experience",
      title: "Sleep Experience",
    },
  ];

  const [navbarLinks, setNavbarLinks] = useState<TNavLink[]>(NavLinks);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("navbarLinks")) {
        const links = sessionStorage.getItem("navbarLinks");
        if (links) setNavbarLinks(JSON.parse(links));
      } else {
        fetch(URL, options)
          .then((res) => res.json())
          .then((data) => {
            if (!data.errors) {
              const serverCollections = data.data.collections.edges.map(
                (el: any) => {
                  return {
                    path: `/products/${el.node.handle}`,
                    title: el.node.title,
                  };
                }
              );
              const copied = JSON.stringify(navbarLinks);
              let newNavLinks = JSON.parse(copied);
              newNavLinks[2].dropdownLinks = serverCollections;
              sessionStorage.setItem(
                "navbarlinks",
                JSON.stringify(newNavLinks)
              );
              setNavbarLinks(newNavLinks);
            }
          })
          .catch((error) => {
            console.error(error);
            throw new Error("API error in getting collection (n)");
          });
      }
    }
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
