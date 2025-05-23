import type { JSXElementConstructor } from "react";

import { getProcessedElement } from "@djsx/utils.ts";
import type { ReactElement } from "react";
import type { ReactNode } from "react";
import { Children, isValidElement } from "react";

/**
 * A set of HTML-like block-level element types.
 * This is used by `processChildrenToString` to determine appropriate newline handling
 * when converting React nodes to a string representation, ensuring block elements
 * are typically on new lines.
 */
export const blockElementTypes: Set<string> = new Set([
	"h1",
	"h2",
	"h3",
	"p",
	"small",
	"blockquote",
	"ul",
	"ol",
	"pre",
]);

/**
 * Recursively processes React children nodes and converts them into a single string,
 * applying markdown-like formatting for various HTML-like elements.
 *
 * This function handles basic text, numbers, and a curated set of HTML-like tags
 * (e.g., h1-h3, strong, em, ul, ol, li, blockquote, code, pre, a, br, p, small).
 * It manages spacing and newlines, particularly differentiating between inline
 * and block-level elements (defined in `blockElementTypes`) to produce a
 * readable string output.
 *
 * @param childrenNodes The React nodes to process.
 * @param listIndentPrefix A string prefix used for indenting list items, accumulates with nesting.
 * @returns A string representation of the processed React nodes.
 */
export const processChildrenToString = (childrenNodes: ReactNode, listIndentPrefix: string = ""): string => {
	if (!childrenNodes) {
		return "";
	}
	const nodes = Array.isArray(childrenNodes) ? childrenNodes : [childrenNodes];
	let resultString = "";
	let previousNodeWasBlock = true;

	for (const rawCurrentNode of nodes) {
		if (rawCurrentNode === null || rawCurrentNode === undefined) {
			continue;
		}

		if (typeof rawCurrentNode === "string" || typeof rawCurrentNode === "number") {
			resultString += String(rawCurrentNode);
			previousNodeWasBlock = false;
			continue;
		}

		if (!isValidElement(rawCurrentNode)) {
			previousNodeWasBlock = false; // Assuming non-elements don't act as blocks

			continue;
		}

		const element = getProcessedElement(rawCurrentNode) as ReactElement<
			{
				children: ReactNode;
				href?: string;
				isEscaped?: boolean;
				language?: string;
			},
			| string
			| JSXElementConstructor<{
					children: ReactNode;
					href?: string;
					isEscaped?: boolean;
					language?: string;
			  }>
		>;

		const { type, props } = element;
		const currentElementTypeStr = typeof type === "string" ? type : "";
		const isCurrentNodeHtmlBlock = blockElementTypes.has(currentElementTypeStr);

		if (isCurrentNodeHtmlBlock && !previousNodeWasBlock && resultString.length > 0 && !resultString.endsWith("\n")) {
			resultString += "\n";
		}

		let elementContent = "";

		if (typeof type === "string") {
			switch (type) {
				case "h1": {
					elementContent = `# ${processChildrenToString(props.children, "")}\n`;
					break;
				}
				case "h2": {
					elementContent = `## ${processChildrenToString(props.children, "")}\n`;
					break;
				}
				case "h3": {
					elementContent = `### ${processChildrenToString(props.children, "")}\n`;
					break;
				}
				case "strong":
				case "b": {
					elementContent = `**${processChildrenToString(props.children, listIndentPrefix)}**`;
					break;
				}
				case "i":
				case "em": {
					elementContent = `*${processChildrenToString(props.children, listIndentPrefix)}*`;
					break;
				}
				case "u": {
					elementContent = `__${processChildrenToString(props.children, listIndentPrefix)}__`;
					break;
				}
				case "s":
				case "strike": {
					elementContent = `~~${processChildrenToString(props.children, listIndentPrefix)}~~`;
					break;
				}
				case "small": {
					elementContent = `-# ${processChildrenToString(props.children, "")}\n`;
					break;
				}
				case "blockquote": {
					const bqContent = processChildrenToString(props.children, "");
					const lines = bqContent.split("\n").filter((line) => line.trim().length > 0);

					elementContent = lines.map((line) => `> ${line}`).join("\n") + (lines.length > 0 ? "\n" : "");
					break;
				}
				case "a": {
					const href = props.href || "";
					const linkTextContent = processChildrenToString(props.children, listIndentPrefix);
					const linkText = linkTextContent.trim() || href;

					elementContent = props.isEscaped ? `[${linkText}](<${href}>)` : `[${linkText}](${href})`;
					break;
				}
				case "ul": {
					const items = Children.toArray(props.children);

					for (const itemNode of items) {
						if (!isValidElement(itemNode) || itemNode.type !== "li") {
							continue;
						}
						const liContent = processChildrenToString(
							(itemNode.props as { children: ReactNode }).children,
							listIndentPrefix + "  ",
						);
						const liLines = liContent.trim().split("\n");

						elementContent += `${listIndentPrefix}- ${liLines[0] || ""}\n`;
						for (let k = 1; k < liLines.length; k++) {
							elementContent += `${listIndentPrefix}  ${liLines[k]}\n`;
						}
					}
					if (elementContent.length > 0 && !elementContent.endsWith("\n")) {
						elementContent += "\n";
					}
					break;
				}
				case "ol": {
					let itemNumber = 1;
					const items = Children.toArray(props.children);

					for (const itemNode of items) {
						if (!isValidElement(itemNode) || itemNode.type !== "li") {
							continue;
						}
						const liContent = processChildrenToString(
							(itemNode.props as { children: ReactNode }).children,
							listIndentPrefix + "  ",
						);
						const liLines = liContent.trim().split("\n");

						elementContent += `${listIndentPrefix}${itemNumber}. ${liLines[0] || ""}\n`;
						for (let k = 1; k < liLines.length; k++) {
							elementContent += `${listIndentPrefix} ${liLines[k]}\n`;
						}
						itemNumber++;
					}
					if (elementContent.length > 0 && !elementContent.endsWith("\n")) {
						elementContent += "\n";
					}
					break;
				}
				case "li": {
					elementContent = processChildrenToString(props.children, listIndentPrefix);
					break;
				}
				case "code": {
					elementContent = `\`${processChildrenToString(props.children, listIndentPrefix)}\``;
					break;
				}
				case "pre": {
					const lang = props.language || "";
					const code =
						typeof props.children === "string" ? props.children : processChildrenToString(props.children, "");

					elementContent = "```" + lang + "\n" + code.trim() + "\n```\n";
					break;
				}
				case "br": {
					elementContent = "\n";
					break;
				}
				case "p": {
					elementContent = `${processChildrenToString(props.children, "")}\n`;
					break;
				}
				default: {
					elementContent = processChildrenToString(props.children, listIndentPrefix);
				}
			}
		} else {
			elementContent = processChildrenToString(props.children, listIndentPrefix);
		}
		resultString += elementContent;
		previousNodeWasBlock =
			isCurrentNodeHtmlBlock || (elementContent.endsWith("\n") && elementContent.trim().length > 0);
	}

	return resultString.replace(/\n\n\n+/g, "\n\n").trim();
};
