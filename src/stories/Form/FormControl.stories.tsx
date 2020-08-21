import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { FormControl, FormControlProps } from "../../Components/FormControl";
import { Unlabeled as UnlabeledTextField } from "./TextField.stories";

export default {
  title: "Form/FormControl",
  component: FormControl,
} as Meta;

const Template: Story<FormControlProps> = (args) => (
  <FormControl {...args}>
    <UnlabeledTextField {...UnlabeledTextField.args} />
  </FormControl>
);

export const TextField = Template.bind({});

TextField.args = {
  inputId: "username",
  label: "Username",
};
