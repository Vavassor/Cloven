export interface ErrorAdo {
  errors: ErrorSingle[];
}

export interface ErrorSingle {
  details?: string;
  message: string;
}

export const isErrorAdo = (errorAdo: any): errorAdo is ErrorAdo => {
  return typeof errorAdo === "object" && errorAdo.errors !== undefined;
};
