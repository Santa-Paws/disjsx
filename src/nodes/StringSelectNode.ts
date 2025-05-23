import { Children, isValidElement } from "react";
import {
	type StringSelectProps,
	type SelectOptionProps,
	type StringSelectPayload,
	type SelectOptionPayload,
	ComponentType,
} from "../types";
import { DISJSX } from "../disjsxTypes";
import { type NodeProcessor } from "./types";

export const StringSelectNode: NodeProcessor<StringSelectPayload, StringSelectProps> = {
	process: (element, _, __, getDISJSXType, getProcessedElement) => {
		const selProps = element.props;
		const options: SelectOptionPayload[] = [];

		for (const rawChildNode of Children.toArray(selProps.children)) {
			if (!isValidElement(rawChildNode)) {
				continue;
			}

			const childNode = getProcessedElement(rawChildNode);

			if (getDISJSXType(childNode) !== DISJSX.SelectOption) {
				continue;
			}
			const optProps = childNode.props as SelectOptionProps;

			options.push({
				label: optProps.label || (typeof optProps.children === "string" ? optProps.children : "Option"),
				value: optProps.value,
				description: optProps.description,
				emoji: optProps.emoji,
				default: optProps.isDefault,
			});
		}

		return {
			type: ComponentType.StringSelect,
			id: selProps.id,
			custom_id: selProps.customId,
			placeholder: selProps.placeholder,
			min_values: selProps.minValues,
			max_values: selProps.maxValues,
			disabled: selProps.disabled,
			options,
		};
	},
};
