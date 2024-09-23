import React from "react";

function Toast({ type, message }) {
  return (
    <div>
      <div className={`toast toast-top toast-end`}>
        <div className={`alert alert-${type}`}>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}

export default Toast;
