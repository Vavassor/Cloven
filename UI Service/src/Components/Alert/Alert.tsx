import React from "react";

export interface AlertProps {}

export const Alert: React.FC<AlertProps> = ({ children }) => {
  return <div role="alert">{children}</div>;
};
