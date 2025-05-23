import { type SeparatorProps, type SeparatorPayload, ComponentType } from "../types";
import { type NodeProcessor } from "./types";

export const SeparatorNode: NodeProcessor<SeparatorPayload, SeparatorProps> = {
	process: (element) => {
		const sepProps = element.props;

		return {
			type: ComponentType.Separator,
			id: sepProps.id,
			divider: sepProps.divider === undefined ? true : sepProps.divider,
			spacing: sepProps.spacing === undefined ? 1 : sepProps.spacing,
		};
	},
};
