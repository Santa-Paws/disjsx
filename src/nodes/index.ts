import { DJSX } from "../djsxTypes";
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
import { ThumbnailNode } from "./ThumbnailNode";
import { FileNode } from "./FileNode";
import { SectionNode } from "./SectionNode";
import { MediaGalleryNode } from "./MediaGalleryNode";
import { type NodeProcessor } from "./types";
import type { AnyComponentPayload, EmbedPayload } from "@djsx/types.ts";

/**
 * Registry of node processors for main DJSX components
 * Child components (like EmbedAuthor, SelectOption) are handled by their parent processors
 * Special components (like Message, Content) are handled in renderDiscordMessage
 */
export const nodeProcessors = {
	[DJSX.ActionRow]: ActionRowNode,
	[DJSX.Button]: ButtonNode,
	[DJSX.StringSelect]: StringSelectNode,
	[DJSX.Embed]: EmbedNode,
	[DJSX.TextDisplay]: TextDisplayNode,
	[DJSX.Separator]: SeparatorNode,
	[DJSX.UserSelect]: UserSelectNode,
	[DJSX.Container]: ContainerNode,
	[DJSX.RoleSelect]: RoleSelectNode,
	[DJSX.MentionableSelect]: MentionableSelectNode,
	[DJSX.ChannelSelect]: ChannelSelectNode,
	[DJSX.Thumbnail]: ThumbnailNode,
	[DJSX.Section]: SectionNode,
	[DJSX.MediaGallery]: MediaGalleryNode,
	[DJSX.File]: FileNode,
} satisfies Partial<Record<DJSX, NodeProcessor<AnyComponentPayload | EmbedPayload, never>>>;

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
export * from "./ThumbnailNode";
export * from "./FileNode";
export * from "./SectionNode";
export * from "./MediaGalleryNode";
