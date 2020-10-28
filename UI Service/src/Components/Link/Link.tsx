import React, { PropsWithChildren } from "react";
import { Link as RouterLink, NavLink } from "react-router-dom";
import { joinClassNames } from "../../Utilities/Style";
import styles from "./styles.module.scss";

type LinkType = "External" | "Internal" | "Nav";

interface LinkProps {
  className?: string;
  to: string;
  type?: LinkType;
}

export const Link = ({
  children,
  className,
  to,
  type = "Internal",
}: PropsWithChildren<LinkProps>) => {
  const props = {
    className: joinClassNames(styles.anchor, className),
  };

  switch (type) {
    case "External":
      return (
        <a {...props} href={to}>
          {children}
        </a>
      );

    case "Internal":
      return (
        <RouterLink {...props} to={to}>
          {children}
        </RouterLink>
      );

    case "Nav":
      return (
        <NavLink {...props} to={to}>
          {children}
        </NavLink>
      );
  }
};
