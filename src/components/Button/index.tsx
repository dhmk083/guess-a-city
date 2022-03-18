import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

const Button: React.FC<ButtonHTMLAttributes<any>> = ({ children, ...rest }) => (
  <button {...rest} className={cn(styles.button, rest.className)}>
    {children}
  </button>
);

export default Button;
