import {
  Case,
  CaseOptions,
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
} from "../lib/index";

const suggestionsArr = [
  "Hello World",
  "iT_iS_hardTo understand",
  `"look, there is a 'quote' here!"`,
  "Монгол Улс",
  "WELCOME TO THE WORLD FÊTE! In HAUPTSTRAßE, İstanbul.",
];
const defaultInput = suggestionsArr[0];
const caseOptions: CaseOptions = {};

// const inputHistories: string[] = [];

const inputStrElem = document.getElementById("inputStr") as HTMLInputElement;
const suggestionsElem = document.getElementById("inputStrSuggestion") as HTMLDivElement;
const inputWrapElem = document.getElementById("input-wrap") as HTMLDivElement;

const camelCaseElem = document.getElementById("camelCase") as HTMLInputElement;

const capitalCaseElem = document.getElementById("capitalCase") as HTMLInputElement;
const cobolCaseElem = document.getElementById("cobolCase") as HTMLInputElement;
const constantCaseElem = document.getElementById("constantCase") as HTMLInputElement;
const dotCaseElem = document.getElementById("dotCase") as HTMLInputElement;
const kebabCaseElem = document.getElementById("kebabCase") as HTMLInputElement;
const noCaseElem = document.getElementById("noCase") as HTMLInputElement;
const pascalCaseElem = document.getElementById("pascalCase") as HTMLInputElement;
const pascalSnakeCaseElem = document.getElementById("pascalSnakeCase") as HTMLInputElement;
const pathCaseElem = document.getElementById("pathCase") as HTMLInputElement;
const snakeCaseElem = document.getElementById("snakeCase") as HTMLInputElement;
const trainCaseElem = document.getElementById("trainCase") as HTMLInputElement;

const optionsLocales = document.getElementById("optionsLocales") as HTMLInputElement;

const camelCaseLabel = document.getElementById("camelCaseLabel") as HTMLLabelElement;
const capitalCaseLabel = document.getElementById("capitalCaseLabel") as HTMLLabelElement;
const cobolCaseLabel = document.getElementById("cobolCaseLabel") as HTMLLabelElement;
const constantCaseLabel = document.getElementById("constantCaseLabel") as HTMLLabelElement;
const dotCaseLabel = document.getElementById("dotCaseLabel") as HTMLLabelElement;
const kebabCaseLabel = document.getElementById("kebabCaseLabel") as HTMLLabelElement;
const noCaseLabel = document.getElementById("noCaseLabel") as HTMLLabelElement;
const pascalCaseLabel = document.getElementById("pascalCaseLabel") as HTMLLabelElement;
const pascalSnakeCaseLabel = document.getElementById("pascalSnakeCaseLabel") as HTMLLabelElement;
const pathCaseLabel = document.getElementById("pathCaseLabel") as HTMLLabelElement;
const snakeCaseLabel = document.getElementById("snakeCaseLabel") as HTMLLabelElement;
const trainCaseLabel = document.getElementById("trainCaseLabel") as HTMLLabelElement;
// camelCaseElem?.addEventListener("input", changeCamelCase, false);

function getLabelText(caseName: string, options?: CaseOptions): string {
  return `Case(inputStr${options ? ", options" : ""}).${caseName} =>`;
}

function changeInputStr(e: Event) {
  const iptElem = e.target as HTMLInputElement;
  updateAllCases(iptElem.value);
}

function updateOptions(options?: CaseOptions) {
  let opts = options ?? undefined;

  camelCaseLabel.innerText = getLabelText("camelCase", opts);
  capitalCaseLabel.innerText = getLabelText("capitalCase", opts);
  cobolCaseLabel.innerText = getLabelText("cobolCase", opts);
  constantCaseLabel.innerText = getLabelText("constantCase", opts);
  dotCaseLabel.innerText = getLabelText("dotCase", opts);
  kebabCaseLabel.innerText = getLabelText("kebabCase", opts);
  noCaseLabel.innerText = getLabelText("noCase", opts);
  pascalCaseLabel.innerText = getLabelText("pascalCase", opts);
  pascalSnakeCaseLabel.innerText = getLabelText("pascalSnakeCase", opts);
  pathCaseLabel.innerText = getLabelText("pathCase", opts);
  snakeCaseLabel.innerText = getLabelText("snakeCase", opts);
  trainCaseLabel.innerText = getLabelText("trainCase", opts);
  updateAllCases(inputStrElem.value, opts);
}

