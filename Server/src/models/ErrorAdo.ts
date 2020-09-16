export interface ErrorAdo {
  errors: ErrorSingle[];
}

export interface ErrorSingle {
  details?: string;
  message: string;
}
