import { type FileProps, type FilePayload, ComponentType } from "../types";
import { type NodeProcessor } from "./types";

export const FileNode: NodeProcessor<FilePayload, FileProps> = {
	process: (element) => {
		const fileProps = element.props;

		return {
			type: ComponentType.File,
			id: fileProps.id,
			file: { url: fileProps.url },
			spoiler: fileProps.spoiler,
		};
	},
};
