import { THeaderOptions } from "../types";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

// GraphQL is in types.ts file located at root
// Modify the type if query on respective function changes

async function ShopifyData(query: string) {
  const URL = `https://${domain}/api/2022-01/graphql.json`;

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
              originalSrc
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

  const allCollections = response.data.collections.edges
    ? response.data.collections.edges
    : [];

  return allCollections;
}

export async function getAllCollectionsHandle() {
  const query = `
  {
    collections(first: 50) {
      edges {
        node {
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

      const product = response.data.product ? response.data.product : null;

      return product;
    }
  } else {
    return null;
  }
}

// for getStaticPath
export async function getProductHandle(handle: string | string[] | undefined) {
  const query = `
  {
    product(handle: "${handle}"){
      handle
    }
  }
  `;
  const response = await ShopifyData(query);

  const product = response.data.product.handle
    ? response.data.product.handle
    : [];

  return product;
}

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
