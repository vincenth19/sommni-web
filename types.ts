import common from "./public/locales/en/common.json";
import home from "./public/locales/en/home.json";
import footer from "./public/locales/en/footer.json";
import { ReactElement } from "react";

export interface Resources {
  common: typeof common;
  home: typeof home;
  footer: typeof footer;
}

export type TNavLink = {
  path: string;
  title: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  dropdownLinks?: TNavLink[];
};

export type TFooterLink = {
  path?: string;
  title: string;
};

export const screenSizes = {
  xs: "576px",
  sm: "768px",
  md: "992px",
  lg: "1200px",
  xl: "1400px",
};

// for Chips component
export type TOptionData = {
  value: string;
  label: string;
  disable: boolean;
};

export type THeaderOptions = {
  endpoint: string;
  method: string;
  headers: any;
  body: string;
};

export type TAccordionItem = {
  label: string;
  content: string | ReactElement | string[] | ReactElement[];
};

// for extra info in productPage
export type TExtraInfo = {
  imageURL: string;
  title: string;
  content: string | ReactElement | string[] | ReactElement[];
};

// START Shopify GraphQL Types
// Modify these type if query on respective function changes

// getAllCollections()
export type TGetAllCollections = {
  node: {
    id: string;
    title: string;
    descriptionHtml: string;
    handle: string;
    image: {
      url: string;
    };
  };
};

export type TGetProductsByCollection = {
  node: {
    id: string;
    title: string;
    descriptionHtml: string;
    handle: string;
    availableForSale: boolean;
    featuredImage: {
      url: string;
    };
  };
};

// for images from Shopify
export type TImageNode = {
  node: {
    url: string;
  };
};

// for product variant(s) from Shopify
export type TProductVariant = {
  node: {
    priceV2: {
      amount: number;
      currencyCode: string;
    };
    availableForSale: boolean;
    title: string;
  };
};

export type TGetProduct = {
  id: string;
  title: string;
  availableForSale: boolean;
  descriptionHtml: string;
  compareAtPriceRange: {
    maxVariantPrice: {
      amount: number;
      currencyCode: string;
    };
    minVariantPrice: {
      amount: number;
      currencyCode: string;
    };
  };
  priceRange: {
    maxVariantPrice: {
      amount: number;
      currencyCode: string;
    };
    minVariantPrice: {
      amount: number;
      currencyCode: string;
    };
  };
  images: {
    edges: TImageNode[];
  };
  options: TProductOption[];
  variants: {
    edges: TProductVariant[];
  };
};

// for product option(s) chips
export type TProductOption = {
  id: string;
  name: string;
  values: string[];
};

// END Shopify GraphQL Types
