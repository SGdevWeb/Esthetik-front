import React from "react";
import styles from "./Button.module.scss";

const Button = ({ children, color, onClick, style, ...props }) => {
  const buttonStyle = {
    backgroundColor: color,
    borderColor: color,
    ...style,
  };

  return (
    <button
      className={styles.button}
      style={buttonStyle}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
