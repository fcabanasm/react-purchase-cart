import React from "react";
import PropTypes from "prop-types";

const Thumb = props => {
  var thumb;
  if (props.product.thumb) {
    switch (props.product.thumb.type) {
      case "icon":
        thumb = <i className={props.product.thumb.classes} />;
        break;
      case "image":
        thumb = (
          <img
            src={props.product.thumb.src || "https://via.placeholder.com/150"}
            alt={props.product.thumb.alt || props.product.name}
            title={props.product.thumb.title || props.product.name}
          />
        );
        break;
      default:
        break;
    }
  }
  return <div className={props.classes}>{thumb}</div>;
};

Thumb.propTypes = {
  classes: PropTypes.string,
  product: PropTypes.object
};

export default Thumb;
