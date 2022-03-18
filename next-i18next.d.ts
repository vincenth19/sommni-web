import "next-i18next";
import { Resources as MyResources } from "./types";

declare module "next-i18next" {
  interface Resources extends MyResources {}
}
