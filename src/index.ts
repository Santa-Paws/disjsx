import { type ReactNode, type ReactElement, Children, isValidElement } from "react";
import {
	type MessageProps,
	type ModalProps,
	type ActionRowPayload,
	type EmbedPayload,
	type LegacyMessagePayload,
	MessageFlags,
	type V2MessagePayload,
	type ModalPayload,
	type AnyComponentPayload,
	InteractionType,
} from "./types";

import { DISJSX, type TypedDISJSXComponent } from "./disjsxTypes";
import { processNode } from "@disjsx/utils.ts";
import { getDISJSXType, getProcessedElement } from "@disjsx/utils.ts";
import { processChildrenToString } from "@disjsx/processChildrenToString.ts";
import { validateComponent, validateUniqueCustomIds } from "./validation";

// Exporting all these in the off chance someone wants to use them directly (idk why you would tho)
export * from "./disjsxTypes";
export * from "./types";
export * from "./utils";
export * from "./processChildrenToString";
export * from "./nodes";
export * from "./validation";

/**
 * Renders a DISJSX `<Message>` element and its children into a Discord message payload object.
 * This is the main entry point for converting a DISJSX tree into a usable payload.
 *
 * It differentiates between V2 component-based messages and legacy messages (which can include
 * content, embeds, and components). The `isV2` prop on the `<Message>` component
 * dictates the output structure.
 *
 * For V2 messages, it primarily processes children into a `components` array.
 * For legacy messages, it populates `content`, `embeds`, and `components` fields
 * based on the DISJSX children (`<Content>`, `<Embed>`, `<ActionRow>`).
 *
 * @param messageElement The root `<Message>` React element or a component that renders to a Message element.
 * @param options Optional configuration for validation and error handling.
 * @returns A `LegacyMessagePayload` or `V2MessagePayload` object, or null if the input is invalid.
 */
export const renderDiscordMessage = (
	messageElement: ReactElement,
	options: {
		validate?: boolean;
		throwOnValidationError?: boolean;
	} = {},
): LegacyMessagePayload | V2MessagePayload | null => {
	const { validate = true, throwOnValidationError = false } = options;

	const processedMessageElement = getProcessedElement(messageElement);

	if (!processedMessageElement || getDISJSXType(processedMessageElement) !== DISJSX.Message) {
		console.error("Received:", messageElement);
		console.error("Processed:", processedMessageElement);
		console.error("DISJSX Type:", getDISJSXType(processedMessageElement));
		console.error("renderDiscordMessage expects a root <Message> element or a component that renders to one.");

		return null;
	}

	const { props } = processedMessageElement as ReactElement<
		MessageProps,
		TypedDISJSXComponent<MessageProps, DISJSX.Message>
	>;
	const { isV2 = false, username, avatarUrl, tts, flags } = props;

	if (validate) {
		const validationResult = validateComponent(
			processedMessageElement as ReactElement<MessageProps, TypedDISJSXComponent<MessageProps, DISJSX.Message>>,
			isV2,
			"message",
		);
		const customIdErrors = validateUniqueCustomIds(processedMessageElement);

		const allErrors = [...validationResult.errors, ...customIdErrors];
		const allWarnings = validationResult.warnings;

		if (allErrors.length > 0) {
			console.error("DisJSX Validation Errors:");
			allErrors.forEach((error) => {
				console.error(`  - ${error.message}${error.path ? ` (at ${error.path.join(" > ")})` : ""}`);
			});

			if (throwOnValidationError) {
				throw new Error(`DisJSX validation failed with ${allErrors.length} error(s). See console for details.`);
			}
		}

		if (allWarnings.length > 0) {
			console.warn("DisJSX Validation Warnings:");
			allWarnings.forEach((warning) => {
				console.warn(`  - ${warning.message}${warning.path ? ` (at ${warning.path.join(" > ")})` : ""}`);
			});
		}

		if (allErrors.length > 0 && !throwOnValidationError) {
			return null;
		}
	}

	const childrenArray = Children.toArray(props.children);

	if (isV2) {
		const v2Components: AnyComponentPayload[] = [];

		for (const child of childrenArray) {
			const processedNode = processNode(child);

			if (processedNode !== null) {
				v2Components.push(processedNode as AnyComponentPayload);
			}
		}
		const v2Payload: V2MessagePayload = {
			username,
			avatar_url: avatarUrl,
			tts,
			components: v2Components,
			flags: MessageFlags.IsComponentsV2 | (flags || 0),
		};

		return v2Payload;
	}

	const legacyPayload: LegacyMessagePayload = {
		username,
		avatar_url: avatarUrl,
		tts,
		embeds: [],
		components: [],
		flags: flags,
	};

	for (const rawChildNode of childrenArray) {
		if (!isValidElement(rawChildNode)) {
			if (
				typeof rawChildNode === "string" &&
				!legacyPayload.content // Only use first string child as content if no <Content> used
			) {
				legacyPayload.content = (legacyPayload.content || "") + rawChildNode;
			}
			continue;
		}

		const childNode = getProcessedElement(rawChildNode);
		const childDISJSXType = getDISJSXType(childNode);

		if (childDISJSXType === DISJSX.Content) {
			legacyPayload.content =
				(legacyPayload.content || "") + processChildrenToString((childNode.props as { children: ReactNode }).children);
		} else if (childDISJSXType === DISJSX.Embed) {
			const embed = processNode(childNode) as EmbedPayload | null;

			if (embed) {
				legacyPayload.embeds?.push(embed);
			}
		} else if (childDISJSXType === DISJSX.ActionRow) {
			const actionRow = processNode(childNode) as ActionRowPayload | null;

			if (actionRow) {
				legacyPayload.components?.push(actionRow);
			}
		}
	}

	if (legacyPayload.components?.length === 0) {
		delete legacyPayload.components;
	}
	if (legacyPayload.embeds?.length === 0) {
		delete legacyPayload.embeds;
	}

	return legacyPayload;
};

