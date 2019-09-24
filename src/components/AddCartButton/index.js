import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.css";

import { connect } from "react-redux";
import { addProduct } from "../../actions";

export class AddCartButton extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    styles: PropTypes.object,
    addLabel: PropTypes.string
  };

  static defaultProps = {
    addLabel: "Add to Cart",
    styles: {
      backgroundColor: "#17a2b8",
      color: "white",
      border: "0"
    }
  };

  addProductToCart = (event, product) => {
    product.quantity = 1;
    this.props.addProduct(product);
  };

  render() {
    const { product, styles, addLabel } = this.props;
    return (
      <div>
        <button
          style={{ ...styles }}
          onClick={event => this.addProductToCart(event, product)}
        >
          {addLabel}
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { addProduct: product => dispatch(addProduct(product)) };
};

export default connect(
  null,
  mapDispatchToProps
)(AddCartButton);
