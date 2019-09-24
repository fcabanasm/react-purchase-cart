'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var reactRedux = require('react-redux');
var ReactDOM = _interopDefault(require('react-dom'));
var redux = require('redux');

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "button:focus { outline: none; }\nbutton {\n    border:0; \n    border:none;\n}";
styleInject(css);

var LOAD_CART = "LOAD_CART";
var ADD_PRODUCT = "ADD_PRODUCT";
var REMOVE_PRODUCT = "REMOVE_PRODUCT";
var UPDATE_CART = "UPDATE_CART";

var storage = function storage() {
  var key = 'cartProducts';
  return {
    persist: function persist(data) {
      return localStorage.setItem(key, data);
    },
    get: function get() {
      return localStorage.getItem(key);
    }
  };
};

var loadCart = function loadCart(products) {
  return {
    type: LOAD_CART,
    payload: products
  };
};

var addProduct = function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    payload: product
  };
};

var removeProduct = function removeProduct(product) {
  return {
    type: REMOVE_PRODUCT,
    payload: product
  };
};

var updateCart = function updateCart(cartProducts) {
  var productQuantity = cartProducts.reduce(function (sum, p) {
    sum += p.quantity;
    return sum;
  }, 0);

  var totalPrice = cartProducts.reduce(function (sum, p) {
    sum += p.price * p.quantity;
    return sum;
  }, 0);

  var cartTotal = {
    productQuantity: productQuantity,
    totalPrice: totalPrice
  };

  // we persist the cartProducts to localStorage
  storage().persist(JSON.stringify(cartProducts));

  return {
    type: UPDATE_CART,
    payload: cartTotal
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var AddCartButton = function (_Component) {
  inherits(AddCartButton, _Component);

  function AddCartButton() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, AddCartButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = AddCartButton.__proto__ || Object.getPrototypeOf(AddCartButton)).call.apply(_ref, [this].concat(args))), _this), _this.addProductToCart = function (event, product) {
      product.quantity = 1;
      _this.props.addProduct(product);
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(AddCartButton, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          product = _props.product,
          styles = _props.styles,
          addLabel = _props.addLabel;

      return React__default.createElement(
        "div",
        null,
        React__default.createElement(
          "button",
          {
            style: _extends({}, styles),
            onClick: function onClick(event) {
              return _this2.addProductToCart(event, product);
            }
          },
          addLabel
        )
      );
    }
  }]);
  return AddCartButton;
}(React.Component);

AddCartButton.propTypes = {
  product: PropTypes.object.isRequired,
  styles: PropTypes.object,
  addLabel: PropTypes.string
};
AddCartButton.defaultProps = {
  addLabel: "Add to Cart",
  styles: {
    backgroundColor: "#17a2b8",
    color: "white",
    border: "0"
  }
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return { addProduct: function addProduct$$1(product) {
      return dispatch(addProduct(product));
    } };
};

var AddCartButton$1 = reactRedux.connect(null, mapDispatchToProps)(AddCartButton);

