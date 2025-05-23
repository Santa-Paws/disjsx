import { type TextDisplayProps, type TextDisplayPayload, ComponentType } from "../types";
import { type NodeProcessor } from "./types";

export const TextDisplayNode: NodeProcessor<TextDisplayPayload, TextDisplayProps> = {
	process: (element, _, processChildrenToString) => {
		const textDisplayProps = element.props;

		return {
			type: ComponentType.TextDisplay,
			id: textDisplayProps.id,
			content: processChildrenToString(textDisplayProps.children),
		};
	},
};
