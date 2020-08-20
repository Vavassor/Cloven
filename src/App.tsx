import React, { ChangeEventHandler, useReducer, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./App.module.scss";
import countries from "./Assets/countries.json";
import states from "./Assets/states.json";
import { CheckboxGroup } from "./Components/CheckboxGroup";
import { Dialog } from "./Components/Dialog/Dialog";
import { FormControl } from "./Components/FormControl";
import { Link } from "./Components/Link";
import { MultiSelect } from "./Components/MultiSelect";
import { Popover } from "./Components/Popover";
import { RadioGroup } from "./Components/RadioGroup";
import { SearchSelect } from "./Components/SearchSelect";
import { MultiSearchSelect } from "./Components/SearchSelect/MultiSearchSelect";
import { Select } from "./Components/Select";
import { Option } from "./Components/SelectList";
import { TextField } from "./Components/TextField";
import {
  initialThemeState,
  ThemeContext,
  themeReducer,
} from "./Contexts/ThemeContext";
import { ThemeDispatch } from "./Contexts/ThemeDispatch";
import { useLocaleSetup } from "./Utilities/Hooks/useLocaleSetup";
import { toKebabCase } from "./Utilities/String";
import { StyledDiv, StyledMain } from "./Utilities/StyleWrappers";

const Main = StyledMain(styles.main);
const Menu = StyledDiv(styles.menu);
const AppContainer = StyledDiv(styles.app);

interface Country {
  abbreviation: string;
  name: string;
}

const getCountryOptions = (countries: Country[]): Option[] => {
  return countries.map((country) => {
    return {
      label: country.name,
      id: country.abbreviation,
      value: country.name,
    };
  });
};

interface State {
  abbreviation: string;
  name: string;
}

const getStateOptions = (states: State[]): Option[] => {
  return states.map((state) => {
    return {
      label: state.name,
      id: state.abbreviation,
      value: state.abbreviation,
    };
  });
};

interface Game {
  label: string;
}

const getGameOptions = (games: Game[]): Option[] => {
  return games.map((game) => {
    const { label } = game;
    return {
      label,
      id: toKebabCase(label),
      value: label,
    };
  });
};

const options: Game[] = [
  { label: "Halo" },
  { label: "Counter Strike" },
  { label: "Unreal Tournament" },
  { label: "Banjo Kazooie" },
  { label: "Donkey Kong Country" },
  { label: "Super Mario World" },
];

const games = getGameOptions(options);

const getStringOptions = (values: string[]): Option[] => {
  return values.map((value) => {
    return {
      label: value,
      id: toKebabCase(value),
      value,
    };
  });
};

const pizzaOptions = [
  "Extra cheese",
  "Extra sauce",
  "Light sauce",
  "Thin crust",
  "Well done",
];

const renderWows = () => {
  const wow = [];
  for (let i = 0; i < 25; i++) {
    wow.push(<p key={i}>Wow</p>);
  }
  return wow;
};

const App = () => {
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    initialThemeState
  );
  const main = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const [name, setName] = useState("");
  useLocaleSetup(themeDispatch);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setAnchor(null);
    setIsOpen(false);
  };

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.currentTarget.value);
  };

  const tagsLabelId = "tags-label";

  return (
    <ThemeContext.Provider value={themeState}>
      <ThemeDispatch.Provider value={themeDispatch}>
        <AppContainer>
          <header>
            <h1>Cloven</h1>
          </header>
          <Main ref={main} id="yoyo">
            <button onClick={handleClick} type="button">
              Toggle Menu
            </button>
            <Popover
              anchor={anchor}
              anchorPlacement={{
                horizontal: "left",
                vertical: "bottom",
              }}
              container={main.current}
              isOpen={isOpen}
              handleClose={handleClose}
            >
              <Menu>
                <label>
                  <input type="text" />
                </label>
              </Menu>
            </Popover>
            <DialogSample />
            <FormControl
              className={styles.formControl}
              inputId="games"
              label="Games"
            >
              <Select options={getGameOptions(games)} />
            </FormControl>
            <FormControl
              className={styles.formControl}
              inputId="state"
              label="State"
              labelProps={{
                Component: "span",
              }}
            >
              <Select options={getStateOptions(states)} />
            </FormControl>
            <FormControl
              className={styles.formControl}
              inputId="pizza-options"
              label="Pizza options"
            >
              <MultiSelect options={getStringOptions(pizzaOptions)} />
            </FormControl>
            <FormControl
              className={styles.formControl}
              inputId="country"
              label="Country"
            >
              <SearchSelect
                idPrefix="countries"
                isValueRestrictedToOptions={false}
                options={getCountryOptions(countries)}
              />
            </FormControl>
            <FormControl
              className={styles.formControl}
              inputId="countries"
              label="Countries"
            >
              <MultiSearchSelect
                idPrefix="tags"
                labelId={tagsLabelId}
                options={getCountryOptions(countries)}
              />
            </FormControl>
            <FormControl
              className={styles.formControl}
              inputId="name"
              isRequired={true}
              help="suppose something is going on"
              label="Name"
            >
              <TextField handleChange={handleChangeName} value={name} />
            </FormControl>
            <FormControl
              className={styles.formControl}
              inputId="burger"
              label="Burger"
              labelProps={{
                Component: "span",
              }}
            >
              <RadioGroup
                name="burger"
                options={[
                  { id: "veggie", label: "Veggie", value: "veggie" },
                  { id: "cheese", label: "Cheese", value: "cheese" },
                  { id: "ham", label: "Ham", value: "ham" },
                ]}
              />
            </FormControl>
            <FormControl
              className={styles.formControl}
              error="Please don't select anything."
              help="Select all that apply."
              inputId="fruit"
              label="Fruit"
              labelProps={{
                Component: "span",
              }}
            >
              <CheckboxGroup
                name="fruit"
                options={[
                  { id: "apple", label: "Apple", value: "apple" },
                  { id: "pear", label: "Pear", value: "pear" },
                  { id: "orange", label: "Orange", value: "orange" },
                ]}
              />
            </FormControl>
            <LinkSample />
            {renderWows()}
          </Main>
        </AppContainer>
      </ThemeDispatch.Provider>
    </ThemeContext.Provider>
  );
};

const LinkSample = () => {
  const { t } = useTranslation();
  return <Link to="#">{t("dashboard.snakeDance")}</Link>;
};

const DialogSample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const titleId = "dialog-title";

  const handleClick = () => {
    setIsOpen((priorIsOpen) => !priorIsOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={handleClick} type="button">
        Open dialog
      </button>
      <Dialog handleClose={handleClose} isOpen={isOpen} labelId={titleId}>
        <h2 id={titleId}>What what</h2>
        {renderWows()}
        <button type="submit">{t("generic.ok")}</button>
      </Dialog>
    </>
  );
};

export default App;