var css$1 = "/* add css styles here (optional) */\n\n.float {\n  position: fixed;\n  top: 70px;\n  right: -450px;\n  width: 450px;\n  height: 80%;\n  background-color: #fff;\n  box-sizing: border-box;\n  transition: right 0.2s;\n  z-index: 9999;\n}\n\n.float-open {\n  right: 0 !important;\n}\n\n.float-close-btn {\n  width: 50px;\n  height: 50px;\n  color: #ececec;\n  background-color: #17a2b8;\n  text-align: center;\n  line-height: 50px;\n  position: absolute;\n  top: 0;\n  left: -50px;\n  cursor: pointer;\n}\n\n.bag {\n  width: 40px;\n  height: 40px;\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n  margin-right: 15px;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIC0zMSA1MTIuMDAwMjYgNTEyIiB3aWR0aD0iNTEyIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJtMTY0Ljk2MDkzOCAzMDAuMDAzOTA2aC4wMjM0MzdjLjAxOTUzMSAwIC4wMzkwNjMtLjAwMzkwNi4wNTg1OTQtLjAwMzkwNmgyNzEuOTU3MDMxYzYuNjk1MzEyIDAgMTIuNTgyMDMxLTQuNDQxNDA2IDE0LjQyMTg3NS0xMC44Nzg5MDZsNjAtMjEwYzEuMjkyOTY5LTQuNTI3MzQ0LjM4NjcxOS05LjM5NDUzMi0yLjQ0NTMxMy0xMy4xNTIzNDQtMi44MzU5MzctMy43NTc4MTItNy4yNjk1MzEtNS45Njg3NS0xMS45NzY1NjItNS45Njg3NWgtMzY2LjYzMjgxMmwtMTAuNzIyNjU3LTQ4LjI1MzkwNmMtMS41MjczNDMtNi44NjMyODItNy42MTMyODEtMTEuNzQ2MDk0LTE0LjY0NDUzMS0xMS43NDYwOTRoLTkwYy04LjI4NTE1NiAwLTE1IDYuNzE0ODQ0LTE1IDE1czYuNzE0ODQ0IDE1IDE1IDE1aDc3Ljk2ODc1YzEuODk4NDM4IDguNTUwNzgxIDUxLjMxMjUgMjMwLjkxNzk2OSA1NC4xNTYyNSAyNDMuNzEwOTM4LTE1Ljk0MTQwNiA2LjkyOTY4Ny0yNy4xMjUgMjIuODI0MjE4LTI3LjEyNSA0MS4yODkwNjIgMCAyNC44MTI1IDIwLjE4NzUgNDUgNDUgNDVoMjcyYzguMjg1MTU2IDAgMTUtNi43MTQ4NDQgMTUtMTVzLTYuNzE0ODQ0LTE1LTE1LTE1aC0yNzJjLTguMjY5NTMxIDAtMTUtNi43MzA0NjktMTUtMTUgMC04LjI1NzgxMiA2LjcwNzAzMS0xNC45NzY1NjIgMTQuOTYwOTM4LTE0Ljk5NjA5NHptMzEyLjE1MjM0My0yMTAuMDAzOTA2LTUxLjQyOTY4NyAxODBoLTI0OC42NTIzNDRsLTQwLTE4MHptMCAwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNGRkZGRkYiIGRhdGEtb2xkX2NvbG9yPSIjRjJFN0U3Ij48L3BhdGg+PHBhdGggZD0ibTE1MCA0MDVjMCAyNC44MTI1IDIwLjE4NzUgNDUgNDUgNDVzNDUtMjAuMTg3NSA0NS00NS0yMC4xODc1LTQ1LTQ1LTQ1LTQ1IDIwLjE4NzUtNDUgNDV6bTQ1LTE1YzguMjY5NTMxIDAgMTUgNi43MzA0NjkgMTUgMTVzLTYuNzMwNDY5IDE1LTE1IDE1LTE1LTYuNzMwNDY5LTE1LTE1IDYuNzMwNDY5LTE1IDE1LTE1em0wIDAiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0ZGRkZGRiIgZGF0YS1vbGRfY29sb3I9IiNGMkU3RTciPjwvcGF0aD48cGF0aCBkPSJtMzYyIDQwNWMwIDI0LjgxMjUgMjAuMTg3NSA0NSA0NSA0NXM0NS0yMC4xODc1IDQ1LTQ1LTIwLjE4NzUtNDUtNDUtNDUtNDUgMjAuMTg3NS00NSA0NXptNDUtMTVjOC4yNjk1MzEgMCAxNSA2LjczMDQ2OSAxNSAxNXMtNi43MzA0NjkgMTUtMTUgMTUtMTUtNi43MzA0NjktMTUtMTUgNi43MzA0NjktMTUgMTUtMTV6bTAgMCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojRkZGRkZGIiBkYXRhLW9sZF9jb2xvcj0iI0YyRTdFNyI+PC9wYXRoPjwvZz4gPC9zdmc+);\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: center;\n}\n\n.bag--float-cart-closed {\n  position: absolute;\n  background-color: #17a2b8;\n  background-size: 50%;\n  left: -60px;\n  width: 60px;\n  height: 66px;\n  cursor: pointer;\n}\n\n.bag__quantity {\n  bottom: 5px;\n  right: 10px;\n  display: inline-block;\n  width: 18px;\n  height: 18px;\n  color: white;\n  font-weight: bold;\n  font-size: 0.7em;\n  text-align: center;\n  line-height: 18px;\n  border-radius: 50%;\n  background-color: #5a3ee0;\n  position: absolute;\n  bottom: 10px;\n  right: 7px;\n}\n\n.float-cart__header {\n  box-sizing: border-box;\n  text-align: center;\n  padding: 45px 0;\n}\n\n.header-title {\n  font-weight: bold;\n  font-size: 1.2em;\n  vertical-align: middle;\n}\n\n.float-cart__shelf-container {\n  position: relative;\n  min-height: 280px;\n  padding-bottom: 200px;\n}\n\n.shelf-empty {\n  text-align: center;\n  line-height: 40px;\n}\n.shelf-item {\n  position: relative;\n  box-sizing: border-box;\n  padding: 5%;\n\n  transition: background-color 0.2s, opacity 0.2s;\n}\n\n.shelf-item::before {\n  content: \"\";\n  width: 90%;\n  height: 2px;\n  background-color: rgba(0, 0, 0, 0.2);\n  position: absolute;\n  top: 0;\n  left: 5%;\n}\n\n.shelf-item__del {\n  width: 16px;\n  height: 16px;\n  top: 15px;\n  right: 5%;\n  border-radius: 50%;\n  position: absolute;\n  background-size: auto 100%;\n  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9Ii00MCAwIDQyNyA0MjcuMDAxMzEiIHdpZHRoPSIxNnB4Ij48cGF0aCBkPSJtMjMyLjM5ODQzOCAxNTQuNzAzMTI1Yy01LjUyMzQzOCAwLTEwIDQuNDc2NTYzLTEwIDEwdjE4OWMwIDUuNTE5NTMxIDQuNDc2NTYyIDEwIDEwIDEwIDUuNTIzNDM3IDAgMTAtNC40ODA0NjkgMTAtMTB2LTE4OWMwLTUuNTIzNDM3LTQuNDc2NTYzLTEwLTEwLTEwem0wIDAiIGZpbGw9IiMwMDAwMDAiLz48cGF0aCBkPSJtMTE0LjM5ODQzOCAxNTQuNzAzMTI1Yy01LjUyMzQzOCAwLTEwIDQuNDc2NTYzLTEwIDEwdjE4OWMwIDUuNTE5NTMxIDQuNDc2NTYyIDEwIDEwIDEwIDUuNTIzNDM3IDAgMTAtNC40ODA0NjkgMTAtMTB2LTE4OWMwLTUuNTIzNDM3LTQuNDc2NTYzLTEwLTEwLTEwem0wIDAiIGZpbGw9IiMwMDAwMDAiLz48cGF0aCBkPSJtMjguMzk4NDM4IDEyNy4xMjEwOTR2MjQ2LjM3ODkwNmMwIDE0LjU2MjUgNS4zMzk4NDMgMjguMjM4MjgxIDE0LjY2Nzk2OCAzOC4wNTA3ODEgOS4yODUxNTYgOS44Mzk4NDQgMjIuMjA3MDMyIDE1LjQyNTc4MSAzNS43MzA0NjkgMTUuNDQ5MjE5aDE4OS4yMDMxMjVjMTMuNTI3MzQ0LS4wMjM0MzggMjYuNDQ5MjE5LTUuNjA5Mzc1IDM1LjczMDQ2OS0xNS40NDkyMTkgOS4zMjgxMjUtOS44MTI1IDE0LjY2Nzk2OS0yMy40ODgyODEgMTQuNjY3OTY5LTM4LjA1MDc4MXYtMjQ2LjM3ODkwNmMxOC41NDI5NjgtNC45MjE4NzUgMzAuNTU4NTkzLTIyLjgzNTkzOCAyOC4wNzgxMjQtNDEuODYzMjgyLTIuNDg0Mzc0LTE5LjAyMzQzNy0xOC42OTE0MDYtMzMuMjUzOTA2LTM3Ljg3ODkwNi0zMy4yNTc4MTJoLTUxLjE5OTIxOHYtMTIuNWMuMDU4NTkzLTEwLjUxMTcxOS00LjA5NzY1Ny0yMC42MDU0NjktMTEuNTM5MDYzLTI4LjAzMTI1LTcuNDQxNDA2LTcuNDIxODc1LTE3LjU1MDc4MS0xMS41NTQ2ODc1LTI4LjA2MjUtMTEuNDY4NzVoLTg4Ljc5Njg3NWMtMTAuNTExNzE5LS4wODU5Mzc1LTIwLjYyMTA5NCA0LjA0Njg3NS0yOC4wNjI1IDExLjQ2ODc1LTcuNDQxNDA2IDcuNDI1NzgxLTExLjU5NzY1NiAxNy41MTk1MzEtMTEuNTM5MDYyIDI4LjAzMTI1djEyLjVoLTUxLjE5OTIxOWMtMTkuMTg3NS4wMDM5MDYtMzUuMzk0NTMxIDE0LjIzNDM3NS0zNy44Nzg5MDcgMzMuMjU3ODEyLTIuNDgwNDY4IDE5LjAyNzM0NCA5LjUzNTE1NyAzNi45NDE0MDcgMjguMDc4MTI2IDQxLjg2MzI4MnptMjM5LjYwMTU2MiAyNzkuODc4OTA2aC0xODkuMjAzMTI1Yy0xNy4wOTc2NTYgMC0zMC4zOTg0MzctMTQuNjg3NS0zMC4zOTg0MzctMzMuNXYtMjQ1LjVoMjUwdjI0NS41YzAgMTguODEyNS0xMy4zMDA3ODIgMzMuNS0zMC4zOTg0MzggMzMuNXptLTE1OC42MDE1NjItMzY3LjVjLS4wNjY0MDctNS4yMDcwMzEgMS45ODA0NjgtMTAuMjE4NzUgNS42NzU3ODEtMTMuODk0NTMxIDMuNjkxNDA2LTMuNjc1NzgxIDguNzE0ODQzLTUuNjk1MzEzIDEzLjkyNTc4MS01LjYwNTQ2OWg4OC43OTY4NzVjNS4yMTA5MzctLjA4OTg0NCAxMC4yMzQzNzUgMS45Mjk2ODggMTMuOTI1NzgxIDUuNjA1NDY5IDMuNjk1MzEzIDMuNjcxODc1IDUuNzQyMTg4IDguNjg3NSA1LjY3NTc4MiAxMy44OTQ1MzF2MTIuNWgtMTI4em0tNzEuMTk5MjE5IDMyLjVoMjcwLjM5ODQzN2M5Ljk0MTQwNiAwIDE4IDguMDU4NTk0IDE4IDE4cy04LjA1ODU5NCAxOC0xOCAxOGgtMjcwLjM5ODQzN2MtOS45NDE0MDcgMC0xOC04LjA1ODU5NC0xOC0xOHM4LjA1ODU5My0xOCAxOC0xOHptMCAwIiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0ibTE3My4zOTg0MzggMTU0LjcwMzEyNWMtNS41MjM0MzggMC0xMCA0LjQ3NjU2My0xMCAxMHYxODljMCA1LjUxOTUzMSA0LjQ3NjU2MiAxMCAxMCAxMCA1LjUyMzQzNyAwIDEwLTQuNDgwNDY5IDEwLTEwdi0xODljMC01LjUyMzQzNy00LjQ3NjU2My0xMC0xMC0xMHptMCAwIiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+Cg==);\n  background-repeat: no-repeat;\n  z-index: 2;\n  cursor: pointer;\n}\n\n.shelf-item__thumb,\n.shelf-item__details,\n.shelf-item__price {\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.shelf-item__thumb {\n  vertical-align: middle;\n  width: 15%;\n  margin-right: 3%;\n}\n\n.shelf-item__thumb img {\n  width: 100%;\n  height: auto;\n}\n\n.shelf-item__details {\n  width: 57%;\n}\n\n.shelf-item__details .title {\n  margin: 0;\n}\n\n.shelf-item__details .desc {\n  margin: 0;\n}\n\n.shelf-item__price {\n  text-align: right;\n  width: 25%;\n}\n\n.float-cart__footer {\n  border-top: 1px solid;\n  box-sizing: border-box;\n  padding: 5%;\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 200px;\n  z-index: 2;\n  background-color: #fff;\n  text-align: right;\n}\n\n.continue-btn {\n  color: #ececec;\n  text-transform: uppercase;\n  background-color: #17a2b8;\n  text-align: center;\n  padding: 15px 0;\n  margin-top: 40px;\n  cursor: pointer;\n\n  transition: background-color 0.2s;\n}\n\n.sub {\n  text-transform: uppercase;\n}\n\n@media screen and (min-width: 640px) {\n  .float-cart__content::-webkit-scrollbar {\n    -webkit-appearance: none;\n    width: 10px;\n    padding: 10px;\n  }\n  .float-cart__content::-webkit-scrollbar-thumb {\n    border-radius: 4px;\n  }\n}\n\n.float-cart__content {\n  height: 100%;\n  overflow-y: scroll;\n}\n";
styleInject(css$1);

