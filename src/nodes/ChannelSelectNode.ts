import { type ChannelSelectProps, type ChannelSelectPayload, ComponentType } from "../types";
import { type NodeProcessor } from "./types";

export const ChannelSelectNode: NodeProcessor<ChannelSelectPayload, ChannelSelectProps> = {
	process: (element) => {
		const { customId, placeholder, minValues, maxValues, disabled, defaultValues, channelTypes, id } = element.props;

		return {
			type: ComponentType.ChannelSelect,
			id,
			custom_id: customId,
			placeholder,
			min_values: minValues,
			max_values: maxValues,
			disabled,
			default_values: defaultValues,
			channel_types: channelTypes,
		};
	},
};
