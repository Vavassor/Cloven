import React from "react";
import { FormControl } from "../../Components/FormControl";
import { Normal as UnlabeledRadioGroup } from "./RadioGroup.stories";
import { Unlabeled as UnlabeledTextField } from "./TextField.stories";

export default {
  title: "Form/FormControl",
  component: FormControl,
};

const RadioGroupTemplate = (args) => (
  <FormControl {...args}>
    <UnlabeledRadioGroup {...UnlabeledRadioGroup.args} />
  </FormControl>
);

export const RadioGroup = RadioGroupTemplate.bind({});

RadioGroup.args = {
  inputId: "fruit",
  label: "Fruit",
};

const TextFieldTemplate = (args) => (
  <FormControl {...args}>
    <UnlabeledTextField {...UnlabeledTextField.args} />
  </FormControl>
);

export const TextField = TextFieldTemplate.bind({});

TextField.args = {
  inputId: "username",
  label: "Username",
};
