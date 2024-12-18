"use client";

import { FunctionComponent } from "react";
import styles from "./checkbox.module.scss";
import classNames from "classnames";

export type CheckedState = "checked" | "partial" | "unchecked";

interface CheckboxProps {
  ariaLabel?: string;
  className?: string;
  checkedState: CheckedState;
  disabled?: boolean;
  onClick?: () => void;
}

const Checkbox: FunctionComponent<CheckboxProps> = ({
  ariaLabel,
  checkedState,
  className,
  disabled,
  onClick,
}) => {
  const getCheckedAriaState = () => {
    switch (checkedState) {
      case "checked":
        return "true";
      case "partial":
        return "mixed";
      default:
        return "false";
    }
  };

  return (
    <button
      className={classNames(styles.checkbox, className, {
        [styles.active]: checkedState !== "unchecked",
        [styles.disabled]: disabled,
      })}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      role="checkbox"
      aria-checked={getCheckedAriaState()}
      aria-label={ariaLabel ?? "Select"}
    >
      {checkedState === "checked" && (
        <i className={classNames("bi-check2", styles["check-icon"])} />
      )}
      {checkedState === "partial" && (
        <i className={classNames("bi-dash", styles["check-icon"])} />
      )}
    </button>
  );
};

export default Checkbox;
