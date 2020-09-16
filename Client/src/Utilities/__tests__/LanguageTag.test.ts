import { parseLanguageTag } from "../LanguageTag";

describe("parseLanguageTag", () => {
  test("two-letter primary language", () => {
    const languageTag = parseLanguageTag("jp");
    expect(languageTag?.language).toMatch("jp");
  });

  test("three-letter primary language", () => {
    const cases = ["mas", "ast"];
    for (const tag of cases) {
      const languageTag = parseLanguageTag(tag);
      expect(languageTag?.language).toMatch(tag);
    }
  });

  test("truncated primary language", () => {
    expect(parseLanguageTag("b")).toBeNull();
  });

  test("primary language is too long", () => {
    expect(parseLanguageTag("generation")).toBeNull();
  });

  test("extended language", () => {
    const cases = ["ar-afb", "zh-yue", "zh-min-nan"];
    const parts = [
      { extendedLanguages: ["afb"] },
      { extendedLanguages: ["yue"] },
      { extendedLanguages: ["min", "nan"] },
    ];
    for (let i = 0; i < cases.length; i++) {
      const languageTag = parseLanguageTag(cases[i]);
      const expected = parts[i];
      for (let j = 0; j < expected.extendedLanguages.length; j++) {
        expect(languageTag?.extendedLanguages?.[j]).toMatch(
          expected.extendedLanguages[j]
        );
      }
    }
  });

  test("region", () => {
    const cases = ["en-GB", "es-005", "es-419"];
    const expected = ["GB", "005", "419"];
    for (let i = 0; i < cases.length; i++) {
      const languageTag = parseLanguageTag(cases[i]);
      expect(languageTag?.region).toMatch(expected[i]);
    }
  });

  test("region shouldn't mix alphabetic and numeric characters", () => {
    expect(parseLanguageTag("es-39B")).toBeNull();
  });

  test("extension", () => {
    const cases = [
      "ar-u-nu-latn",
      "gsw-u-sd-chzh",
      "de-DE-u-co-phonebk",
      "he-IL-u-ca-hebrew-tz-jeruslm",
      "zh-t-i0-pinyin",
    ];
    const parts = [
      {
        extensions: [
          {
            detail: "nu-latn",
            singleton: "u",
          },
        ],
      },
      {
        extensions: [
          {
            detail: "sd-chzh",
            singleton: "u",
          },
        ],
      },
      {
        extensions: [
          {
            detail: "co-phonebk",
            singleton: "u",
          },
        ],
      },
      {
        extensions: [
          {
            detail: "ca-hebrew-tz-jeruslm",
            singleton: "u",
          },
        ],
      },
      {
        extensions: [
          {
            detail: "i0-pinyin",
            singleton: "t",
          },
        ],
      },
    ];
    for (let i = 0; i < cases.length; i++) {
      const languageTag = parseLanguageTag(cases[i]);
      const expected = parts[i];
      expect(languageTag?.extensions?.[0].detail).toMatch(
        expected.extensions[0].detail
      );
      expect(languageTag?.extensions?.[0].singleton).toMatch(
        expected.extensions[0].singleton
      );
    }
  });

  test("private use", () => {
    const languageTag = parseLanguageTag("ttt-x-ismai");
    expect(languageTag?.privateUse).toMatch("ismai");
  });

  test("private use subtag may contain hyphens", () => {
    const languageTag = parseLanguageTag(
      "zh-yue-Latn-CN-pinyin-a-extend1-x-foobar-private1"
    );
    expect(languageTag?.privateUse).toMatch("foobar-private1");
  });

  test("script", () => {
    const cases = [
      "zh-Hant-HK",
      "zh-yue-Latn-CN-pinyin-a-extend1-x-foobar-private1",
      "sr-Cyrl-CS",
    ];
    const expected = ["Hant", "Latn", "Cyrl"];
    for (let i = 0; i < cases.length; i++) {
      const languageTag = parseLanguageTag(cases[i]);
      expect(languageTag?.script).toMatch(expected[i]);
    }
  });

  test("variant", () => {
    const languageTag = parseLanguageTag("nn-hognorsk");
    expect(languageTag?.variants?.[0]).toMatch("hognorsk");
  });

  test("variant may contain a date", () => {
    const languageTag = parseLanguageTag("pt-BR-colb1945");
    expect(languageTag?.variants?.[0]).toMatch("colb1945");
  });
});
