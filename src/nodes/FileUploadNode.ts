import { type FileUploadProps, type FileUploadPayload, ComponentType } from "../types";
import { type NodeProcessor } from "./types";

export const FileUploadNode: NodeProcessor<FileUploadPayload, FileUploadProps> = {
	process: (element) => {
		const fileUploadProps = element.props;

		return {
			type: ComponentType.FileUpload,
			id: fileUploadProps.id,
			custom_id: fileUploadProps.customId,
			min_values: fileUploadProps.minValues,
			max_values: fileUploadProps.maxValues,
			required: fileUploadProps.required,
		};
	},
};


