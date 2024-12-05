import classNames from "classnames";
import React, { ReactNode } from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "light"
    | "dark"
    | "link"
    | "none";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}
export const GlobalButton = ({
  children,
  size = "md",
  variant = "primary",
  disabled = false,
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={classNames(
        `btn btn-${size} btn-${variant}`,
        variant === "none" && styles.disabledBtn
      )}
    >
      {children}
    </button>
  );
};
