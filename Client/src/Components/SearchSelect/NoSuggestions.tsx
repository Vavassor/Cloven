import React, { PropsWithChildren } from "react";
import styles from "./NoSuggestions.module.scss";

export const NoSuggestions = ({ children }: PropsWithChildren<{}>) => {
  return <li className={styles.listItem}>{children}</li>;
};
