import { parseLanguageTag } from "../LanguageTag";

describe("parseLanguageTag", () => {
  test("three-letter primary language", () => {
    const cases = ["mas", "ast"];
    for (const tag of cases) {
      const languageTag = parseLanguageTag(tag);
      expect(languageTag?.language).toMatch(tag);
    }
  });

  test("extended language", () => {
    const cases = ["ar-afb", "zh-yue", "zh-min-nan"];
    const parts = [
      { language: "ar", extendedLanguages: ["afb"] },
      { language: "zh", extendedLanguages: ["yue"] },
      { language: "zh", extendedLanguages: ["min", "nan"] },
    ];
    for (let i = 0; i < cases.length; i++) {
      const languageTag = parseLanguageTag(cases[i]);
      const expected = parts[i];
      expect(languageTag?.language).toMatch(expected.language);
      expect(languageTag?.extendedLanguages?.[0]).toMatch(
        expected.extendedLanguages[0]
      );
    }
  });

  test("region", () => {
    const cases = ["en-GB", "es-005", "es-419"];
    const parts = [
      { language: "en", region: "GB" },
      { language: "es", region: "005" },
      { language: "es", region: "419" },
    ];
    for (let i = 0; i < cases.length; i++) {
      const languageTag = parseLanguageTag(cases[i]);
      const expected = parts[i];
      expect(languageTag?.language).toMatch(expected.language);
      expect(languageTag?.region).toMatch(expected.region);
    }
  });

  test("extension", () => {
    const cases = ["ar-u-nu-latn", "gsw-u-sd-chzh", "de-DE-u-co-phonebk"];
    const parts = [
      {
        language: "ar",
        extensions: [
          {
            detail: "nu-latn",
            singleton: "u",
          },
        ],
      },
      {
        language: "gsw",
        extensions: [
          {
            detail: "sd-chzh",
            singleton: "u",
          },
        ],
      },
      {
        language: "de",
        extensions: [
          {
            detail: "co-phonebk",
            singleton: "u",
          },
        ],
      },
    ];
    for (let i = 0; i < cases.length; i++) {
      const languageTag = parseLanguageTag(cases[i]);
      const expected = parts[i];
      expect(languageTag?.language).toMatch(expected.language);
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
    expect(languageTag?.language).toMatch("ttt");
    expect(languageTag?.privateUse).toMatch("ismai");
  });

  test("script", () => {
    const cases = ["zh-Hant-HK"];
    const parts = [{ language: "zh", region: "HK", script: "Hant" }];
    for (let i = 0; i < cases.length; i++) {
      const languageTag = parseLanguageTag(cases[i]);
      const expected = parts[i];
      expect(languageTag?.language).toMatch(expected.language);
      expect(languageTag?.region).toMatch(expected.region);
      expect(languageTag?.script).toMatch(expected.script);
    }
  });
});
