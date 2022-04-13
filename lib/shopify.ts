import {
  TBasicAddress,
  THeaderOptions,
  TInputAddressDelete,
  TInputCustomerCreate,
  TInputCustomerUpdateProfile,
  TNavLink,
  TUserCred,
} from "../types";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;
const URL = `https://${domain}/api/2022-04/graphql.json`;
// GraphQL is in types.ts file located at root
// Modify the type if query on respective function changes

async function ShopifyData(query: string) {
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

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    throw new Error("API error occurred.");
  }
}

export async function getNavLinks(defaultNavLinks: TNavLink[]) {
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
  }`;

  const response = await ShopifyData(query);

  if (!response.errors) {
    const serverCollections = response.data.collections.edges.map((el: any) => {
      return {
        path: `/products/${el.node.handle}`,
        title: el.node.title,
      };
    });
    const copied = JSON.stringify(defaultNavLinks);
    let newNavLinks = JSON.parse(copied);
    newNavLinks[2].dropdownLinks = serverCollections;
    sessionStorage.setItem("navbarlinks", JSON.stringify(newNavLinks));
    return newNavLinks;
  } else {
    return null;
  }
}

export async function getAllProducts() {
  const query = `
  {
  products(first: 25) {
    edges {
      node {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  }
}
`;

  const response = await ShopifyData(query);

  const allProducts = response.data.products.edges
    ? response.data.products.edges
    : [];

  return allProducts;
}

export async function getAllCollections() {
  const query = `
  {
    collections(first: 25) {
      edges {
        node {
          id
          handle
          title
          descriptionHtml
          image{
            url
          }
        }
      }
    }
  }
  `;
  const response = await ShopifyData(query);
  if (!response.errors) {
    const allCollections = response.data.collections.edges
      ? response.data.collections.edges
      : [];

    return allCollections;
  } else {
    return response;
  }
}

export async function getAllCollectionsHandle() {
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
  const response = await ShopifyData(query);

  if (!response.errors) {
    const allHandles = response.data.collections.edges
      ? response.data.collections.edges
      : [];

    return allHandles;
  } else {
    return response;
  }
}

export async function getProductsByCollection(
  handle: string | string[] | undefined
) {
  if (handle) {
    if (Array.isArray(handle)) {
      throw new Error(
        "Too many product categories. Please give 1 category only"
      );
    } else {
      const query = `
      {
        collection(handle: "${handle}"){
          products(first: 50){
            edges{
              node{
                id
                title
                handle
                availableForSale
                descriptionHtml
                featuredImage{
                  url
                }
              }
            }
          }
        }
      }
      `;
      const response = await ShopifyData(query);

      if ("errors" in response) {
        return response;
      } else {
        const allHandles = response.data.collection.products.edges
          ? response.data.collection.products.edges
          : [];

        return allHandles;
      }
    }
  } else {
    return [];
  }
}

export async function getProduct(handle: string | string[] | undefined) {
  if (handle) {
    if (Array.isArray(handle)) {
      throw new Error("Too many product names. Please give 1 name only");
    } else {
      const query = `
      {
        product(handle: "${handle}"){
          id
          handle
          title
          availableForSale
          descriptionHtml
          compareAtPriceRange{
            maxVariantPrice{amount currencyCode}
            minVariantPrice{amount currencyCode}
          }
          priceRange{
            maxVariantPrice{amount currencyCode}
            minVariantPrice{amount currencyCode}
          }
          images(first: 5){
            edges{
              node{
                url
              }
            }
          }
          options(first: 25){
            id
            name
            values
          }
          variants(first: 25){
            edges{
              node{
                id
                priceV2{
                  amount
                  currencyCode
                }
                availableForSale
                title
              }
            }
          }
        }
      }
    `;
      const response = await ShopifyData(query);

      if ("errors" in response) {
        return response;
      } else {
        const product = response.data.product ? response.data.product : null;

        return product;
      }
    }
  } else {
    return null;
  }
}

// START customer APIs

export async function customerAccessTokenCreate(userCred: TUserCred) {
  const query = `
  mutation {
    customerAccessTokenCreate(input: {email:"${userCred.email}", password: "${userCred.password}"}) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
      }
    }
  }
  `;
  const response = await ShopifyData(query);
  if (response.data.customerAccessTokenCreate.customerAccessToken) {
    return response.data.customerAccessTokenCreate.customerAccessToken;
  } else if (
    response.data.customerAccessTokenCreate.customerUserErrors.length > 0
  ) {
    return response.data.customerAccessTokenCreate.customerUserErrors;
  } else if (response.errors) {
    return response;
  } else {
    return [];
  }
}

export async function getCustomer(accessToken: string) {
  const query = `
  {
    customer(customerAccessToken: "${accessToken}") {
      id
      firstName
      lastName
      displayName
      email
      phone
      acceptsMarketing
      defaultAddress{
        address1
        address2
        zip
        firstName
        lastName
        name
        phone
        city
        province
        provinceCode
        country
        countryCodeV2
        company
        formatted
        formattedArea
        id
        latitude
        longitude
      }
      addresses(first: 20){
        edges{
         node{
           address1
           address2
           zip
           name
           firstName
           lastName
           phone
           city
           province
           provinceCode
           country
           countryCodeV2
           company
           formatted
           formattedArea
           id
           latitude
           longitude
         }
       }
     }
      orders(first:5){
        pageInfo{
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
      updatedAt
      createdAt
    }
  }
  `;
  const response = await ShopifyData(query);
  if (response.errors) {
    return response;
  } else {
    return response.data.customer;
  }
}

export async function customerCreate(signUpInput: TInputCustomerCreate) {
  const query = `
  mutation  {
    customerCreate(input: {
      email: "${signUpInput.email}",
      password: "${signUpInput.password}",
      firstName: "${signUpInput.firstName}",
      lastName: "${signUpInput.lastName}",
      acceptsMarketing: ${signUpInput.acceptsMarketing}
    }) {
      customerUserErrors {
        code
        field
        message
      }
      customer {
        id
        firstName
        lastName
        acceptsMarketing
      }
    }
  }
  `;
  const response = await ShopifyData(query);
  if (response.data.customerCreate.customer.id) {
    return response.data.customerCreate.customer;
  } else if (response.data.customerCreate.customerUserErrors.length > 0) {
    return response.data.customerCreate.customerUserErrors;
  } else if (response.errors) {
    return response;
  } else {
    return [];
  }
}

export async function customerAddressDelete(token: string, id: string) {
  const query = `
  mutation {
    customerAddressDelete(
      customerAccessToken: "${token}", 
      id: "${id}"
    ) {
      customerUserErrors {
        code
        field
        message
      }
      deletedCustomerAddressId
    }
  }
  `;
  const response = await ShopifyData(query);
  if (response.data.customerAddressDelete.deletedCustomerAddressId) {
    return response.data.customerAddressDelete.deletedCustomerAddressId;
  } else if (
    response.data.customerAddressDelete.customerUserErrors.length > 0
  ) {
    return response.data.customerAddressDelete.customerUserErrors;
  } else if (response.errors) {
    return response;
  } else {
    return [];
  }
}

export async function customerDefaultAddressUpdate(token: string, id: string) {
  const query = `
  mutation {
    customerDefaultAddressUpdate(
      customerAccessToken: "${token}", 
      addressId: "${id}"
    ) {
      customerUserErrors {
        code
        field
        message
      }
      customer {
        id
        displayName
      }
    }
  }
  `;
  const response = await ShopifyData(query);
  if (response.data.customerDefaultAddressUpdate.customer) {
    return response.data.customerDefaultAddressUpdate.customer;
  } else if (
    response.data.customerDefaultAddressUpdate.customerUserErrors.length > 0
  ) {
    return response.data.customerDefaultAddressUpdate.customerUserErrors;
  } else if (response.errors) {
    return response;
  } else if (response.errors) {
    return response;
  } else {
    return [];
  }
}

export async function customerAddressUpdate(
  address: TBasicAddress,
  token: string,
  id: string
) {
  const query = `
  mutation {
    customerAddressUpdate(
      address: {
        address1: "${address.address1}",
        address2: "${address.address2}",
        city: "${address.city}",
        company: "${address.company}",
        country: "${address.country}",
        firstName: "${address.firstName}",
        lastName: "${address.lastName}",
        phone: "${address.phone}",
        province: "${address.province}",
        zip: "${address.zip}"
      }
      customerAccessToken: "${token}", 
      id: "${id}"
    ) {
      customerUserErrors {
        code
        field
        message
      }
      customerAddress{
        id
      }
    }
  }
  `;
  const response = await ShopifyData(query);
  if (response.data.customerAddressUpdate.customerAddress !== null) {
    return response.data.customerAddressUpdate.customerAddress.id;
  } else if (
    response.data.customerAddressUpdate.customerUserErrors.length > 0
  ) {
    return response.data.customerAddressUpdate.customerUserErrors;
  } else if (response.errors) {
    return response;
  } else {
    return [];
  }
}

export async function customerAddressCreate(
  address: TBasicAddress,
  token: string
) {
  const query = `
  mutation {
    customerAddressCreate(
      address: {
        address1: "${address.address1}",
        address2: "${address.address2}",
        city: "${address.city}",
        company: "${address.company}",
        country: "${address.country}",
        firstName: "${address.firstName}",
        lastName: "${address.lastName}",
        phone: "${address.phone}",
        province: "${address.province}",
        zip: "${address.zip}"
      }
      customerAccessToken: "${token}", 
    ) {
      customerUserErrors {
        code
        field
        message
      }
      customerAddress{
        id
      }
    }
  }
  `;
  const response = await ShopifyData(query);
  if (response.data.customerAddressCreate.customerAddress !== null) {
    return response.data.customerAddressCreate.customerAddress.id;
  } else if (
    response.data.customerAddressCreate.customerUserErrors.length > 0
  ) {
    return response.data.customerAddressCreate.customerUserErrors;
  } else if (response.errors) {
    return response;
  } else {
    return [];
  }
}

export async function customerUpdate(
  profile: TInputCustomerUpdateProfile,
  token: string
) {
  const query = `
  mutation {
    customerUpdate(
      customer: {
        email: "${profile.email}"
        firstName: "${profile.firstName}",
        lastName: "${profile.lastName}",
        phone: "${profile.phone}"
      }
      customerAccessToken: "${token}", 
    ) {
      customerUserErrors {
        code
        field
        message
      }
      customer{
        id
      }
    }
  }
  `;
  const response = await ShopifyData(query);
  if (response.data.customerUpdate.customer !== null) {
    return response.data.customerUpdate.customer.id;
  } else if (response.data.customerUpdate.customerUserErrors.length > 0) {
    return response.data.customerUpdate.customerUserErrors;
  } else if (response.errors) {
    return response;
  } else {
    return [];
  }
}

export async function customerUpdatePassword(password: string, token: string) {
  const query = `
  mutation {
    customerUpdate(
      customer: {
        password: "${password}"
      }
      customerAccessToken: "${token}", 
    ) {
      customerUserErrors {
        code
        field
        message
      }
      customer{
        id
      }
    }
  }
  `;
  const response = await ShopifyData(query);
  if (response.data.customerUpdate.customer !== null) {
    return response.data.customerUpdate.customer.id;
  } else if (response.data.customerUpdate.customerUserErrors.length > 0) {
    return response.data.customerUpdate.customerUserErrors;
  } else if (response.errors) {
    return response;
  } else {
    return [];
  }
}

export async function customerRecover(email: string) {
  const query = `
  mutation {
    customerRecover(
      email: "${email}",
    ) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
  `;
  const response = await ShopifyData(query);
  if (response.data.customerRecover.customerUserErrors.length > 0) {
    return response.data.customerRecover.customerUserErrors;
  } else if (response.errors) {
    return response;
  } else {
    return [];
  }
}

export async function customerResetByUrl(password: string, url: string) {
  const query = `
  mutation {
    customerResetByUrl(
      password: "${password}",
      resetUrl: "${url}"
    ) {
      customer{
        id
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
  `;
  const response = await ShopifyData(query);
  if (response.data.customerResetByUrl.customerAccessToken !== null) {
    return response.data.customerResetByUrl.customerAccessToken;
  } else if (response.data.customerResetByUrl.customerUserErrors.length > 0) {
    return response.data.customerResetByUrl.customerUserErrors;
  } else if (response.errors) {
    return response;
  } else {
    return [];
  }
}

// END customer APIs

// more complete query for getProduct()
/*
{
  product(handle: "the-sommni"){
    id
    title
    availableForSale
    compareAtPriceRange{
      maxVariantPrice{amount currencyCode}
      minVariantPrice{amount currencyCode}
    }
    priceRange{
      maxVariantPrice{amount}
      minVariantPrice{amount}
    }
    images(first: 5){
      edges{
        node{
          url
        }
      }
    }
    options(first: 25){
      id
      name
      values
    }
    variants(first: 25){
      edges{
        node{
          compareAtPriceV2{
            amount
          }
          priceV2{
            amount
            currencyCode
          }
          availableForSale
          title
          unitPrice{
            amount
            currencyCode
          }
          unitPriceMeasurement{
            measuredType
            quantityUnit
            quantityValue
            referenceUnit
            referenceValue
          }
          weight
          weightUnit
          quantityAvailable
        }
      }
    }
  }
}
*/
