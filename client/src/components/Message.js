import React from "react";
import PropTypes from "prop-types";

const Message = ({ msg }) => {
  return (
    <div
      style={{ backgroundColor: "#ea7f7f80", color: "#3f2873" }}
      className="alert  alert-info alert-dismissible fade show"
      role="alert"
    >
      {msg}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Message;
