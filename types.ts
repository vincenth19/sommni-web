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

export type TAccordionItem = {
  label: string;
  content: string | ReactElement | HTMLElement;
};

// for extra info in productPage
export type TExtraInfo = {
  imageURL: string;
  title: string;
  content: string | ReactElement | string[] | ReactElement[];
};
