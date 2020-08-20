import React, { PropsWithChildren } from "react";
import { joinClassNames } from "../../Utilities/Style";
import styles from "./styles.module.scss";

interface LinkProps {
  className?: string;
  to: string;
}

export const Link = ({
  children,
  className,
  to,
}: PropsWithChildren<LinkProps>) => {
  return (
    <a className={joinClassNames(styles.anchor, className)} href={to}>
      {children}
    </a>
  );
};
