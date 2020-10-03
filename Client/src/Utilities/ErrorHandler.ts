export type ErrorHandler = (event: ErrorEvent) => void;

export const addErrorHandler = (errorHandler: ErrorHandler) => {
  window.addEventListener("error", errorHandler);
};

export const removeErrorHandler = (errorHandler: ErrorHandler) => {
  window.removeEventListener("error", errorHandler);
};
