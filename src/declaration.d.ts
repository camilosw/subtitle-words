declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module 'text-preprocessor' {
  interface TextPreprocessor {
    clean(): TextPreprocessor;
    unescape(): TextPreprocessor;
    toLowerCase(): TextPreprocessor;
    toString(): string;
    expandContractions(): TextPreprocessor;
    killUnicode(): TextPreprocessor;
    replace(regexp: RegExp, value: string): TextPreprocessor;
    remove(regexp: RegExp): TextPreprocessor;
    removeTagsAndMentions(): TextPreprocessor;
    removeSpecialCharachters(): TextPreprocessor;
    removeURLs(): TextPreprocessor;
    removeParenthesesContents(): TextPreprocessor;
    removePunctuation(): TextPreprocessor;
    normalizeSingleCurlyQuotes(): TextPreprocessor;
    normalizeDoubleCurlyQuotes(): TextPreprocessor;
    defaults(): TextPreprocessor;
    chain(): TextPreprocessor;
  }
  export default function preprocessor(text: string): TextPreprocessor;
}
