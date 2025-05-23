import { type MentionableSelectProps, type MentionableSelectPayload, ComponentType } from "../types";
import { type NodeProcessor } from "./types";

export const MentionableSelectNode: NodeProcessor<MentionableSelectPayload, MentionableSelectProps> = {
	process: (element) => {
		const { customId, placeholder, minValues, maxValues, disabled, defaultValues, id } = element.props;

		return {
			type: ComponentType.MentionableSelect,
			id,
			custom_id: customId,
			placeholder,
			min_values: minValues,
			max_values: maxValues,
			disabled,
			default_values: defaultValues,
		};
	},
};
