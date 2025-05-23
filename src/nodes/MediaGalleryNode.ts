import { Children, isValidElement } from "react";
import {
	type MediaGalleryProps,
	type MediaGalleryItemProps,
	type MediaGalleryPayload,
	type MediaGalleryItemPayload,
	ComponentType,
} from "../types";
import { DJSX } from "../djsxTypes";
import { type NodeProcessor } from "./types";

export const MediaGalleryNode: NodeProcessor<MediaGalleryPayload, MediaGalleryProps> = {
	process: (element, _, __, getDJSXType, getProcessedElement) => {
		const galleryProps = element.props;
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
		};
	},
};