var Thumb = function Thumb(props) {
  return React__default.createElement(
    'div',
    { className: props.classes },
    React__default.createElement('img', { src: props.src, alt: props.alt, title: props.title })
  );
};

Thumb.propTypes = {
  alt: PropTypes.string,
  title: PropTypes.string,
  classes: PropTypes.string,
  src: PropTypes.string.isRequired
};

var formatPrice = function formatPrice(price, currencySymbol, lang) {
  var formatter = new Intl.NumberFormat(lang, {
    style: "currency",
    currency: currencySymbol
  });
  return formatter.format(price);
};

var CartProduct = function (_Component) {
  inherits(CartProduct, _Component);

  function CartProduct() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, CartProduct);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = CartProduct.__proto__ || Object.getPrototypeOf(CartProduct)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isMouseOver: false
    }, _this.handleMouseOver = function () {
      _this.setState({ isMouseOver: true });
    }, _this.handleMouseOut = function () {
      _this.setState({ isMouseOver: false });
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(CartProduct, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          product = _props.product,
          removeProduct = _props.removeProduct,
          currencySymbol = _props.currencySymbol,
          language = _props.language,
          quantityTextLabel = _props.quantityTextLabel;

      var classes = ["shelf-item"];

      if (!!this.state.isMouseOver) {
        classes.push("shelf-item--mouseover");
      }

      return React__default.createElement(
        "div",
        { className: classes.join(" ") },
        React__default.createElement("div", {
          className: "shelf-item__del",
          onMouseOver: function onMouseOver() {
            return _this2.handleMouseOver();
          },
          onMouseOut: function onMouseOut() {
            return _this2.handleMouseOut();
          },
          onClick: function onClick() {
            return removeProduct(product);
          }
        }),
        React__default.createElement(Thumb, {
          classes: "shelf-item__thumb",
          src: product.image || "https://via.placeholder.com/150",
          alt: product.name
        }),
        React__default.createElement(
          "div",
          { className: "shelf-item__details" },
          React__default.createElement(
            "p",
            { className: "title" },
            product.name
          ),
          React__default.createElement(
            "p",
            { className: "desc" },
            quantityTextLabel,
            ": ",
            product.quantity
          )
        ),
        React__default.createElement(
          "div",
          { className: "shelf-item__price" },
          React__default.createElement(
            "p",
            null,
            formatPrice(product.price, currencySymbol, language)
          )
        )
      );
    }
  }]);
  return CartProduct;
}(React.Component);

