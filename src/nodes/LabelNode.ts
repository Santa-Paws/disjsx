import { Children, isValidElement } from "react";
import { type LabelProps, type LabelPayload, ComponentType, type AnyComponentPayload } from "../types";
import { type NodeProcessor } from "./types";

export const LabelNode: NodeProcessor<LabelPayload, LabelProps> = {
	process: (element, processNode) => {
		const labelProps = element.props;
		const children = Children.toArray(labelProps.children);

		// Find the first valid child component
		let component: AnyComponentPayload | null = null;
		for (const child of children) {
			if (isValidElement(child)) {
				const processed = processNode(child);
				if (processed && typeof processed === 'object') {
					component = processed as AnyComponentPayload;
					break;
				}
			}
		}

		if (!component) {
			console.warn("Label must contain a child component (TextInput, Select, or FileUpload)");
			return null;
		}

		return {
			type: ComponentType.Label,
			id: labelProps.id,
			label: labelProps.label,
			description: labelProps.description,
			component: component,
		};
	},
};

