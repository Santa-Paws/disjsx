import { type TextInputProps, type TextInputPayload, ComponentType } from "../types";
import { type NodeProcessor } from "./types";

export const TextInputNode: NodeProcessor<TextInputPayload, TextInputProps> = {
	process: (element) => {
		const textInputProps = element.props;

		return {
			type: ComponentType.TextInput,
			id: textInputProps.id,
			custom_id: textInputProps.customId,
			style: textInputProps.style,
			label: textInputProps.label,
			min_length: textInputProps.minLength,
			max_length: textInputProps.maxLength,
			required: textInputProps.required,
			value: textInputProps.value,
			placeholder: textInputProps.placeholder,
		};
	},
};
