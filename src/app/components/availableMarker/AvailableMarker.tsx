import classNames from "classnames";
import { FunctionComponent } from "react";
import styles from "./availableMarker.module.scss";

interface AvailableMarkerProps {
  available?: boolean;
  className?: string;
}

const AvailableMarker: FunctionComponent<AvailableMarkerProps> = ({
  className,
  available,
}) => (
  <div
    role="img"
    aria-label="available"
    aria-hidden={!available}
    className={classNames(className, styles["available-marker"], {
      [styles.visible]: available,
    })}
  />
);

export default AvailableMarker;
