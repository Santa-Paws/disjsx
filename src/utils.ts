import { nodeProcessors } from "@disjsx/nodes/index.ts";
import { processChildrenToString } from "@disjsx/processChildrenToString.ts";
import type { DISJSX, TypedDISJSXComponent } from "./disjsxTypes";
import { isValidElement, type ReactNode, type ReactElement } from "react";

/**
 * Transforms a single React DISJSX component node into its corresponding JSON payload object.
 * This function is the core of the DISJSX to JSON transformation, mapping each
 * DISJSX component (e.g., <ActionRow>, <Button>, <Embed>) and its props to the
 * structure expected by the target API (presumably Discord).
 *
 * It recursively processes children for components that can contain other DISJSX elements
 * (like ActionRow or Container). For textual content within components like TextDisplay
 * or Embed fields, it utilizes `processChildrenToString` to convert JSX children
 * into formatted strings.
 *
 * @param node The React node to process. Expected to be a DISJSX component.
 * @returns A JSON payload object representing the component, or null if the node is invalid.
 */
export const processNode = (node: ReactNode): unknown | null => {
	if (!isValidElement(node)) {
		return null;
	}

	const element = getProcessedElement(node);
	const componentDISJSXType = getDISJSXType(element);

	if (!componentDISJSXType) {
		return null;
	}

	const processor = nodeProcessors[componentDISJSXType as keyof typeof nodeProcessors];

	if (processor) {
		return processor.process(
			element as ReactElement<never, never>,
			processNode,
			processChildrenToString,
			getDISJSXType,
			getProcessedElement,
		);
	}

	return null;
};

/**
 * Helper function to get the DISJSX type from a React node.
 * Handles both direct elements and function components that return DISJSX elements.
 * @param node The React node to inspect.
 * @param loop The number of times the function has been called.
 * @returns The DISJSX type, or undefined if not a DISJSX component.
 */
export const getDISJSXType = (node: ReactNode, loop: number = 0): DISJSX | undefined => {
	if (loop > 10) {
		return undefined;
	}

	if (!isValidElement(node)) {
		return undefined;
	}

	const { type, props } = node;

	if (typeof type === "function") {
		if ("disjsxType" in type) {
			return (type as TypedDISJSXComponent<unknown, never>).disjsxType;
		}

		// It's a regular functional component, try to render and recurse
		// @ts-expect-error - TODO: fix this
		const renderedOutput = type(props);

		return getDISJSXType(renderedOutput, loop + 1);
	}

	// If type is a string (e.g., "div", "span"), it's a host component.
	return undefined;
};

/**
 * Helper function to "unwrap" functional components until a host component
 * or a DISJSX component (with `disjsxType`) is reached.
 * @param element The React element to process.
 * @param loop The number of times the function has been called.
 * @returns The underlying host or DISJSX React element.
 * @throws TypeError if a functional component meant for unwrapping returns a non-element.
 */
export const getProcessedElement = (element: ReactElement, loop: number = 0): ReactElement => {
	if (loop > 10) {
		return element;
	}

	if (typeof element.type === "function" && !("disjsxType" in element.type)) {
		// @ts-expect-error - TODO: fix this
		const renderedOutput = element.type(element.props);

		if (isValidElement(renderedOutput)) {
			return getProcessedElement(renderedOutput, loop + 1);
		}

		console.error(
			"Error in getProcessedElement: A functional component without 'disjsxType' returned a non-element or null. Element:",
			element,
			"Rendered output:",
			renderedOutput,
		);

		throw new TypeError("DISJSX: Functional component wrapper did not return a valid React element.");
	}

	return element;
};
