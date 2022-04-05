import { Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";

import dynamic from "next/dynamic";

const AlertCard = dynamic(() => import("../shared/alertCard"));

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

function shopifyBuyButtonInit(merchandiseID: string) {
  var scriptURL =
    "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
  //@ts-ignore
  if (window.ShopifyBuy) {
    //@ts-ignore
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }

  function loadScript() {
    var script = document.createElement("script");
    script.async = true;
    script.src = scriptURL;
    (
      document.getElementsByTagName("head")[0] ||
      document.getElementsByTagName("body")[0]
    ).appendChild(script);
    script.onload = ShopifyBuyInit;
  }
  function ShopifyBuyInit() {
    //@ts-ignore
    var client = window.ShopifyBuy.buildClient({
      domain: domain,
      storefrontAccessToken: storefrontAccessToken,
    });
    //@ts-ignore
    window.ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent("product", {
        id: merchandiseID,
        node: document.getElementById("shopify-buy-button"),
        moneyFormat: "RM%7B%7Bamount%7D%7D%20MYR",
        options: {
          product: {
            styles: {
              product: {
                "@media (min-width: 601px)": {
                  "max-width": "calc(25% - 20px)",
                  "margin-left": "20px",
                  "margin-bottom": "50px",
                },
                "text-align": "left",
              },
              button: {
                "font-weight": "bold",
                ":hover": {
                  "background-color": "#1c5fc9",
                },
                "background-color": "#1f6adf",
                ":focus": {
                  "background-color": "#1c5fc9",
                },
                "border-radius": "5px",
                width: "100%",
              },
              price: {
                "font-size": "16px",
              },
              compareAt: {
                "font-size": "13.6px",
              },
              unitPrice: {
                "font-size": "13.6px",
              },
            },
            contents: {
              img: false,
              title: false,
              price: true,
            },
            text: {
              button: "Add to cart",
            },
          },
          productSet: {
            styles: {
              products: {
                "@media (min-width: 601px)": {
                  "margin-left": "-20px",
                },
              },
            },
          },
          modalProduct: {
            contents: {
              img: false,
              imgWithCarousel: true,
              button: false,
              buttonWithQuantity: true,
            },
            styles: {
              product: {
                "@media (min-width: 601px)": {
                  "max-width": "100%",
                  "margin-left": "0px",
                  "margin-bottom": "0px",
                },
              },
              button: {
                "font-weight": "bold",
                ":hover": {
                  "background-color": "#1c5fc9",
                },
                "background-color": "#1f6adf",
                ":focus": {
                  "background-color": "#1c5fc9",
                },
                "border-radius": "5px",
              },
              price: {
                "font-family": "Outfit, sans-serif",
                "font-weight": "bold",
                "font-size": "18px",
                color: "#4c4c4c",
              },
              compareAt: {
                "font-family": "Outfit, sans-serif",
                "font-weight": "bold",
                "font-size": "15.299999999999999px",
                color: "#4c4c4c",
              },
              unitPrice: {
                "font-family": "Outfit, sans-serif",
                "font-weight": "bold",
                "font-size": "15.299999999999999px",
                color: "#4c4c4c",
              },
            },
            text: {
              button: "Add to cart",
            },
          },
          option: {},
          cart: {
            styles: {
              button: {
                "font-weight": "bold",
                ":hover": {
                  "background-color": "#1c5fc9",
                },
                "background-color": "#1f6adf",
                ":focus": {
                  "background-color": "#1c5fc9",
                },
                "border-radius": "5px",
              },
            },
            text: {
              total: "Subtotal",
              button: "Checkout",
            },
          },
          toggle: {
            styles: {
              toggle: {
                "font-weight": "bold",
                "background-color": "#1f6adf",
                ":hover": {
                  "background-color": "#1c5fc9",
                },
                ":focus": {
                  "background-color": "#1c5fc9",
                },
              },
            },
          },
        },
      });
    });
  }
}

interface ShopifyBuyButtonProps {
  merchandiseID: string;
}

const ShopifyBuyButon: FC<ShopifyBuyButtonProps> = ({ merchandiseID }) => {
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const slicedID = merchandiseID.split("/").pop();
    if (slicedID) {
      shopifyBuyButtonInit(slicedID);
    } else {
      setIsError(true);
    }
  }, [merchandiseID]);

  return (
    <>
      {isError ? (
        <AlertCard title="Oops... there is something wrong">
          <Text>Failed to get product variant. Please try again later</Text>
        </AlertCard>
      ) : (
        <div id="shopify-buy-button"></div>
      )}
    </>
  );
};

export default ShopifyBuyButon;
