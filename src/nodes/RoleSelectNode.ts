import { type RoleSelectProps, type RoleSelectPayload, ComponentType } from "../types";
import { type NodeProcessor } from "./types";

export const RoleSelectNode: NodeProcessor<RoleSelectPayload, RoleSelectProps> = {
	process: (element) => {
		const { customId, placeholder, minValues, maxValues, disabled, defaultValues, id } = element.props;

		return {
			type: ComponentType.RoleSelect,
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
