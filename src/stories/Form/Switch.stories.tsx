import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useState } from "react";
import { Switch, SwitchProps } from "../../Components/Switch";

export default {
  title: "Form/Switch",
  component: Switch,
} as Meta;

const Template: Story<SwitchProps> = (args) => {
  const [isChecked, setIsChecked] = useState(false);
  return <Switch {...args} isChecked={isChecked} handleChange={setIsChecked} />;
};

export const Normal = Template.bind({});

Normal.args = {
  idPrefix: "activate",
  label: "Activate",
};
