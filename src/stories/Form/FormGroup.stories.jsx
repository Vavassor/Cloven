import React from "react";
import { FormControl } from "../../Components/FormControl";
import { FormGroup } from "../../Components/FormGroup";
import { TextField } from "../../Components/TextField";
import { Normal as StateSearchSelect } from "./SearchSelect.stories";

export default {
  title: "Form/FormGroup",
  component: FormGroup,
};

const Template = (args) => (
  <FormGroup {...args}>
    <FormControl
      className="gap-y-16"
      help="Street address, P.O. box, company name, c/o"
      inputId="addressLine1"
      isRequired={true}
      label="Address Line 1"
    >
      <TextField />
    </FormControl>
    <FormControl
      className="gap-y-16"
      help="Apartment, suite, unit, building, floor, etc."
      inputId="addressLine2"
      label="Address Line 2"
    >
      <TextField />
    </FormControl>
    <FormControl
      className="gap-y-16"
      inputId="city"
      isRequired={true}
      label="City"
    >
      <TextField />
    </FormControl>
    <FormControl
      className="gap-y-16"
      inputId="state"
      isRequired={true}
      label="State"
    >
      <StateSearchSelect {...StateSearchSelect.args} />
    </FormControl>
    <FormControl
      className="gap-y-16"
      inputId="zipCode"
      isRequired={true}
      label="ZIP Code"
    >
      <TextField />
    </FormControl>
  </FormGroup>
);

export const Normal = Template.bind({});

Normal.args = {
  title: "Address",
};
