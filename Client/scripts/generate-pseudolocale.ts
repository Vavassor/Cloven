/**
 * Generate pseudolocales based on the default english locale file.
 *
 * https://en.wikipedia.org/wiki/Pseudolocalization
 *
 * The generated file is given the fake ISO 639-1 alpha-2 codes of "xa" and
 * "xb". These are taken from the native Android pseudolocale which use the
 * same codes.
 */
import * as path from "path";
import { createDirectory, readJsonFile, writeJsonFile } from "./filesystem";

const shouldAddBrackets = true;
const localePath = path.join(__dirname, "..", "public/locales");
const sourcePath = path.join(localePath, "en/translation.json");
const xaTargetPath = path.join(localePath, "xa/translation.json");
const xbTargetPath = path.join(localePath, "xb/translation.json");

const translateChar = (value: string) => {
  switch (value) {
    case "a":
      return "á";
    case "b":
      return "β";
    case "c":
      return "ç";
    case "d":
      return "δ";
    case "e":
      return "è";
    case "f":
      return "ƒ";
    case "g":
      return "ϱ";
    case "h":
      return "λ";
    case "i":
      return "ï";
    case "j":
      return "J";
    case "k":
      return "ƙ";
    case "l":
      return "ℓ";
    case "m":
      return "₥";
    case "n":
      return "ñ";
    case "o":
      return "ô";
    case "p":
      return "ƥ";
    case "q":
      return "9";
    case "r":
      return "ř";
    case "s":
      return "ƨ";
    case "t":
      return "ƭ";
    case "u":
      return "ú";
    case "v":
      return "Ʋ";
    case "w":
      return "ω";
    case "x":
      return "ж";
    case "y":
      return "¥";
    case "z":
      return "ƺ";
    case "A":
      return "Â";
    case "B":
      return "ß";
    case "C":
      return "Ç";
    case "D":
      return "Ð";
    case "E":
      return "É";
    case "F":
      return "F";
    case "G":
      return "G";
    case "H":
      return "H";
    case "I":
      return "Ì";
    case "J":
      return "J";
    case "K":
      return "K";
    case "L":
      return "£";
    case "M":
      return "M";
    case "N":
      return "N";
    case "O":
      return "Ó";
    case "P":
      return "Þ";
    case "Q":
      return "Q";
    case "R":
      return "R";
    case "S":
      return "§";
    case "T":
      return "T";
    case "U":
      return "Û";
    case "V":
      return "V";
    case "W":
      return "W";
    case "X":
      return "X";
    case "Y":
      return "Ý";
    case "Z":
      return "Z";
    default:
      return value;
  }
};

const skipBraceSequence = (value: string, i: number) => {
  if (value.slice(i, i + 2) == "{{") {
    for (; i < value.length; i++) {
      if (value.slice(i, i + 2) == "}}") {
        i += 2;
        break;
      }
    }
  }
  return i;
};

const translateString = (value: string, shouldAddBrackets: boolean) => {
  let translation = "";
  for (let i = 0; i < value.length; i++) {
    const indexAfterBraces = skipBraceSequence(value, i);
    if (indexAfterBraces > i) {
      translation += value.slice(i, indexAfterBraces);
      if (indexAfterBraces === value.length) {
        break;
      }
      i = indexAfterBraces;
    }
    translation += translateChar(value[i]);
  }
  if (shouldAddBrackets) {
    return `[!!! ${translation} !!!]`;
  }
  return translation;
};

const reverseString = (value: string) => {
  let reversed = "";
  for (let i = value.length - 1; i >= 0; i--) {
    reversed += value[i];
  }
  return reversed;
};

interface PseudoNamespace {
  [key: string]: string;
}

interface Pseudolocale {
  [namespaceKey: string]: PseudoNamespace;
}

const createPseudolocale = (english: any) => {
  const pseudolocale: Pseudolocale = {};
  for (const namespaceKey in english) {
    const namespace = english[namespaceKey];
    const pseudoNamespace: PseudoNamespace = {};
    for (const textKey in namespace) {
      const text = namespace[textKey];
      pseudoNamespace[textKey] = translateString(text, shouldAddBrackets);
    }
    pseudolocale[namespaceKey] = pseudoNamespace;
  }
  return pseudolocale;
};

const createReversePseudolocale = (english: any) => {
  const reversed: Pseudolocale = {};
  for (const namespaceKey in english) {
    const namespace = english[namespaceKey];
    const reversedNamespace: PseudoNamespace = {};
    for (const textKey in namespace) {
      const text = namespace[textKey];
      reversedNamespace[textKey] = reverseString(text);
    }
    reversed[namespaceKey] = reversedNamespace;
  }
  return reversed;
};

const main = async () => {
  const english = await readJsonFile(sourcePath);
  const pseudolocale = createPseudolocale(english);
  const reversed = createReversePseudolocale(english);
  await createDirectory(path.join(localePath, "xa"));
  await createDirectory(path.join(localePath, "xb"));
  await writeJsonFile(xaTargetPath, pseudolocale);
  await writeJsonFile(xbTargetPath, reversed);
};

main();