CartProduct.propTypes = {
  product: PropTypes.object.isRequired,
  removeProduct: PropTypes.func.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  quantityTextLabel: PropTypes.string.isRequired
};

var Cart = function (_Component) {
  inherits(Cart, _Component);

  function Cart() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Cart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Cart.__proto__ || Object.getPrototypeOf(Cart)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isOpen: false
    }, _this.openFloatCart = function () {
      _this.setState({ isOpen: true });
    }, _this.closeFloatCart = function () {
      _this.setState({ isOpen: false });
    }, _this.addProduct = function (product) {
      var _this$props = _this.props,
          cartProducts = _this$props.cartProducts,
          updateCart$$1 = _this$props.updateCart;

      var productAlreadyInCart = false;
      cartProducts && cartProducts.forEach(function (cp) {
        if (cp.id === product.id) {
          cp.quantity += product.quantity;
          productAlreadyInCart = true;
        }
      });
      if (!productAlreadyInCart) {
        cartProducts.push(product);
      }

      updateCart$$1(cartProducts);
      _this.openFloatCart();
    }, _this.removeProduct = function (product) {
      var _this$props2 = _this.props,
          cartProducts = _this$props2.cartProducts,
          updateCart$$1 = _this$props2.updateCart;


      var index = cartProducts.findIndex(function (cart_product) {
        return cart_product.id === product.id;
      });
      if (index >= 0) {
        cartProducts.splice(index, 1);
        updateCart$$1(cartProducts);
      }
    }, _this.clickCheckout = function () {
      var _this$props3 = _this.props,
          cartProducts = _this$props3.cartProducts,
          cartTotal = _this$props3.cartTotal,
          handleCheckout = _this$props3.handleCheckout;

      var data = {
        products: cartProducts,
        total: cartTotal
      };
      handleCheckout(data);
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Cart, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this.props.loadCart(JSON.parse(storage().get()) || []);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.props.updateCart(_this2.props.cartProducts);
      }, 0);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.productToAdd !== this.props.productToAdd) {
        this.addProduct(nextProps.productToAdd);
      }

      if (nextProps.productToRemove !== this.props.productToRemove) {
        this.removeProduct(nextProps.productToRemove);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          cartTotal = _props.cartTotal,
          cartProducts = _props.cartProducts,
          removeProduct$$1 = _props.removeProduct,
          currencySymbol = _props.currencySymbol,
          languaje = _props.languaje,
          checkoutTextLabel = _props.checkoutTextLabel,
          cartTextLabel = _props.cartTextLabel,
          subTotalTextLabel = _props.subTotalTextLabel,
          quantityTextLabel = _props.quantityTextLabel,
          cartEmptyLabel = _props.cartEmptyLabel;


      var products = cartProducts && cartProducts.map(function (product) {
        return React__default.createElement(CartProduct, {
          product: product,
          removeProduct: removeProduct$$1,
          currencySymbol: currencySymbol,
          languaje: languaje,
          key: product.id,
          quantityTextLabel: quantityTextLabel
        });
      });

      var classes = ["float"];

      if (!!this.state.isOpen) {
        classes.push("float-open");
      }

      return React__default.createElement(
        "div",
        { className: classes.join(" ") },
        this.state.isOpen && React__default.createElement(
          "div",
          {
            onClick: function onClick() {
              return _this3.closeFloatCart();
            },
            className: "float-close-btn"
          },
          "X"
        ),
        !this.state.isOpen && React__default.createElement(
          "span",
          {
            onClick: function onClick() {
              return _this3.openFloatCart();
            },
            className: "bag bag--float-cart-closed"
          },
          React__default.createElement(
            "span",
            { className: "bag__quantity" },
            cartTotal.productQuantity
          )
        ),
        React__default.createElement(
          "div",
          { className: "float-cart__content" },
          React__default.createElement(
            "div",
            { className: "float-cart__header" },
            React__default.createElement(
              "span",
              { className: "header-title" },
              cartTextLabel
            ),
            React__default.createElement(
              "span",
              { className: "bag" },
              React__default.createElement(
                "span",
                { className: "bag__quantity" },
                cartTotal.productQuantity
              )
            )
          ),
          React__default.createElement(
            "div",
            { className: "float-cart__shelf-container" },
            products,
            cartProducts === undefined || cartProducts.length === 0 && React__default.createElement(
              "p",
              { className: "shelf-empty" },
              cartEmptyLabel
            )
          ),
          React__default.createElement(
            "div",
            { className: "float-cart__footer" },
            React__default.createElement(
              "div",
              { className: "sub" },
              subTotalTextLabel
            ),
            React__default.createElement(
              "div",
              { className: "sub-price" },
              React__default.createElement(
                "p",
                { className: "sub-price__val" },
                "" + formatPrice(cartTotal.totalPrice, currencySymbol, languaje)
              )
            ),
            React__default.createElement(
              "div",
              { onClick: this.clickCheckout, className: "continue-btn" },
              checkoutTextLabel
            )
          )
        )
      );
    }
  }]);
  return Cart;
}(React.Component);

