type Transformer = (str: string) => string;
enum EnumWordType {
  word,
  not_word,
}

type Word = [type: EnumWordType, letters: string];

export type CaseOptions = {
  locales?: Intl.LocalesArgument;
  sentenceTerminator?: RegExp;
};

const RE_UPPERCASE = /\p{Lu}/u;
const RE_LOWERCASE = /\p{Ll}/u;
const RE_NUMBER = /\p{N}/u;
const RE_LETTER = /\p{L}/u;
const RE_WORD_START = new RegExp(`[${RE_UPPERCASE.source}][${RE_LOWERCASE.source}${RE_NUMBER.source}]`, "u");

const cacheWords = new Map<string, Word[]>();

function wordsToString(words: Word[], firstTransformer: Transformer, otherTransformer: Transformer, separator = "") {
  let result = "";
  let isFirstWord = true;
  let index = 0;
  const len = words.length;
  for (; index < len; index++) {
    const [type, letters] = words[index];
    if (type !== EnumWordType.word) {
      continue;
    }
    if (isFirstWord) {
      result += firstTransformer(letters);
      isFirstWord = false;
    } else {
      result += separator + otherTransformer(letters);
    }
  }
  return result;
}

function splitWords(input: string, useCache: boolean): Word[] {
  if (!input || !input.trim()) return [];

  if (useCache) {
    const cached = cacheWords.get(input);
    if (cached) {
      return cached;
    }
  }

  const words: Word[] = [];
  let len = input.length;
  let index = 0;
  let word: Word | null = null;
  let isLastCharUpper = false;

  function addWordChar(char: string) {
    if (word === null) {
      word = [EnumWordType.word, char];
    } else if (word[0] === EnumWordType.not_word) {
      words.push(word);
      word = [EnumWordType.word, char];
    } else {
      word[1] += char;
    }
  }

  function addNotWordChar(char: string) {
    if (word === null) {
      word = [EnumWordType.not_word, char];
    } else if (word[0] === EnumWordType.word) {
      words.push(word);
      word = [EnumWordType.not_word, char];
    } else {
      word[1] += char;
    }
  }
  for (; index < len; index++) {
    const char = input[index];
    if (RE_LOWERCASE.test(char) || RE_NUMBER.test(char)) {
      isLastCharUpper = false;
      addWordChar(char);
    } else if (RE_UPPERCASE.test(char)) {
      const charNext = input[index + 1];
      const str = char + (charNext || "");

      // if this char is a word start.
      if (!isLastCharUpper || RE_WORD_START.test(str)) {
        if (word !== null) {
          words.push(word);
          word = null;
        }
      }
      addWordChar(char);
      isLastCharUpper = true;
    } else if (RE_LETTER.test(char)) {
      isLastCharUpper = false;
      addWordChar(char);
    } else if (/\s/.test(char)) {
      isLastCharUpper = false;
      if (word !== null) {
        words.push(word);
        word = null;
      }
      continue;
    } else {
      isLastCharUpper = false;
      addNotWordChar(char);
    }
  }

  if (word !== null) {
    words.push(word);
    word = null;
  }

  useCache && cacheWords.set(input, words);
  return words;
}

/**
 *
 * @param {string} input
 * @param {CaseOptions} options
 * @returns {string}
 *
 * @example
 * Case("hello world").camelCase() // => "helloWorld"
 * Case("hello world").constantCase() // => "HELLO_WORLD"
 */
export function Case(input: string, options?: CaseOptions) {
  const words = splitWords(input, true);
  const toLower = options?.locales
    ? (str: string) => str.toLocaleLowerCase(options.locales)
    : (str: string) => str.toLowerCase();
  const toUpper = options?.locales
    ? (str: string) => str.toLocaleUpperCase(options.locales)
    : (str: string) => str.toUpperCase();

  function toUpperFirstLowerOther(str: string) {
    return toUpper(str.charAt(0)) + toLower(str.slice(1));
  }

  return {
    /** camel case => camelCase */
    camelCase: () => wordsToString(words, toLower, toUpperFirstLowerOther),
    /** Capital Case => Capital Case*/
    capitalCase: () => wordsToString(words, toUpperFirstLowerOther, toUpperFirstLowerOther, " "),
    cobolCase: () => wordsToString(words, toUpper, toUpper, "-"),
    /** constant case => CONSTANT_CASE */
    constantCase: () => wordsToString(words, toUpper, toUpper, "_"),
    /** dot case => dot.case */
    dotCase: () => wordsToString(words, toLower, toLower, "."),
    /** kebab case => kebab-case */
    kebabCase: () => wordsToString(words, toLower, toLower, "-"),
    /** no case => no case */
    noCase: () => wordsToString(words, toLower, toLower, " "),
    /** pascal case => PascalCase */
    pascalCase: () => wordsToString(words, toUpperFirstLowerOther, toUpperFirstLowerOther),
    /** pascal snake case => Pascal_Snake_Case */
    pascalSnakeCase: () => wordsToString(words, toUpperFirstLowerOther, toUpperFirstLowerOther, "_"),
    /** Path Case => path/case */
    pathCase: () => wordsToString(words, toLower, toLower, "/"),
    /** snake case => snake_case */
    snakeCase: () => wordsToString(words, toLower, toLower, "_"),
    /** train case => Train-Case */
    trainCase: () => wordsToString(words, toUpperFirstLowerOther, toUpperFirstLowerOther, "-"),
  };
}

/** camel case => camelCase */
export function camelCase(input: string, options?: CaseOptions) {
  return Case(input, options).camelCase();
}

/** Capital Case => Capital Case*/
export function capitalCase(input: string, options?: CaseOptions) {
  return Case(input, options).capitalCase();
}

/** cobolCase => COBOL-CASE */
export function cobolCase(input: string, options?: CaseOptions) {
  return Case(input, options).cobolCase();
}

/** constant case => CONSTANT_CASE */
export function constantCase(input: string, options?: CaseOptions) {
  return Case(input, options).constantCase();
}

/** dot case => dot.case */
export function dotCase(input: string, options?: CaseOptions) {
  return Case(input, options).dotCase();
}

/** kebab case => kebab-case */
export function kebabCase(input: string, options?: CaseOptions) {
  return Case(input, options).kebabCase();
}

/** no case => no case */
export function noCase(input: string, options?: CaseOptions) {
  return Case(input, options).noCase();
}

/** pascal case => PascalCase */
export function pascalCase(input: string, options?: CaseOptions) {
  return Case(input, options).pascalCase();
}

/** pascal snake case => Pascal_Snake_Case */
export function pascalSnakeCase(input: string, options?: CaseOptions) {
  return Case(input, options).pascalSnakeCase();
}

/** Path Case => path/case */
export function pathCase(input: string, options?: CaseOptions) {
  return Case(input, options).pathCase();
}

/** snake case => snake_case */
export function snakeCase(input: string, options?: CaseOptions) {
  return Case(input, options).snakeCase();
}

/** train case => Train-Case */
export function trainCase(input: string, options?: CaseOptions) {
  return Case(input, options).trainCase();
}
