import React, { Component } from "react";
import PropTypes from "prop-types";

import "./styles.css";
import CartProduct from "./CartProduct";

import { connect } from "react-redux";
import { loadCart, removeProduct, updateCart } from "../../actions";
import { formatPrice } from "../../helpers";
import storage from "../../storage";

export class Cart extends Component {
  static propTypes = {
    loadCart: PropTypes.func,
    updateCart: PropTypes.func,
    cartProducts: PropTypes.array,
    productToAdd: PropTypes.object,
    removeProduct: PropTypes.func,
    productToRemove: PropTypes.object,
    currencySymbol: PropTypes.string,
    language: PropTypes.string,
    handleCheckout: PropTypes.func,
    checkoutTextLabel: PropTypes.string,
    cartTextLabel: PropTypes.string,
    subTotalTextLabel: PropTypes.string,
    quantityTextLabel: PropTypes.string
  };

  static defaultProps = {
    currencySymbol: "USD",
    language: "en-US",
    checkoutTextLabel: "Checkout",
    cartTextLabel: "Your Cart",
    subTotalTextLabel: "Sub Total",
    quantityTextLabel: "Quantity",
    cartEmptyLabel: "Add some products in the cart"
  };

  state = {
    isOpen: false
  };

  UNSAFE_componentWillMount() {
    this.props.loadCart(JSON.parse(storage().get()) || []);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.updateCart(this.props.cartProducts);
    }, 0);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.productToAdd !== this.props.productToAdd) {
      this.addProduct(nextProps.productToAdd);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }
  }

  openFloatCart = () => {
    this.setState({ isOpen: true });
  };

  closeFloatCart = () => {
    this.setState({ isOpen: false });
  };

  addProduct = product => {
    const { cartProducts, updateCart } = this.props;
    let productAlreadyInCart = false;
    cartProducts &&
      cartProducts.forEach(cp => {
        if (cp.id === product.id) {
          cp.quantity += product.quantity;
          productAlreadyInCart = true;
        }
      });
    if (!productAlreadyInCart) {
      cartProducts.push(product);
    }

    updateCart(cartProducts);
    this.openFloatCart();
  };

  removeProduct = product => {
    const { cartProducts, updateCart } = this.props;

    const index = cartProducts.findIndex(
      cart_product => cart_product.id === product.id
    );
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  };

  clickCheckout = () => {
    const { cartProducts, cartTotal, handleCheckout } = this.props;
    const data = {
      products: cartProducts,
      total: cartTotal
    };
    handleCheckout(data);
  };

  render() {
    const {
      cartTotal,
      cartProducts,
      removeProduct,
      currencySymbol,
      language,
      checkoutTextLabel,
      cartTextLabel,
      subTotalTextLabel,
      quantityTextLabel,
      cartEmptyLabel
    } = this.props;

    const products =
      cartProducts &&
      cartProducts.map(product => {
        return (
          <CartProduct
            language={language}
            product={product}
            removeProduct={removeProduct}
            currencySymbol={currencySymbol}
            key={product.id}
            quantityTextLabel={quantityTextLabel}
          />
        );
      });

    let classes = ["purchase-float"];

    if (!!this.state.isOpen) {
      classes.push("purchase-float-open");
    }

    return (
      <div className={classes.join(" ")}>
        {this.state.isOpen && (
          <div
            onClick={() => this.closeFloatCart()}
            className="purchase-float-close-btn"
          >
            X
          </div>
        )}
        {!this.state.isOpen && (
          <span
            onClick={() => this.openFloatCart()}
            className="bag bag--float-cart-closed"
          >
            <span className="bag__quantity">{cartTotal.productQuantity}</span>
          </span>
        )}

        <div className="purchase-float-cart__content">
          <div className="purchase-float-cart__header">
            <span className="header-title font-weight-bold h4">
              {cartTextLabel}
            </span>
            <span className="bag">
              <span className="bag__quantity">{cartTotal.productQuantity}</span>
            </span>
          </div>

          <div className="purchase-float-cart__shelf-container">
            {products}
            {cartProducts === undefined ||
              (cartProducts.length === 0 && (
                <p className="shelf-empty">{cartEmptyLabel}</p>
              ))}
          </div>

          <div className="purchase-float-cart__footer">
            <div className="sub">{subTotalTextLabel}</div>
            <div className="sub-price">
              <p className="sub-price__val">
                {`${formatPrice(
                  cartTotal.totalPrice,
                  currencySymbol,
                  language
                )}`}
              </p>
            </div>
            <div onClick={this.clickCheckout} className="continue-btn">
              {checkoutTextLabel}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartProducts: state.cart.products,
    productToAdd: state.cart.productToAdd,
    productToRemove: state.cart.productToRemove,
    cartTotal: state.cart.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCart: products => dispatch(loadCart(products)),
    updateCart: products => dispatch(updateCart(products)),
    removeProduct: product => dispatch(removeProduct(product))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
