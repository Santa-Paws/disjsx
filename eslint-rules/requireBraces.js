/**
 * @type {import("eslint").Rule.RuleMetaData}
 */
export const meta = {
	type: "problem",
	docs: {
		description: "Require braces around switch case blocks",
		category: "Best Practices",
		recommended: false,
	},
	fixable: "code",
	messages: {
		missingBraces: "Switch case must have braces around its body.",
	},
};

/**
 * @param {import("eslint").Rule.RuleContext} context
 * @returns {import("eslint").Rule.RuleListener}
 */
export const create = (context) => {
	return {
		SwitchCase(node) {
			if (
				node.consequent.length === 0 ||
				(node.consequent.length === 1 && node.consequent[0].type === "BreakStatement")
			) {
				return;
			}

			const firstStatement = node.consequent[0];

			if (firstStatement.type !== "BlockStatement") {
				context.report({
					node,
					messageId: "missingBraces",
					fix(fixer) {
						const sourceCode = context.sourceCode;

						const testNode = node.test || node;
						const caseOrDefaultToken = sourceCode.getFirstToken(node);
						let colonToken = null;

						if (node.test) {
							colonToken = sourceCode.getTokenAfter(testNode);
						} else {
							colonToken = sourceCode.getTokenAfter(caseOrDefaultToken);
						}

						if (!colonToken) {
							return null;
						}

						const firstConsequentToken = sourceCode.getTokenAfter(colonToken);

						if (!firstConsequentToken) {
							return null;
						}

						const lastConsequentToken = sourceCode.getLastToken(node.consequent[node.consequent.length - 1]);

						if (!lastConsequentToken) {
							return null;
						}

						return [fixer.insertTextAfter(colonToken, " {"), fixer.insertTextAfter(lastConsequentToken, "\n}")];
					},
				});
			}
		},
	};
};

export default {
	rules: {
		"require-braces": {
			create,
			meta,
		},
	},
};
