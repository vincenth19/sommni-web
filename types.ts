import common from "./public/locales/en/common.json";
import home from "./public/locales/en/home.json";
import footer from "./public/locales/en/footer.json";

export interface Resources {
  common: typeof common;
  home: typeof home;
  footer: typeof footer;
}

export type TNavLink = {
  path: string;
  title: string;
};

export type TFooterLink = {
  path?: string;
  title: string;
};
