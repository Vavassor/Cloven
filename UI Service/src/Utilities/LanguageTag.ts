import * as Array from "./Array";

interface Extension {
  detail: string;
  singleton: string;
}

/** IETF BCP 47 language tag */
export interface LanguageTag {
  extendedLanguages?: string[];
  extensions?: Extension[];
  language: string;
  privateUse?: string;
  region?: string;
  script?: string;
  variants?: string[];
}

interface Parser {
  hasError: boolean;
  languageTag: LanguageTag;
  subtagIndex: number;
  subtags: string[];
}

const isAlphabeticChar = (char: string) => {
  return (char >= "A" && char <= "Z") || (char >= "a" && char <= "z");
};

const isAlphabetic = (value: string) => {
  for (let i = 0; i < value.length; i++) {
    if (!isAlphabeticChar(value.charAt(i))) {
      return false;
    }
  }
  return true;
};

const isAlphanumericChar = (char: string) => {
  return isAlphabeticChar(char) || isNumericChar(char);
};

const isAlphanumeric = (value: string) => {
  for (let i = 0; i < value.length; i++) {
    if (!isAlphanumericChar(value.charAt(i))) {
      return false;
    }
  }
  return true;
};

const isNumericChar = (char: string) => {
  return char >= "0" && char <= "9";
};

const isNumeric = (value: string) => {
  for (let i = 0; i < value.length; i++) {
    if (!isNumericChar(value.charAt(i))) {
      return false;
    }
  }
  return true;
};

const matchExtendedLanguage = (subtag: string) => {
  return subtag.length === 3 && isAlphabetic(subtag);
};

const matchExtensionHead = (subtag: string) => {
  return (
    subtag.length === 1 &&
    isAlphanumericChar(subtag) &&
    subtag !== "x" &&
    subtag !== "X"
  );
};

const matchExtensionSegment = (subtag: string) => {
  return subtag.length >= 2 && subtag.length <= 8;
};

const matchLanguage = (subtag: string) => {
  return subtag.length >= 2 && subtag.length <= 8 && isAlphabetic(subtag);
};

const matchPrivateUseHead = (subtag: string) => {
  return subtag === "x" || subtag === "X";
};

const matchPrivateUseSegment = (subtag: string) => {
  return subtag.length >= 1 && subtag.length <= 8 && isAlphanumeric(subtag);
};

const matchRegion = (subtag: string) => {
  return (
    (subtag.length === 2 && isAlphabetic(subtag)) ||
    (subtag.length === 3 && isNumeric(subtag))
  );
};

const matchScript = (subtag: string) => {
  return subtag.length === 4 && isAlphabetic(subtag);
};

const matchVariantLength4 = (subtag: string) => {
  return (
    subtag.length === 4 &&
    isNumericChar(subtag.charAt(0)) &&
    isAlphanumeric(subtag.slice(1))
  );
};

const matchVariantLonger = (subtag: string) => {
  return subtag.length >= 5 && subtag.length <= 8 && isAlphanumeric(subtag);
};

const nextSubtag = (parser: Parser): string | null => {
  const { subtags, subtagIndex } = parser;
  return subtagIndex < subtags.length ? subtags[subtagIndex] : null;
};

const parseExtendedLanguages = (parser: Parser) => {
  const { languageTag, subtags } = parser;

  if (subtags.length === 1 || languageTag.language.length > 3) {
    return;
  }

  let { subtagIndex } = parser;
  const endIndex = subtags.length - subtagIndex;
  for (let i = 0; i < Math.min(endIndex, 3); i++) {
    const subtag = subtags[subtagIndex];
    if (!matchExtendedLanguage(subtag)) {
      break;
    }
    languageTag.extendedLanguages = Array.push(
      languageTag.extendedLanguages,
      subtag
    );
    subtagIndex++;
  }
  parser.subtagIndex = subtagIndex;
};

const parseExtensionSegments = (parser: Parser) => {
  const { subtags } = parser;
  let { subtagIndex } = parser;
  let extensionParts: string[] = [];
  for (let i = subtagIndex; i < subtags.length; i++) {
    const subtag = subtags[i];
    if (!matchExtensionSegment(subtag)) {
      break;
    }
    extensionParts = Array.push(extensionParts, subtag);
    subtagIndex++;
  }
  parser.subtagIndex = subtagIndex;
  return extensionParts;
};

const parseExtensions = (parser: Parser) => {
  const { languageTag, subtags } = parser;
  let { subtagIndex } = parser;
  for (let i = subtagIndex; i < subtags.length; i++) {
    const subtag = subtags[i];
    if (!matchExtensionHead(subtag)) {
      break;
    }
    parser.subtagIndex++;
    const head = subtag;
    const segments = parseExtensionSegments(parser);
    if (segments.length === 0) {
      parser.hasError = true;
      break;
    }
    subtagIndex = parser.subtagIndex;
    const extension: Extension = {
      detail: segments.join("-"),
      singleton: head,
    };
    languageTag.extensions = Array.push(languageTag.extensions, extension);
    i = subtagIndex - 1;
  }
  parser.subtagIndex = subtagIndex;
};

const parsePrivateUseSegments = (parser: Parser) => {
  const { subtags } = parser;
  let { subtagIndex } = parser;
  let segmentParts: string[] = [];
  for (let i = subtagIndex; i < subtags.length; i++) {
    const subtag = subtags[i];
    if (!matchPrivateUseSegment(subtag)) {
      break;
    }
    segmentParts = Array.push(segmentParts, subtag);
    subtagIndex++;
  }
  parser.subtagIndex = subtagIndex;
  return segmentParts;
};

const parsePrivateUse = (parser: Parser) => {
  const head = nextSubtag(parser);
  if (!head || !matchPrivateUseHead(head)) {
    return;
  }
  parser.subtagIndex++;

  const segments = parsePrivateUseSegments(parser);
  if (segments.length === 0) {
    parser.hasError = true;
    return;
  }

  parser.languageTag.privateUse = segments.join("-");
};

const parseRegion = (parser: Parser) => {
  const subtag = nextSubtag(parser);
  if (!subtag) {
    return;
  }
  if (matchRegion(subtag)) {
    parser.languageTag.region = subtag;
    parser.subtagIndex++;
  }
};

const parseScript = (parser: Parser) => {
  const subtag = nextSubtag(parser);
  if (!subtag) {
    return;
  }
  if (matchScript(subtag)) {
    parser.languageTag.script = subtag;
    parser.subtagIndex++;
  }
};

const parseVariants = (parser: Parser) => {
  const { languageTag, subtags } = parser;
  let { subtagIndex } = parser;
  for (let i = subtagIndex; i < subtags.length; i++) {
    const subtag = subtags[i];
    if (!matchVariantLength4(subtag) && !matchVariantLonger(subtag)) {
      break;
    }
    languageTag.variants = Array.push(languageTag.variants, subtag);
    subtagIndex++;
  }
  parser.subtagIndex = subtagIndex;
};

export const parseLanguageTag = (value: string): LanguageTag | null => {
  const subtags = value.split("-");
  if (subtags.length === 0) {
    return null;
  }

  const language = subtags[0];
  if (!matchLanguage(language)) {
    return null;
  }

  const parser: Parser = {
    hasError: false,
    languageTag: {
      language,
    },
    subtagIndex: 1,
    subtags,
  };

  parseExtendedLanguages(parser);
  parseScript(parser);
  parseRegion(parser);
  parseVariants(parser);
  parseExtensions(parser);
  parsePrivateUse(parser);

  if (parser.hasError || parser.subtagIndex !== parser.subtags.length) {
    return null;
  }

  return parser.languageTag;
};
