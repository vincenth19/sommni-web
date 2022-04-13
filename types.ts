import common from "./public/locales/en/common.json";
import home from "./public/locales/en/home.json";
import footer from "./public/locales/en/footer.json";
import { Dispatch, ReactElement, SetStateAction } from "react";

export type TAppContext = {
  user: string | null;
  totalCart: number;
  setUser: Dispatch<SetStateAction<string | null>>;
  setTotalCart: Dispatch<SetStateAction<number>>;
};
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

type TErrorLoc = {
  line: number;
  column: number;
};

export type TError = {
  message: string;
  locations: TErrorLoc[];
  path: string[];
  extensions: {
    code: string;
    typeName: string;
    fieldName: string;
  };
};
export type TApiError = {
  errors: TError[];
};

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
    id: string;
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
  handle: string;
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

// customer type
export type TCreateUser = {
  email: string;
  password: string;
  acceptsMarketing?: boolean;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

export type TUserAccessToken = {
  email: string;
  password: string;
};

export type TUserCred = {
  email: string;
  password: string;
};

// for customerAccessTokenCreate error
export type TCustomerUserError = {
  code: string;
  field: null | string[];
  message: string;
};

export type TCustomerAccessToken = {
  accessToken: string;
  expiresAt: string;
};

export type TCustomerAccessTokenCreate = {
  data: {
    customerAccessTokenCreate: {
      customerAccessToken: TCustomerAccessToken;
    };
    customerUserErrors: TCustomerUserError[];
  };
};

export type TCustomerAddress = {
  address1: string | null;
  address2: string | null;
  firstName: string | null;
  lastName: string | null;
  zip: string | null;
  name: string | null;
  phone: string | null;
  city: string | null;
  province: string | null;
  provinceCode: string | null;
  country: string | null;
  countryCodeV2: string | null;
  company: string | null;
  formatted: string[] | null;
  formattedArea: string | null;
  id: string | null;
  latitude: null | number;
  longitude: null | number;
};

type TCustomerAddressWithNode = {
  node: TCustomerAddress;
};

export type TCustomer = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string | null;
  email: string;
  phone: string | null;
  acceptsMarketing: boolean;
  defaultAddress: TCustomerAddress | null;
  addresses: {
    edges: TCustomerAddressWithNode[];
  };
  orders: {
    pageInfo: {
      startCursor: string | null;
      endCursor: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
  updatedAt: string;
  createdAt: string;
};

export type TInputCustomerCreate = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptsMarketing: boolean;
};

export type TCustomerCreate = {
  data: {
    customerCreate: {
      customerUserErrors: TCustomerUserError[];
      customer: {
        id: string;
        firstName: string;
        lastName: string;
        acceptsMarketing: boolean;
      };
    };
  };
};

export type TSuccessCustomerCreate = {
  id: string;
  firstName: string;
  lastName: string;
  acceptsMarketing: boolean;
};

export type TInputAddressDelete = {
  customerAccessToken: string;
  id: string;
};

export type TInputDefaultAddressChange = {
  customerAccessToken: string;
  addressId: string;
};

export type TBasicAddress = {
  address1: string;
  address2: string;
  city: string;
  company: string;
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
  province: string;
  zip: string;
};

export type TInputAddressUpdate = {
  address: TBasicAddress;
  customerAccessToken: string;
  id: string;
};

export type TInputAddressCreate = {
  address: TBasicAddress;
  customerAccessToken: string;
};

export type TInputCustomerUpdateProfile = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type TInputCustomerUpdatePassword = {
  password: string;
};

// END Shopify GraphQL Types
