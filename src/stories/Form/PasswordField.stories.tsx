import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import {
  PasswordField,
  PasswordFieldProps,
} from "../../Components/PasswordField";

export default {
  title: "Form/PasswordField",
  component: PasswordField,
} as Meta;

const Template: Story<PasswordFieldProps> = (args) => (
  <PasswordField {...args} />
);

export const Unlabeled = Template.bind({});

Unlabeled.args = {
  name: "password-field",
};
