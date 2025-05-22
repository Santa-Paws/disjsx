/**
 * @type {import("eslint").Rule.RuleMetaData}
 */
export const meta = {
	type: "suggestion",
	docs: {
		description: "Require arrow functions instead of function expressions and declarations",
		category: "ECMAScript 6",
		recommended: false,
	},
	fixable: "code",
	messages: {
		preferArrow: "Function should be an arrow function.",
	},
};

/**
 * @param {import("eslint").Rule.RuleContext} context
 * @returns {import("eslint").Rule.RuleListener}
 */
export const create = (context) => {
	/**
	 * @param {import("eslint").AST.Node} node
	 * @returns {void}
	 */
	const checkFunction = (node) => {
		if (
			node.parent &&
			(node.parent.type === "MethodDefinition" || (node.parent.type === "Property" && node.parent.method === true))
		) {
			return;
		}

		const sourceCode = context.sourceCode;
		const functionBody = sourceCode.getText(node.body);

		if (/\bthis\b/.test(functionBody) || /\barguments\b/.test(functionBody) || /\bsuper\b/.test(functionBody)) {
			return;
		}

		context.report({
			node,
			messageId: "preferArrow",
			fix(fixer) {
				if (node.type === "FunctionDeclaration") {
					const functionToken = sourceCode.getFirstToken(node);
					const nameToken = sourceCode.getTokenAfter(functionToken);
					const name = sourceCode.getText(nameToken);

					const paramListText = sourceCode
						.getText()
						.slice(
							sourceCode.getTokenAfter(nameToken, { skip: 0 }).range[0],
							sourceCode.getTokenBefore(node.body).range[1],
						);

					let bodyText = sourceCode.getText(node.body);

					let params = paramListText;
					if (node.params.length === 1 && !params.includes("=") && !params.includes("{") && !params.includes(",")) {
						params = params.replace(/^\(\s*([\w$]+)\s*\)$/, "$1");
					}

					if (
						node.body.type === "BlockStatement" &&
						node.body.body.length === 1 &&
						node.body.body[0].type === "ReturnStatement"
					) {
						const returnStatement = node.body.body[0];
						if (returnStatement.argument) {
							bodyText = sourceCode.getText(returnStatement.argument);
						} else {
							bodyText = "undefined";
						}
					}

					const fullText = sourceCode.getText();
					const nodeRange = node.range;
					const startIndex = nodeRange[0];

					const hasExport = /\bexport\b/.test(fullText.substring(Math.max(0, startIndex - 20), startIndex));

					let arrowFunction;
					if (hasExport) {
						arrowFunction = `const ${name} = ${params} => ${bodyText}`;
					} else {
						arrowFunction = `const ${name} = ${params} => ${bodyText}`;
					}

					return fixer.replaceText(node, arrowFunction);
				} else {
					const paramListText = sourceCode
						.getText()
						.slice(
							sourceCode.getTokenAfter(sourceCode.getFirstToken(node), { skip: 0 }).range[0],
							sourceCode.getTokenBefore(node.body).range[1],
						);

					let bodyText = sourceCode.getText(node.body);

					let params = paramListText;
					if (node.params.length === 1 && !params.includes("=") && !params.includes("{") && !params.includes(",")) {
						params = params.replace(/^\(\s*([\w$]+)\s*\)$/, "$1");
					}

					if (
						node.body.type === "BlockStatement" &&
						node.body.body.length === 1 &&
						node.body.body[0].type === "ReturnStatement"
					) {
						const returnStatement = node.body.body[0];
						if (returnStatement.argument) {
							bodyText = sourceCode.getText(returnStatement.argument);
						} else {
							bodyText = "undefined";
						}
					}

					let arrowFunction;
					if (bodyText === sourceCode.getText(node.body)) {
						arrowFunction = `${params} => ${bodyText}`;
					} else {
						arrowFunction = `${params} => ${bodyText}`;
					}

					return fixer.replaceText(node, arrowFunction);
				}
			},
		});
	};

	return {
		FunctionExpression: checkFunction,
		FunctionDeclaration: checkFunction,
	};
};

export default {
	rules: {
		"require-arrow-functions": {
			create,
			meta,
		},
	},
};
