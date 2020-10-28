import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useState } from "react";
import { Checkbox, CheckboxProps } from "../../Components/Checkbox";

export default {
  title: "Form/Checkbox",
  component: Checkbox,
} as Meta;

const Template: Story<CheckboxProps> = (args) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Checkbox {...args} handleChange={setIsChecked} isChecked={isChecked} />
  );
};

export const Normal = Template.bind({});

Normal.args = {
  id: "agreement",
  isRequired: true,
  label: "I agree to the Terms and Conditions.",
  name: "agreement",
  value: "true",
};
