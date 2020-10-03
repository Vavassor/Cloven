import { useEffect } from "react";
import {
  addErrorHandler,
  ErrorHandler,
  removeErrorHandler,
} from "../ErrorHandler";
import { logError } from "../Logging";

export const useErrorHandler = () => {
  useEffect(() => {
    const errorHandler: ErrorHandler = (event) => {
      const { error } = event;
      logError("Unhanded error occurred.", error);
    };

    addErrorHandler(errorHandler);
    
    return () => {
      removeErrorHandler(errorHandler);
    };
  }, []);
};
