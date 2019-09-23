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
    price: 200.0
  },
  {
    id: 2,
    name: "Black and White Stripes Dress",
    sku: "kskskskks",
    price: 300.0
  },
  {
    id: 3,
    name: "Flamboyant Pink Top",
    sku: "kskskskks",
    price: 400.0
  },
  {
    id: 4,
    name: "Flamboyant Pink Top",
    sku: "kskskskks",
    price: 400.0
  }
];

ReactDOM.render(
  <Provider store={store}>
    <Cart />
    <div>
      {products.map((product, key) => {
        return (
          <div className="col" key={key}>
            <div className="product-item">
              <div className="pi-pic">
                <img src={product.image} alt={product.name} />
                <div className="pi-links">
                  <AddCartButton
                    product={product}
                    styles={{
                      backgroundColor: "#009688",
                      color: "white",
                      border: "0"
                    }}
                  />
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