function updateAllCases(inputStr: string, options?: CaseOptions) {
  const caseOrigin = Case(inputStr, options);
  camelCaseElem.value = caseOrigin.camelCase();
  capitalCaseElem.value = caseOrigin.capitalCase();
  cobolCaseElem.value = caseOrigin.cobolCase();
  constantCaseElem.value = caseOrigin.constantCase();
  dotCaseElem.value = caseOrigin.dotCase();
  kebabCaseElem.value = caseOrigin.kebabCase();
  noCaseElem.value = caseOrigin.noCase();
  pascalCaseElem.value = caseOrigin.pascalCase();
  pascalSnakeCaseElem.value = caseOrigin.pascalSnakeCase();
  pathCaseElem.value = caseOrigin.pathCase();
  snakeCaseElem.value = caseOrigin.snakeCase();
  trainCaseElem.value = caseOrigin.trainCase();
}

function focusInputStrElem(e: Event) {
  inputStrElem.classList.add("focused");
  inputStrElem.parentElement!.classList.add("focused");
  afterBlur = closeSuggestion;
  initialSuggestions();
}

function closeSuggestion() {
  inputStrElem.classList.remove("focused");
  inputStrElem.parentElement!.classList.remove("focused");

  let curVal = inputStrElem.value?.trim();

  const idx = suggestionsArr.indexOf(curVal);

  if (idx === -1) {
    suggestionsArr.unshift(curVal);
  } else if (idx > 0) {
    suggestionsArr.splice(idx, 1);
    suggestionsArr.unshift(curVal);
  }
}

function noop() {}

let afterBlur = closeSuggestion;
function blurInputStrElem(e: Event) {
  setTimeout(() => {
    afterBlur();
  }, 200);
}

function clickSuggestionsElem(e: Event) {
  const suggestStr = (e.target as HTMLElement).innerText;
  afterBlur = noop;
  inputStrElem.value = suggestStr;
  updateAllCases(suggestStr);
  closeSuggestion();
}

let localesValue: Intl.LocalesArgument = undefined;

function changeOptionsLocales(e: Event) {
  const prevLocalesValue = localesValue;
  let locales: Intl.LocalesArgument = (e.target as HTMLInputElement).value.trim();

  if (locales.startsWith("[") && locales.endsWith("]")) {
    localesValue = locales
      .slice(1, -1)
      .split(",")
      .map((locale) => locale.trim());
  } else {
    localesValue = locales;
  }

  if (localesValue || localesValue.length) {
    try {
      "A".toLocaleLowerCase(localesValue);
    } catch (e) {
      console.warn(e.stack);
      localesValue = prevLocalesValue;
    }
  }

  if (localesValue !== prevLocalesValue) {
    updateOptions({ locales: localesValue });
  }
}

function initialize() {
  inputStrElem?.addEventListener("input", changeInputStr, false);

  inputStrElem.value = defaultInput;
  updateAllCases(defaultInput);

  inputStrElem.addEventListener("focus", focusInputStrElem, true);
  inputWrapElem.addEventListener("blur", blurInputStrElem, true);

  suggestionsElem.addEventListener("click", clickSuggestionsElem, false);

  optionsLocales.addEventListener("input", changeOptionsLocales, false);
}

function createSuggesItem(suggestStr: string) {
  const suggesItem = document.createElement("div");
  suggesItem.className = "suggestions-item";
  const text = document.createTextNode(suggestStr);
  suggesItem.appendChild(text);
  return suggesItem;
}

function initialSuggestions() {
  Array.from(suggestionsElem.childNodes).forEach((child) => {
    suggestionsElem.removeChild(child);
  });
  suggestionsArr.forEach((suggestStr) => {
    const suggesItem = createSuggesItem(suggestStr);
    suggestionsElem.appendChild(suggesItem);
  });
}

initialize();
