import { parseLanguageTag } from "../src/Utilities/LanguageTag";
import { readTextFile } from "./filesystem";

const main = async () => {
  const fileContent = await readTextFile("scripts/test-language-tags.txt");
  const languageTags = fileContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  for (const languageTagString of languageTags) {
    const languageTag = parseLanguageTag(languageTagString);
    const formattedTag = JSON.stringify(languageTag);
    console.log(formattedTag);
  }
};

main();
