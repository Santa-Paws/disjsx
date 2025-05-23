import { DISJSX } from "../disjsxTypes";
import { ActionRowNode } from "./ActionRowNode";
import { ButtonNode } from "./ButtonNode";
import { StringSelectNode } from "./StringSelectNode";
import { EmbedNode } from "./EmbedNode";
import { TextDisplayNode } from "./TextDisplayNode";
import { SeparatorNode } from "./SeparatorNode";
import { UserSelectNode } from "./UserSelectNode";
import { ContainerNode } from "./ContainerNode";
import { RoleSelectNode } from "./RoleSelectNode";
import { MentionableSelectNode } from "./MentionableSelectNode";
import { ChannelSelectNode } from "./ChannelSelectNode";
import { TextInputNode } from "./TextInputNode";
import { ThumbnailNode } from "./ThumbnailNode";
import { FileNode } from "./FileNode";
import { SectionNode } from "./SectionNode";
import { MediaGalleryNode } from "./MediaGalleryNode";
import { type NodeProcessor } from "./types";
import type { AnyComponentPayload, EmbedPayload } from "@disjsx/types.ts";

/**
 * Registry of node processors for main DISJSX components
 * Child components (like EmbedAuthor, SelectOption) are handled by their parent processors
 * Special components (like Message, Content) are handled in renderDiscordMessage
 */
export const nodeProcessors = {
	[DISJSX.ActionRow]: ActionRowNode,
	[DISJSX.Button]: ButtonNode,
	[DISJSX.StringSelect]: StringSelectNode,
	[DISJSX.Embed]: EmbedNode,
	[DISJSX.TextDisplay]: TextDisplayNode,
	[DISJSX.Separator]: SeparatorNode,
	[DISJSX.UserSelect]: UserSelectNode,
	[DISJSX.Container]: ContainerNode,
	[DISJSX.RoleSelect]: RoleSelectNode,
	[DISJSX.MentionableSelect]: MentionableSelectNode,
	[DISJSX.ChannelSelect]: ChannelSelectNode,
	[DISJSX.TextInput]: TextInputNode,
	[DISJSX.Thumbnail]: ThumbnailNode,
	[DISJSX.Section]: SectionNode,
	[DISJSX.MediaGallery]: MediaGalleryNode,
	[DISJSX.File]: FileNode,
} satisfies Partial<Record<DISJSX, NodeProcessor<AnyComponentPayload | EmbedPayload, never>>>;

export * from "./types";
export * from "./ActionRowNode";
export * from "./ButtonNode";
export * from "./StringSelectNode";
export * from "./EmbedNode";
export * from "./TextDisplayNode";
export * from "./SeparatorNode";
export * from "./UserSelectNode";
export * from "./ContainerNode";
export * from "./RoleSelectNode";
export * from "./MentionableSelectNode";
export * from "./ChannelSelectNode";
export * from "./TextInputNode";
export * from "./ThumbnailNode";
export * from "./FileNode";
export * from "./SectionNode";
export * from "./MediaGalleryNode";