Cart.propTypes = {
  loadCart: PropTypes.func,
  updateCart: PropTypes.func,
  cartProducts: PropTypes.array,
  productToAdd: PropTypes.object,
  removeProduct: PropTypes.func,
  productToRemove: PropTypes.object,
  currencySymbol: PropTypes.string,
  languaje: PropTypes.string,
  handleCheckout: PropTypes.func,
  checkoutTextLabel: PropTypes.string,
  cartTextLabel: PropTypes.string,
  subTotalTextLabel: PropTypes.string,
  quantityTextLabel: PropTypes.string
};
Cart.defaultProps = {
  currencySymbol: "USD",
  languaje: "en-US",
  checkoutTextLabel: "Checkout",
  cartTextLabel: "Your Cart",
  subTotalTextLabel: "Sub Total",
  quantityTextLabel: "Quantity",
  cartEmptyLabel: "Add some products in the cart"
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    cartProducts: state.cart.products,
    productToAdd: state.cart.productToAdd,
    productToRemove: state.cart.productToRemove,
    cartTotal: state.cart.data
  };
};

var mapDispatchToProps$1 = function mapDispatchToProps(dispatch) {
  return {
    loadCart: function loadCart$$1(products) {
      return dispatch(loadCart(products));
    },
    updateCart: function updateCart$$1(products) {
      return dispatch(updateCart(products));
    },
    removeProduct: function removeProduct$$1(product) {
      return dispatch(removeProduct(product));
    }
  };
};

