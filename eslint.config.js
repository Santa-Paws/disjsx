import js from "@eslint/js";
import globals from "globals";
import preferArrow from "eslint-plugin-prefer-arrow";
import tseslint from "typescript-eslint";
import requireBraces from "./eslint-rules/requireBraces.js";
import requireArrowFunctions from "./eslint-rules/requireArrowFunctions.js";
import { globalIgnores } from "eslint/config";

export default tseslint.config(globalIgnores(["dist/**/*", "dev-test/**/*", "**/*.template.ts"]), {
	extends: [js.configs.recommended, ...tseslint.configs.recommended],
	files: ["**/*.{ts,tsx}"],
	languageOptions: {
		ecmaVersion: 2020,
		globals: globals["shared-node-browser"],
	},

	plugins: {
		"prefer-arrow": preferArrow,
		"require-braces": requireBraces,
		"require-arrow-functions": requireArrowFunctions,
	},

	rules: {
		quotes: [
			"error",
			"double",
			{
				avoidEscape: true,
			},
		],
		"object-curly-spacing": ["error", "always"],
		"padding-line-between-statements": [
			"error",
			{ blankLine: "always", prev: ["const", "let", "var"], next: "*" },
			{ blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
		],
		curly: ["error", "all"],
		camelcase: [
			"error",
			{
				properties: "never",
			},
		],
		"no-return-await": "error",
		"@typescript-eslint/no-unsafe-declaration-merging": "off", // who actually uses this rule???
		"@typescript-eslint/no-unsafe-function-type": "off", // this is fine imo
		"require-braces/require-braces": "error",
		"require-arrow-functions/require-arrow-functions": "error",
	},
	languageOptions: {
		parserOptions: {
			projectService: true,
			tsconfigRootDir: import.meta.dirname,
		},
	},
});
