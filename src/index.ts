import { type ReactNode, type ReactElement, Children, isValidElement } from "react";
import {
	type MessageProps,
	type ActionRowPayload,
	type EmbedPayload,
	type LegacyMessagePayload,
	MessageFlags,
	type V2MessagePayload,
	type AnyComponentPayload,
} from "./types";

import { DJSX, type TypedDJSXComponent } from "./djsxTypes";
import { processNode } from "@djsx/utils.ts";
import { getDJSXType, getProcessedElement } from "@djsx/utils.ts";
import { processChildrenToString } from "@djsx/processChildrenToString.ts";

// Exporting all these in the off chance someone wants to use them directly (idk why you would tho)
export * from "./djsxTypes";
export * from "./types";
export * from "./utils";
export * from "./processChildrenToString";
export * from "./nodes";

/**
 * Renders a DJSX `<Message>` element and its children into a Discord message payload object.
 * This is the main entry point for converting a DJSX tree into a usable payload.
 *
 * It differentiates between V2 component-based messages and legacy messages (which can include
 * content, embeds, and components). The `isV2` prop on the `<Message>` component
 * dictates the output structure.
 *
 * For V2 messages, it primarily processes children into a `components` array.
 * For legacy messages, it populates `content`, `embeds`, and `components` fields
 * based on the DJSX children (`<Content>`, `<Embed>`, `<ActionRow>`).
 *
 * @param messageElement The root `<Message>` React element or a component that renders to a Message element.
 * @returns A `LegacyMessagePayload` or `V2MessagePayload` object, or null if the input is invalid.
 */
export const renderDiscordMessage = (messageElement: ReactElement): LegacyMessagePayload | V2MessagePayload | null => {
	const processedMessageElement = getProcessedElement(messageElement);

	if (!processedMessageElement || getDJSXType(processedMessageElement) !== DJSX.Message) {
		console.error("Received:", messageElement);
		console.error("Processed:", processedMessageElement);
		console.error("DJSX Type:", getDJSXType(processedMessageElement));
		console.error("renderDiscordMessage expects a root <Message> element or a component that renders to one.");

		return null;
	}

	const { props } = processedMessageElement as ReactElement<
		MessageProps,
		TypedDJSXComponent<MessageProps, DJSX.Message>
	>;
	const { isV2 = false, username, avatarUrl, tts, flags } = props;
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
		const childDJSXType = getDJSXType(childNode);

		if (childDJSXType === DJSX.Content) {
			legacyPayload.content =
				(legacyPayload.content || "") + processChildrenToString((childNode.props as { children: ReactNode }).children);
		} else if (childDJSXType === DJSX.Embed) {
			const embed = processNode(childNode) as EmbedPayload | null;

			if (embed) {
				legacyPayload.embeds?.push(embed);
			}
		} else if (childDJSXType === DJSX.ActionRow) {
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
