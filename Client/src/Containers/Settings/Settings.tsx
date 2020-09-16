import i18next from "i18next";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormControl } from "../../Components/FormControl";
import { Select } from "../../Components/Select";
import { Option } from "../../Components/SelectList";
import { Switch } from "../../Components/Switch";
import { setTheme, ThemeDispatch } from "../../Contexts/ThemeDispatch";

const languages = [
  { name: "English", tag: "en" },
  { name: "العربية", tag: "ar" },
];

const languageOptions: Option[] = languages.map((language) => ({
  id: language.tag,
  label: language.name,
  value: language.name,
}));

const DarkModeSwitch = () => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useContext(ThemeDispatch);

  const handleChange = (newIsPressed: boolean) => {
    setIsPressed(newIsPressed);
    dispatch(setTheme(newIsPressed ? "DARK" : "LIGHT"));
  };

  return (
    <Switch
      handleChange={handleChange}
      idPrefix="dark-mode"
      isChecked={isPressed}
      label="Dark Mode"
    />
  );
};

const LanguageField = () => {
  const [selectedOption, setSelectedOption] = useState(
    languageOptions.find((option) => option.id === i18next.language) ||
      languageOptions[0]
  );
  const { t } = useTranslation();

  const handleChange = (option: Option) => {
    setSelectedOption(option);
    i18next.changeLanguage(option.id);
  };

  return (
    <FormControl inputId="language" label={t("settings.languageFieldLabel")}>
      <Select
        handleChange={handleChange}
        options={languageOptions}
        value={selectedOption}
      />
    </FormControl>
  );
};

export const Settings = () => {
  return (
    <>
      <DarkModeSwitch />
      <LanguageField />
    </>
  );
};