var Cart$1 = reactRedux.connect(mapStateToProps, mapDispatchToProps$1)(Cart);

var initialState = {
  products: [],
  productToAdd: null,
  data: {
    productQuantity: 0,
    totalPrice: 0
  }
};

function CartReducers () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case LOAD_CART:
      return _extends({}, state, {
        products: action.payload
      });
    case ADD_PRODUCT:
      return _extends({}, state, {
        productToAdd: Object.assign({}, action.payload)
      });
    case UPDATE_CART:
      return _extends({}, state, {
        data: action.payload
      });
    case REMOVE_PRODUCT:
      return _extends({}, state, {
        productToRemove: Object.assign({}, action.payload)
      });
    default:
      return state;
  }
}

var store = redux.createStore(redux.combineReducers({
  cart: CartReducers
}));

var products = [{
  id: 1,
  name: "Flamboyant Pink Top",
  sku: "kskskskks",
  price: 2000
}, {
  id: 2,
  name: "Black and White Stripes Dress",
  sku: "kskskskks",
  price: 3000
}, {
  id: 3,
  name: "Flamboyant Pink Top",
  sku: "kskskskks",
  price: 10000
}, {
  id: 4,
  name: "Flamboyant Pink Top",
  sku: "kskskskks",
  price: 5000
}];

