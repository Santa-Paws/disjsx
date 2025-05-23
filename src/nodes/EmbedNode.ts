import { Children, isValidElement, type ReactNode } from "react";
import {
	type EmbedProps,
	type EmbedAuthorProps,
	type EmbedFieldProps,
	type EmbedFooterProps,
	type EmbedImageProps,
	type EmbedThumbnailProps,
	type EmbedPayload,
} from "../types";
import { DJSX } from "../djsxTypes";
import { type NodeProcessor } from "./types";

export const EmbedNode: NodeProcessor<EmbedPayload, EmbedProps> = {
	process: (element, _, processChildrenToString, getDJSXType, getProcessedElement) => {
		const embedProps = element.props;
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
			const childType = getDJSXType(child);

			switch (childType) {
				case DJSX.EmbedAuthor: {
					const authorProps = child.props as EmbedAuthorProps;

					payload.author = {
						name: authorProps.name,
						url: authorProps.url,
						icon_url: authorProps.iconUrl,
					};
					break;
				}

				case DJSX.EmbedTitle: {
					if (!payload.title) {
						payload.title = processChildrenToString((child.props as { children: ReactNode }).children);
					}

					break;
				}

				case DJSX.EmbedDescription: {
					const description = processChildrenToString((child.props as { children: ReactNode }).children);

					tempDescription += (tempDescription ? "\n" : "") + description;
					break;
				}

				case DJSX.EmbedFooter: {
					const footerProps = child.props as EmbedFooterProps;

					payload.footer = {
						text: footerProps.text || processChildrenToString(footerProps.children),
						icon_url: footerProps.iconUrl,
					};
					break;
				}

				case DJSX.EmbedImage: {
					payload.image = {
						url: (child.props as EmbedImageProps).url,
					};
					break;
				}

				case DJSX.EmbedThumbnail: {
					payload.thumbnail = {
						url: (child.props as EmbedThumbnailProps).url,
					};
					break;
				}

				case DJSX.EmbedFields: {
					const fieldChildren = Children.toArray((child.props as { children: ReactNode }).children);

					for (const rawFieldChild of fieldChildren) {
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

						// If name or value not provided as props, look in children
						if (!fieldName || !fieldValue) {
							for (const rawSubChild of Children.toArray(fieldProps.children)) {
								if (!isValidElement(rawSubChild)) {
									continue;
								}

								const subChild = getProcessedElement(rawSubChild);
								const subChildType = getDJSXType(subChild);

								if (subChildType === DJSX.EmbedFieldTitle && !fieldName) {
									fieldName = processChildrenToString((subChild.props as { children: ReactNode }).children);
								} else if (subChildType === DJSX.EmbedFieldValue && !fieldValue) {
									fieldValue = processChildrenToString((subChild.props as { children: ReactNode }).children);
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
					break;
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
	},
};
