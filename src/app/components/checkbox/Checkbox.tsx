"use client";

import { FunctionComponent } from "react";
import styles from "./checkbox.module.scss";
import classNames from "classnames";

export type CheckedState = "checked" | "partial" | "unchecked";

interface CheckboxProps {
  className?: string;
  checkedState: CheckedState;
  onClick?: () => void;
}

const Checkbox: FunctionComponent<CheckboxProps> = ({
  checkedState,
  className,
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
      })}
      onClick={onClick}
      role="checkbox"
      aria-checked={getCheckedAriaState()}
      aria-label="Select"
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
