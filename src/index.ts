import { type ReactNode, type ReactElement, type JSXElementConstructor, Children, isValidElement } from "react";

import {
	type MessageProps,
	type EmbedProps,
	type EmbedAuthorProps,
	type EmbedFieldProps,
	type EmbedFooterProps,
	type EmbedImageProps,
	type EmbedThumbnailProps,
	type ActionRowProps,
	type ButtonProps,
	type StringSelectProps,
	type SelectOptionProps,
	type UserSelectProps,
	type RoleSelectProps,
	type MentionableSelectProps,
	type ChannelSelectProps,
	type SectionProps,
	type TextDisplayProps,
	type ThumbnailProps,
	type MediaGalleryProps,
	type MediaGalleryItemProps,
	type FileProps,
	type SeparatorProps,
	type ContainerProps,
	ComponentType,
	type ActionRowPayload,
	type ButtonPayload,
	ButtonStyle,
	type ChannelSelectPayload,
	type ContainerPayload,
	type EmbedPayload,
	type FilePayload,
	type LegacyMessagePayload,
	MessageFlags,
	type MediaGalleryPayload,
	type MentionableSelectPayload,
	type RoleSelectPayload,
	type SectionPayload,
	type SelectOptionPayload,
	type SeparatorPayload,
	type StringSelectPayload,
	type TextDisplayPayload,
	type ThumbnailPayload,
	type UserSelectPayload,
	type V2MessagePayload,
	type MediaGalleryItemPayload,
	type AnyComponentPayload,
} from "./types";

import { DJSX, type TypedDJSXComponent } from "./djsxTypes";

export * from "./djsxTypes";
export * from "./types";

/**
 * A set of HTML-like block-level element types.
 * This is used by `processChildrenToString` to determine appropriate newline handling
 * when converting React nodes to a string representation, ensuring block elements
 * are typically on new lines.
 */
