import { type ButtonProps, type ButtonPayload, ComponentType, ButtonStyle } from "../types";
import { type NodeProcessor } from "./types";

export const ButtonNode: NodeProcessor<ButtonPayload, ButtonProps> = {
	process: (element) => {
		const btnProps = element.props;
		const payload: ButtonPayload = {
			type: ComponentType.Button,
			id: btnProps.id,
			style: btnProps.style,
			label: btnProps.label || (typeof btnProps.children === "string" ? btnProps.children : undefined),
			emoji: btnProps.emoji,
			disabled: btnProps.disabled,
		};

		if (btnProps.style === ButtonStyle.Link) {
			payload.url = btnProps.url;
		} else if (btnProps.style === ButtonStyle.Premium) {
			payload.sku_id = btnProps.skuId;
		} else {
			payload.custom_id = btnProps.customId;
		}

		return payload;
	},
};
