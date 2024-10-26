// @ts-check

/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  jsxSingleQuote: true,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