var handleCheckout = function handleCheckout(data) {
  console.log(data);
};

ReactDOM.render(React__default.createElement(
  reactRedux.Provider,
  { store: store },
  React__default.createElement(Cart$1, {
    currencySymbol: "CLP",
    languaje: "es-CL",
    handleCheckout: handleCheckout,
    cartEmptyLabel: "El carrito está vacio",
    cartTextLabel: "Carrito de compras",
    checkoutTextLabel: "Ir a pagar",
    subTotalTextLabel: "Total",
    quantityTextLabel: "Cantidad"
  }),
  React__default.createElement(
    "div",
    null,
    products.map(function (product, key) {
      return React__default.createElement(
        "div",
        { className: "col", key: key },
        React__default.createElement(
          "div",
          { className: "product-item" },
          React__default.createElement(
            "div",
            { className: "pi-pic" },
            React__default.createElement("img", { src: product.image, alt: product.name }),
            React__default.createElement(
              "div",
              { className: "pi-links" },
              React__default.createElement(AddCartButton$1, { product: product })
            )
          ),
          React__default.createElement(
            "div",
            { className: "pi-text" },
            React__default.createElement(
              "p",
              null,
              product.name
            )
          )
        )
      );
    })
  )
), document.getElementById("root"));
//# sourceMappingURL=index.js.map