/**
 * Renders a DISJSX `<Modal>` element and its children into a Discord modal payload object.
 * This function is specifically for converting modal DISJSX trees into usable modal payloads.
 *
 * Modals can only contain Action Rows with Text Input components.
 *
 * @param modalElement The root `<Modal>` React element or a component that renders to a Modal element.
 * @param options Optional configuration for validation and error handling.
 * @returns A `ModalPayload` object, or null if the input is invalid.
 */
export const renderDiscordModal = (
	modalElement: ReactElement,
	options: {
		validate?: boolean;
		throwOnValidationError?: boolean;
	} = {},
): ModalPayload | null => {
	const { validate = true, throwOnValidationError = false } = options;

	const processedModalElement = getProcessedElement(modalElement);

	if (!processedModalElement || getDISJSXType(processedModalElement) !== DISJSX.Modal) {
		console.error("Received:", modalElement);
		console.error("Processed:", processedModalElement);
		console.error("DISJSX Type:", getDISJSXType(processedModalElement));
		console.error("renderDiscordModal expects a root <Modal> element or a component that renders to one.");

		return null;
	}

	const { props } = processedModalElement as ReactElement<ModalProps, TypedDISJSXComponent<ModalProps, DISJSX.Modal>>;
	const { title, customId } = props;

	if (validate) {
		const validationResult = validateComponent(
			processedModalElement as ReactElement<ModalProps, TypedDISJSXComponent<ModalProps, DISJSX.Modal>>,
			false,
			"modal",
		);
		const customIdErrors = validateUniqueCustomIds(processedModalElement);

		const allErrors = [...validationResult.errors, ...customIdErrors];
		const allWarnings = validationResult.warnings;

		if (allErrors.length > 0) {
			console.error("DisJSX Modal Validation Errors:");
			allErrors.forEach((error) => {
				console.error(`  - ${error.message}${error.path ? ` (at ${error.path.join(" > ")})` : ""}`);
			});

			if (throwOnValidationError) {
				throw new Error(`DisJSX modal validation failed with ${allErrors.length} error(s). See console for details.`);
			}
		}

		if (allWarnings.length > 0) {
			console.warn("DisJSX Modal Validation Warnings:");
			allWarnings.forEach((warning) => {
				console.warn(`  - ${warning.message}${warning.path ? ` (at ${warning.path.join(" > ")})` : ""}`);
			});
		}

		if (allErrors.length > 0 && !throwOnValidationError) {
			return null;
		}
	}

	const childrenArray = Children.toArray(props.children);
	const components: ActionRowPayload[] = [];

	for (const child of childrenArray) {
		const processedNode = processNode(child);

		if (processedNode !== null) {
			components.push(processedNode as ActionRowPayload);
		}
	}

	const modalPayload: ModalPayload = {
		type: InteractionType.Modal,
		data: {
			title,
			custom_id: customId,
			components,
		},
	};

	return modalPayload;
};
