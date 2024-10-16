import { test, expect } from "vitest";
import {
  Case,
  camelCase,
  capitalCase,
  cobolCase,
  constantCase,
  dotCase,
  kebabCase,
  noCase,
  pascalCase,
  pascalSnakeCase,
  pathCase,
  snakeCase,
  trainCase,
} from "./index.ts";

test(`camelCase`, () => {
  const caseObj = Case("Hello, World! This is a test. How are you?");
  expect(camelCase("Hello, World")).toEqual("helloWorld");
  expect(caseObj.camelCase()).toEqual("helloWorldThisIsATestHowAreYou");
  expect(Case("Привет, Мир! Это тест. Как дела?").camelCase()).toEqual("приветМирЭтоТестКакДела");
  expect(Case("3GreenHouseIs_mine").camelCase()).toEqual("3GreenHouseIsMine");
  expect(camelCase("wHat is_)(a camel case?")).toEqual("wHatIsACamelCase");
  expect(camelCase("Монгол Улс")).toEqual("монголУлс");

  expect(camelCase("sadfBDfsadf")).toEqual("sadfBDfsadf");
});

test("capitalCase", () => {
  const caseObj = Case("Hello, World! This is a test. How are you?");
  expect(capitalCase("Hello, World")).toEqual("Hello World");
  expect(caseObj.capitalCase()).toEqual("Hello World This Is A Test How Are You");
  expect(Case("Привет, Мир! Это тест. Как дела?").capitalCase()).toEqual("Привет Мир Это Тест Как Дела");
  expect(Case("3GreenHouseIs_mine").capitalCase()).toEqual("3 Green House Is Mine");
  expect(capitalCase("wHat is_)(a capital case?")).toEqual("W Hat Is A Capital Case");
  expect(capitalCase("Монгол Улс")).toEqual("Монгол Улс");

  expect(capitalCase("")).toEqual("");

  expect(capitalCase("\n")).toEqual("");
  expect(capitalCase("$$abc")).toEqual("Abc");

  expect(capitalCase("你好，世界！这是一次测试。你好吗？")).toEqual("你好 世界 这是一次测试 你好吗");

  expect(capitalCase("sadfBDfsadf")).toEqual("Sadf B Dfsadf");
});

test("cobolCase", () => {
  const caseObj = Case("Hello, World! This is a test. How are you?");
  expect(cobolCase("Hello, World")).toEqual("HELLO-WORLD");
  expect(caseObj.cobolCase()).toEqual("HELLO-WORLD-THIS-IS-A-TEST-HOW-ARE-YOU");
  expect(Case("Привет, Мир! Это тест. Как дела?").cobolCase()).toEqual("ПРИВЕТ-МИР-ЭТО-ТЕСТ-КАК-ДЕЛА");
});

test("constantCase", () => {
  const caseObj = Case("Hello, World! This is a test. How are you?");
  expect(constantCase("Hello, World")).toEqual("HELLO_WORLD");
  expect(caseObj.constantCase()).toEqual("HELLO_WORLD_THIS_IS_A_TEST_HOW_ARE_YOU");
  expect(Case("Привет, Мир! Это тест. Как дела?").constantCase()).toEqual("ПРИВЕТ_МИР_ЭТО_ТЕСТ_КАК_ДЕЛА");
  expect(constantCase("3GreenHouseIs_mine_44")).toEqual("3_GREEN_HOUSE_IS_MINE_44");
  expect(constantCase("wHat is_)(a constant case?")).toEqual("W_HAT_IS_A_CONSTANT_CASE");
  expect(constantCase("Монгол Улс")).toEqual("МОНГОЛ_УЛС");
});

test("dotCase", () => {
  const caseObj = Case("Hello, World! This is a test. How are you?");
  expect(dotCase("Hello, World")).toEqual("hello.world");
  expect(caseObj.dotCase()).toEqual("hello.world.this.is.a.test.how.are.you");
  expect(Case("Привет, Мир! Это тест. Как дела?").dotCase()).toEqual("привет.мир.это.тест.как.дела");
  expect(dotCase("3GreenHouseIs_mine_44")).toEqual("3.green.house.is.mine.44");
  expect(dotCase("wHat is_)(a dot case?")).toEqual("w.hat.is.a.dot.case");
  expect(dotCase("Монгол Улс")).toEqual("монгол.улс");
});

