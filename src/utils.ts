import { nodeProcessors } from "@djsx/nodes/index.ts";
import { processChildrenToString } from "@djsx/processChildrenToString.ts";
import type { DJSX, TypedDJSXComponent } from "./djsxTypes";
import { isValidElement, type ReactNode, type ReactElement } from "react";

/**
 * Transforms a single React DJSX component node into its corresponding JSON payload object.
 * This function is the core of the DJSX to JSON transformation, mapping each
 * DJSX component (e.g., <ActionRow>, <Button>, <Embed>) and its props to the
 * structure expected by the target API (presumably Discord).
 *
 * It recursively processes children for components that can contain other DJSX elements
 * (like ActionRow or Container). For textual content within components like TextDisplay
 * or Embed fields, it utilizes `processChildrenToString` to convert JSX children
 * into formatted strings.
 *
 * @param node The React node to process. Expected to be a DJSX component.
 * @returns A JSON payload object representing the component, or null if the node is invalid.
 */
export const processNode = (node: ReactNode): unknown | null => {
	if (!isValidElement(node)) {
		return null;
	}

	const element = getProcessedElement(node);
	const componentDJSXType = getDJSXType(element);

	if (!componentDJSXType) {
		return null;
	}

	const processor = nodeProcessors[componentDJSXType as keyof typeof nodeProcessors];

	if (processor) {
		return processor.process(
			element as ReactElement<never, never>,
			processNode,
			processChildrenToString,
			getDJSXType,
			getProcessedElement,
		);
	}

	return null;
};

/**
 * Helper function to get the DJSX type from a React node.
 * Handles both direct elements and function components that return DJSX elements.
 * @param node The React node to inspect.
 * @param loop The number of times the function has been called.
 * @returns The DJSX type, or undefined if not a DJSX component.
 */
export const getDJSXType = (node: ReactNode, loop: number = 0): DJSX | undefined => {
	if (loop > 10) {
		return undefined;
	}

	if (!isValidElement(node)) {
		return undefined;
	}

	const { type, props } = node;

	if (typeof type === "function") {
		if ("djsxType" in type) {
			return (type as TypedDJSXComponent<unknown, never>).djsxType;
		}

		// It's a regular functional component, try to render and recurse
		// @ts-expect-error - TODO: fix this
		const renderedOutput = type(props);

		return getDJSXType(renderedOutput, loop + 1);
	}

	// If type is a string (e.g., "div", "span"), it's a host component.
	return undefined;
};

/**
 * Helper function to "unwrap" functional components until a host component
 * or a DJSX component (with `djsxType`) is reached.
 * @param element The React element to process.
 * @param loop The number of times the function has been called.
 * @returns The underlying host or DJSX React element.
 * @throws TypeError if a functional component meant for unwrapping returns a non-element.
 */
export const getProcessedElement = (element: ReactElement, loop: number = 0): ReactElement => {
	if (loop > 10) {
		return element;
	}

	if (typeof element.type === "function" && !("djsxType" in element.type)) {
		// @ts-expect-error - TODO: fix this
		const renderedOutput = element.type(element.props);

		if (isValidElement(renderedOutput)) {
			return getProcessedElement(renderedOutput, loop + 1);
		}

		console.error(
			"Error in getProcessedElement: A functional component without 'djsxType' returned a non-element or null. Element:",
			element,
			"Rendered output:",
			renderedOutput,
		);

		throw new TypeError("DJSX: Functional component wrapper did not return a valid React element.");
	}

	return element;
};
