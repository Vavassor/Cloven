import { createContext } from "react";

export interface FormControlState {
  errorId?: string;
  hasError: boolean;
  helpId?: string;
  inputId: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  labelId: string;
}

const initialFormControlState: FormControlState = {
  hasError: false,
  inputId: "",
  labelId: "",
};

export const FormControlContext = createContext(initialFormControlState);