test("kebabCase", () => {
  const caseObj = Case("Hello, World! This is a test. How are you?");
  expect(kebabCase("Hello, World")).toEqual("hello-world");
  expect(caseObj.kebabCase()).toEqual("hello-world-this-is-a-test-how-are-you");
  expect(Case("Привет, Мир! Это тест. Как дела?").kebabCase()).toEqual("привет-мир-это-тест-как-дела");
  expect(kebabCase("3GreenHouseIs_mine_44")).toEqual("3-green-house-is-mine-44");
  expect(kebabCase("wHat is_)(a kebab case?")).toEqual("w-hat-is-a-kebab-case");
  expect(kebabCase("Монгол Улс")).toEqual("монгол-улс");
});

test("noCase", () => {
  const caseObj = Case("Hello, World! This is a test. How are you?");
  expect(noCase("Hello, World")).toEqual("hello world");
  expect(caseObj.noCase()).toEqual("hello world this is a test how are you");
  expect(Case("Привет, Мир! Это тест. Как дела?").noCase()).toEqual("привет мир это тест как дела");
  expect(noCase("3GreenHouseIs_mine_44")).toEqual("3 green house is mine 44");
  expect(noCase("wHat is_)(a no case?")).toEqual("w hat is a no case");
  expect(noCase("Монгол Улс")).toEqual("монгол улс");
});

test("pascalCase", () => {
  const caseObj = Case("Hello, World! This is a test. How are you?");
  expect(pascalCase("Hello, World")).toEqual("HelloWorld");
  expect(caseObj.pascalCase()).toEqual("HelloWorldThisIsATestHowAreYou");
  expect(Case("Привет, Мир! Это тест. Как дела?").pascalCase()).toEqual("ПриветМирЭтоТестКакДела");
  expect(Case("three_GreenHouseIs_mine").pascalCase()).toEqual("ThreeGreenHouseIsMine");
  expect(pascalCase("wHat is_)(a pascal case?")).toEqual("WHatIsAPascalCase");
  expect(pascalCase("Монгол Улс")).toEqual("МонголУлс");
});

test("pascalSnakeCase", () => {
  const caseObj = Case("Hello, World! This is a test. How are you?");
  expect(pascalSnakeCase("Hello, World")).toEqual("Hello_World");
  expect(caseObj.pascalSnakeCase()).toEqual("Hello_World_This_Is_A_Test_How_Are_You");
  expect(Case("Привет, Мир! Это тест. Как дела?").pascalSnakeCase()).toEqual("Привет_Мир_Это_Тест_Как_Дела");
  expect(pascalSnakeCase("three_GreenHouseIs_mine")).toEqual("Three_Green_House_Is_Mine");
  expect(pascalSnakeCase("wHat is_)(a pascal snake case?")).toEqual("W_Hat_Is_A_Pascal_Snake_Case");
  expect(pascalSnakeCase("Монгол Улс")).toEqual("Монгол_Улс");
});

test("pathCase", () => {
  const caseObj = Case("Hello, World! This is a test. How are you?");
  expect(pathCase("Hello, World")).toEqual("hello/world");
  expect(caseObj.pathCase()).toEqual("hello/world/this/is/a/test/how/are/you");
  expect(Case("Привет, Мир! Это тест. Как дела?").pathCase()).toEqual("привет/мир/это/тест/как/дела");
  expect(pathCase("three_GreenHouseIs_mine")).toEqual("three/green/house/is/mine");
  expect(pathCase("wHat is_)(a path case?")).toEqual("w/hat/is/a/path/case");
  expect(pathCase("Монгол Улс")).toEqual("монгол/улс");
  expect(pathCase("MonGol UlS")).toEqual("mon/gol/ul/s");
});

