import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { AddCartButton, Cart, CartReducers } from "./App";

const store = createStore(
  combineReducers({
    cart: CartReducers
  })
);

const products = [
  {
    id: 1,
    name: "Flamboyant Pink Top",
    sku: "kskskskks",
    price: 2000,
    thumb: { type: "icon", classes: "fa fa-2x fa-cogs" }
  },
  {
    id: 2,
    name: "Black and White Stripes Dress",
    sku: "kskskskks",
    price: 3000,
    thumb: {
      type: "image",
      src: "https://colorlib.com/preview/theme/divisima/img/product/2.jpg"
    }
  },
  {
    id: 3,
    name: "Flamboyant Pink Top",
    sku: "kskskskks",
    price: 10000
  },
  {
    id: 4,
    name: "Flamboyant Pink Top",
    sku: "kskskskks",
    price: 5000
  }
];

const handleCheckout = data => {
  console.log(data);
};

ReactDOM.render(
  <Provider store={store}>
    <Cart
      currencySymbol="CLP"
      language="es-CL"
      handleCheckout={handleCheckout}
      cartEmptyLabel={"El carrito está vacio"}
      cartTextLabel={"Carrito de compras"}
      checkoutTextLabel={"Ir a pagar"}
      subTotalTextLabel={"Total"}
      quantityTextLabel={"Cantidad"}
    />
    <div>
      {products.map((product, key) => {
        return (
          <div className="col" key={key}>
            <div className="product-item">
              <div className="pi-pic">
                <div className="pi-links">
                  <AddCartButton product={product} />
                </div>
              </div>
              <div className="pi-text">
                <p>{product.name}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </Provider>,
  document.getElementById("root")
);
