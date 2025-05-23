import { Children } from "react";
import { type ContainerProps, type ContainerPayload, type AnyComponentPayload, ComponentType } from "../types";
import { type NodeProcessor } from "./types";

export const ContainerNode: NodeProcessor<ContainerPayload, ContainerProps> = {
	process: (element, processChildNode) => {
		const containerProps = element.props;
		const components: AnyComponentPayload[] = [];

		for (const child of Children.toArray(containerProps.children)) {
			const processedChild = processChildNode(child);

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
		};
	},
};
