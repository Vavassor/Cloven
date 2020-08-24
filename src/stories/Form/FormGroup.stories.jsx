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
    <FormControl className="mb-8" inputId="line1" label="Address Line 1">
      <TextField />
    </FormControl>
    <FormControl className="mb-8" inputId="line2" label="Address Line 2">
      <TextField />
    </FormControl>
    <FormControl className="mb-8" inputId="city" label="City">
      <TextField />
    </FormControl>
    <FormControl className="mb-8" inputId="state" label="State">
      <StateSearchSelect {...StateSearchSelect.args} />
    </FormControl>
    <FormControl inputId="zipCode" label="ZIP Code">
      <TextField />
    </FormControl>
  </FormGroup>
);

export const Normal = Template.bind({});

Normal.args = {
  title: "Address",
};
