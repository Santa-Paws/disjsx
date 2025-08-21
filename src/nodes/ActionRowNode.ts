import { Children } from "react";
import { type ActionRowProps, type ActionRowPayload, type AnyComponentPayload, ComponentType } from "../types";
import { type NodeProcessor } from "./types";

export const ActionRowNode: NodeProcessor<ActionRowPayload, ActionRowProps> = {
	process: (element, processChildNode) => {
		const actionRowProps = element.props;
		const components: AnyComponentPayload[] = [];

		for (const child of Children.toArray(actionRowProps.children)) {
			const processedChild = processChildNode(child);

			if (processedChild !== null) {
				// Handle arrays returned from Fragments
				if (Array.isArray(processedChild)) {
					components.push(...(processedChild as AnyComponentPayload[]));
				} else {
					components.push(processedChild as AnyComponentPayload);
				}
			}
		}

		return {
			type: ComponentType.ActionRow,
			id: actionRowProps.id,
			components,
		};
	},
};