const blockElementTypes: Set<string> = new Set(["h1", "h2", "h3", "p", "small", "blockquote", "ul", "ol", "pre"]);

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
const processChildrenToString = (childrenNodes: ReactNode, listIndentPrefix: string = ""): string => {
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
const processNode = (node: ReactNode): unknown | null => {
	if (!isValidElement(node)) {
		return null;
	}

	const element = getProcessedElement(node);
	const componentDJSXType = getDJSXType(element);

	if (componentDJSXType === DJSX.ActionRow) {
		const actionRowProps = element.props as ActionRowProps;
		const components: AnyComponentPayload[] = [];

		for (const child of Children.toArray(actionRowProps.children)) {
			const processedChild = processNode(child);

			if (processedChild !== null) {
				components.push(processedChild as AnyComponentPayload);
			}
		}
		return {
			type: ComponentType.ActionRow,
			id: actionRowProps.id,
			components,
		} as ActionRowPayload;
	}

	if (componentDJSXType === DJSX.Button) {
		const btnProps = element.props as ButtonProps;
		const payload: ButtonPayload = {
			type: ComponentType.Button,
			id: btnProps.id,
			style: btnProps.style,
			label: btnProps.label || (typeof btnProps.children === "string" ? btnProps.children : undefined),
			emoji: btnProps.emoji,
			disabled: btnProps.disabled,
		};

		if (btnProps.style === ButtonStyle.Link) {
			payload.url = btnProps.url;
		} else if (btnProps.style === ButtonStyle.Premium) {
			payload.sku_id = btnProps.skuId;
		} else {
			payload.custom_id = btnProps.customId;
		}
		return payload;
	}

	if (componentDJSXType === DJSX.StringSelect) {
		const selProps = element.props as StringSelectProps;
		const options: SelectOptionPayload[] = [];

		for (const rawChildNode of Children.toArray(selProps.children)) {
			if (!isValidElement(rawChildNode)) {
				continue;
			}
			const childNode = getProcessedElement(rawChildNode);

			if (getDJSXType(childNode) !== DJSX.SelectOption) {
				continue;
			}
			const optProps = childNode.props as SelectOptionProps;

			options.push({
				label: optProps.label || (typeof optProps.children === "string" ? optProps.children : "Option"),
				value: optProps.value,
				description: optProps.description,
				emoji: optProps.emoji,
				default: optProps.isDefault,
			});
		}
		return {
			type: ComponentType.StringSelect,
			id: selProps.id,
			custom_id: selProps.customId,
			placeholder: selProps.placeholder,
			min_values: selProps.minValues,
			max_values: selProps.maxValues,
			disabled: selProps.disabled,
			options,
		} as StringSelectPayload;
	}

	if (componentDJSXType === DJSX.UserSelect) {
		const { customId, placeholder, minValues, maxValues, disabled, defaultValues, id } =
			element.props as UserSelectProps;

		return {
			type: ComponentType.UserSelect,
			id,
			custom_id: customId,
			placeholder,
			min_values: minValues,
			max_values: maxValues,
			disabled,
			default_values: defaultValues,
		} as UserSelectPayload;
	}

	if (componentDJSXType === DJSX.RoleSelect) {
		const { customId, placeholder, minValues, maxValues, disabled, defaultValues, id } =
			element.props as RoleSelectProps;

		return {
			type: ComponentType.RoleSelect,
			id,
			custom_id: customId,
			placeholder,
			min_values: minValues,
			max_values: maxValues,
			disabled,
			default_values: defaultValues,
		} as RoleSelectPayload;
	}

	if (componentDJSXType === DJSX.MentionableSelect) {
		const { customId, placeholder, minValues, maxValues, disabled, defaultValues, id } =
			element.props as MentionableSelectProps;

		return {
			type: ComponentType.MentionableSelect,
			id,
			custom_id: customId,
			placeholder,
			min_values: minValues,
			max_values: maxValues,
			disabled,
			default_values: defaultValues,
		} as MentionableSelectPayload;
	}

	if (componentDJSXType === DJSX.ChannelSelect) {
		const { customId, placeholder, minValues, maxValues, disabled, defaultValues, channelTypes, id } =
			element.props as ChannelSelectProps;

		return {
			type: ComponentType.ChannelSelect,
			id,
			custom_id: customId,
			placeholder,
			min_values: minValues,
			max_values: maxValues,
			disabled,
			default_values: defaultValues,
			channel_types: channelTypes,
		} as ChannelSelectPayload;
	}

	if (componentDJSXType === DJSX.TextDisplay) {
		const textDisplayProps = element.props as TextDisplayProps;

		return {
			type: ComponentType.TextDisplay,
			id: textDisplayProps.id,
			content: processChildrenToString(textDisplayProps.children),
		} as TextDisplayPayload;
	}

	if (componentDJSXType === DJSX.Separator) {
		const sepProps = element.props as SeparatorProps;

		return {
			type: ComponentType.Separator,
			id: sepProps.id,
			divider: sepProps.divider === undefined ? true : sepProps.divider,
			spacing: sepProps.spacing === undefined ? 1 : sepProps.spacing,
		} as SeparatorPayload;
	}

	if (componentDJSXType === DJSX.Thumbnail) {
		const thumbProps = element.props as ThumbnailProps;

		return {
			type: ComponentType.Thumbnail,
			id: thumbProps.id,
			media: {
				url: thumbProps.url,
			},
			description: thumbProps.description,
			spoiler: thumbProps.spoiler,
		} as ThumbnailPayload;
	}

	if (componentDJSXType === DJSX.Section) {
		const sectionProps = element.props as SectionProps;
		const sectionChildren = Children.toArray(sectionProps.children);
		const textDisplays: TextDisplayPayload[] = [];
		let accessory: ThumbnailPayload | ButtonPayload | undefined = undefined;

		for (const child of sectionChildren) {
			const processedChild = processNode(child);

			if (!processedChild) {
				continue;
			}
			const typedProcessedChild = processedChild as AnyComponentPayload;

			if (typedProcessedChild.type === ComponentType.TextDisplay) {
				textDisplays.push(typedProcessedChild as TextDisplayPayload);
			} else if (
				typedProcessedChild.type === ComponentType.Thumbnail ||
				typedProcessedChild.type === ComponentType.Button
			) {
				accessory = typedProcessedChild as ThumbnailPayload | ButtonPayload;
			}
		}
		return {
			type: ComponentType.Section,
			id: sectionProps.id,
			components: textDisplays,
			accessory,
		} as SectionPayload;
	}

	if (componentDJSXType === DJSX.MediaGallery) {
		const galleryProps = element.props as MediaGalleryProps;
		const items: MediaGalleryItemPayload[] = [];

		for (const rawChildNode of Children.toArray(galleryProps.children)) {
			if (!isValidElement(rawChildNode)) {
				continue;
			}
			const childNode = getProcessedElement(rawChildNode);

			if (getDJSXType(childNode) !== DJSX.MediaGalleryItem) {
				continue;
			}
			const itemProps = childNode.props as MediaGalleryItemProps;

			items.push({
				media: {
					url: itemProps.url,
				},
				description: itemProps.description,
				spoiler: itemProps.spoiler,
			});
		}
		return {
			type: ComponentType.MediaGallery,
			id: galleryProps.id,
			items,
		} as MediaGalleryPayload;
	}

	if (componentDJSXType === DJSX.File) {
		const fileProps = element.props as FileProps;

		return {
			type: ComponentType.File,
			id: fileProps.id,
			file: { url: fileProps.url },
			spoiler: fileProps.spoiler,
		} as FilePayload;
	}

	if (componentDJSXType === DJSX.Container) {
		const containerProps = element.props as ContainerProps;
		const components: AnyComponentPayload[] = [];

		for (const child of Children.toArray(containerProps.children)) {
			const processedChild = processNode(child);

			if (processedChild !== null) {
				components.push(processedChild as AnyComponentPayload);
			}
		}
		return {
			type: ComponentType.Container,
			id: containerProps.id,
			components,
			accent_color:
				typeof containerProps.accentColor === "string"
					? parseInt(containerProps.accentColor.replace("#", ""), 16)
					: containerProps.accentColor,
			spoiler: containerProps.spoiler,
		} as ContainerPayload;
	}

	if (componentDJSXType === DJSX.Embed) {
		const embedProps = element.props as EmbedProps;
		const payload: EmbedPayload = {
			title: embedProps.title,
			description: embedProps.description,
			url: embedProps.url,
			timestamp: embedProps.timestamp instanceof Date ? embedProps.timestamp.toISOString() : embedProps.timestamp,
			color: typeof embedProps.color === "string" ? parseInt(embedProps.color.replace("#", ""), 16) : embedProps.color,
			fields: [],
		};
		let tempDescription = "";

		for (const rawChild of Children.toArray(embedProps.children)) {
			if (!isValidElement(rawChild)) {
				continue;
			}
			const child = getProcessedElement(rawChild);
			const childDJSXType = getDJSXType(child);

			if (childDJSXType === DJSX.EmbedAuthor) {
				const authorProps = child.props as EmbedAuthorProps;

				payload.author = {
					name: authorProps.name,
					url: authorProps.url,
					icon_url: authorProps.iconUrl,
				};
			} else if (childDJSXType === DJSX.EmbedTitle && !payload.title) {
				payload.title = processChildrenToString((child.props as { children: ReactNode }).children);
			} else if (childDJSXType === DJSX.EmbedDescription) {
				tempDescription +=
					(tempDescription ? "\n" : "") + processChildrenToString((child.props as { children: ReactNode }).children);
			} else if (childDJSXType === DJSX.EmbedFooter) {
				const footerProps = child.props as EmbedFooterProps;

				payload.footer = {
					text: footerProps.text || processChildrenToString(footerProps.children),
					icon_url: footerProps.iconUrl,
				};
			} else if (childDJSXType === DJSX.EmbedImage) {
				payload.image = {
					url: (child.props as EmbedImageProps).url,
				};
			} else if (childDJSXType === DJSX.EmbedThumbnail) {
				payload.thumbnail = {
					url: (child.props as EmbedThumbnailProps).url,
				};
			} else if (childDJSXType === DJSX.EmbedFields) {
				for (const rawFieldChild of Children.toArray((child.props as { children: ReactNode }).children)) {
					if (!isValidElement(rawFieldChild)) {
						continue;
					}
					const fieldChild = getProcessedElement(rawFieldChild);

					if (getDJSXType(fieldChild) !== DJSX.EmbedField) {
						continue;
					}
					const fieldProps = fieldChild.props as EmbedFieldProps;
					let fieldName = fieldProps.title || "";
					let fieldValue = fieldProps.value || "";

					if (!fieldName || !fieldValue) {
						for (const rawSubChild of Children.toArray(fieldProps.children)) {
							if (!isValidElement(rawSubChild)) {
								continue;
							}
							const subChild = getProcessedElement(rawSubChild);
							const subChildDJSXType = getDJSXType(subChild);

							if (subChildDJSXType === DJSX.EmbedFieldTitle && !fieldName) {
								fieldName = processChildrenToString(
									(
										subChild.props as {
											children: ReactNode;
										}
									).children,
								);
							}
							if (subChildDJSXType === DJSX.EmbedFieldValue && !fieldValue) {
								fieldValue = processChildrenToString(
									(
										subChild.props as {
											children: ReactNode;
										}
									).children,
								);
							}
						}
					}
					if (fieldName && fieldValue) {
						payload.fields?.push({
							name: fieldName,
							value: fieldValue,
							inline: fieldProps.inline,
						});
					}
				}
			}
		}

		if (tempDescription) {
			payload.description = (payload.description ? payload.description + "\n" : "") + tempDescription;
		}
		if (payload.fields?.length === 0) {
			delete payload.fields;
		}
		return payload;
	}

	return null;
};

/**
 * Helper function to get the DJSX type from a React node.
 * Handles both direct elements and function components that return DJSX elements.
 * @param node The React node to inspect.
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
