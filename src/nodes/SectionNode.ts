import { Children } from "react";
import {
	type SectionProps,
	type SectionPayload,
	type TextDisplayPayload,
	type ThumbnailPayload,
	type ButtonPayload,
	type AnyComponentPayload,
	ComponentType,
} from "../types";
import { type NodeProcessor } from "./types";

export const SectionNode: NodeProcessor<SectionPayload, SectionProps> = {
	process: (element, processChildNode) => {
		const sectionProps = element.props;
		const sectionChildren = Children.toArray(sectionProps.children);
		const textDisplays: TextDisplayPayload[] = [];
		let accessory: ThumbnailPayload | ButtonPayload | undefined = undefined;

		for (const child of sectionChildren) {
			const processedChild = processChildNode(child);

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
		};
	},
};