test("snakeCase", () => {
  const caseObj = Case("Hello, World! This is a test. How are you?");
  expect(snakeCase("Hello, World")).toEqual("hello_world");
  expect(caseObj.snakeCase()).toEqual("hello_world_this_is_a_test_how_are_you");
  expect(Case("Привет, Мир! Это тест. Как дела?").snakeCase()).toEqual("привет_мир_это_тест_как_дела");
  expect(snakeCase("three_GreenHouseIs_mine")).toEqual("three_green_house_is_mine");
  expect(snakeCase("wHat is_)(a snake case?")).toEqual("w_hat_is_a_snake_case");
  expect(snakeCase("Монгол Улс")).toEqual("монгол_улс");
});

test("trainCase", () => {
  const caseObj = Case("Hello, World! This is a test. How are you?");
  expect(trainCase("hello, world!")).toEqual("Hello-World");
  expect(caseObj.trainCase()).toEqual("Hello-World-This-Is-A-Test-How-Are-You");
  expect(Case("Привет, Мир! Это тест. Как дела?").trainCase()).toEqual("Привет-Мир-Это-Тест-Как-Дела");
  expect(trainCase("three_GreenHouseIs_mine")).toEqual("Three-Green-House-Is-Mine");
  expect(trainCase("wHat is_)(a train case?")).toEqual("W-Hat-Is-A-Train-Case");
  expect(trainCase("Монгол Улс")).toEqual("Монгол-Улс");
  expect(trainCase("MonGol UlS")).toEqual("Mon-Gol-Ul-S");
  //   expect(trainCase("Hello, World! This is a test. How are you?", { separator: "-" })).toEqual(
  //     "Hello-World-This-Is-A-Test-How-Are-You"
  //   );
});

test("CaseOptions.locales should work", () => {
  const options = { locales: ["ru", "de"] };
  //   const options = { locales: "en-US" };
  const caseObj = Case("Привет, Мир! Это тест. Как дела?", options);
  expect(caseObj.camelCase()).toEqual("приветМирЭтоТестКакДела");
  expect(caseObj.constantCase()).toEqual("ПРИВЕТ_МИР_ЭТО_ТЕСТ_КАК_ДЕЛА");
  expect(caseObj.dotCase()).toEqual("привет.мир.это.тест.как.дела");
  expect(caseObj.kebabCase()).toEqual("привет-мир-это-тест-как-дела");
  expect(caseObj.noCase()).toEqual("привет мир это тест как дела");

  const optsEmpty = {};
  const optsTr = { locales: "tr" };
  const optsEn = { locales: "en-US" };
  const optsDe = { locales: "de-DE" };
  const optsFr = { locales: "fr-FR" };
  const sentence = "WELCOME TO THE WORLD FÊTE! In HAUPTSTRAßE, İstanbul.";

  expect(Case(sentence, optsEmpty).camelCase()).toEqual("welcomeToTheWorldFêteInHauptstrAßEİstanbul");

  expect(capitalCase(sentence, optsEmpty)).toEqual("Welcome To The World Fête In Hauptstr Aß E İstanbul");

  expect(kebabCase(sentence, optsEn)).toEqual("welcome-to-the-world-fête-in-hauptstr-aß-e-i̇stanbul");

  expect(kebabCase(sentence, optsDe)).toEqual("welcome-to-the-world-fête-in-hauptstr-aß-e-i̇stanbul");

  expect(kebabCase(sentence, optsFr)).toEqual("welcome-to-the-world-fête-in-hauptstr-aß-e-i̇stanbul");

  expect(kebabCase(sentence, optsTr)).toEqual("welcome-to-the-world-fête-ın-hauptstr-aß-e-istanbul");

  expect(kebabCase(sentence, optsTr)).not.toEqual(kebabCase(sentence, optsDe));
  expect(kebabCase(sentence, optsTr)).not.toEqual(kebabCase(sentence, optsEn));

  expect(constantCase(sentence, optsFr)).toEqual("WELCOME_TO_THE_WORLD_FÊTE_IN_HAUPTSTR_ASS_E_İSTANBUL");

  expect(constantCase("adbii", optsTr)).toEqual("ADBİİ");
  expect(constantCase("adbii", optsEmpty)).toEqual("ADBII");
});
