import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { FormControl, FormControlProps } from "../../Components/FormControl";
import { Normal as UnlabeledRadioGroup } from "./RadioGroup.stories";
import { Unlabeled as UnlabeledTextField } from "./TextField.stories";

export default {
  title: "Form/FormControl",
  component: FormControl,
} as Meta;

const RadioGroupTemplate: Story<FormControlProps> = (args) => (
  <FormControl {...args}>
    <UnlabeledRadioGroup name="" options={[]} {...UnlabeledRadioGroup.args} />
  </FormControl>
);

export const RadioGroup = RadioGroupTemplate.bind({});

RadioGroup.args = {
  inputId: "fruit",
  label: "Fruit",
};

const TextFieldTemplate: Story<FormControlProps> = (args) => (
  <FormControl {...args}>
    <UnlabeledTextField {...UnlabeledTextField.args} />
  </FormControl>
);

export const TextField = TextFieldTemplate.bind({});

TextField.args = {
  inputId: "username",
  label: "Username",
};
