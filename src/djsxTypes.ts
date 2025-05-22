/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	type MessageProps,
	type ContentProps,
	type EmbedProps,
	type EmbedAuthorProps,
	type EmbedTitleProps,
	type EmbedDescriptionProps,
	type EmbedFieldsProps,
	type EmbedFieldProps,
	type EmbedFieldTitleProps,
	type EmbedFieldValueProps,
	type EmbedFooterProps,
	type EmbedImageProps,
	type EmbedThumbnailProps,
	type ActionRowProps,
	type ButtonProps,
	type StringSelectProps,
	type SelectOptionProps,
	type UserSelectProps,
	type RoleSelectProps,
	type MentionableSelectProps,
	type ChannelSelectProps,
	type SectionProps,
	type TextDisplayProps,
	type ThumbnailProps,
	type MediaGalleryProps,
	type MediaGalleryItemProps,
	type FileProps,
	type SeparatorProps,
	type ContainerProps,
} from "./types";

/**
 * DJSX component types.
 *
 * These are used to identify the type of a DJSX component.
 */
export enum DJSX {
	Message = "djsx:Message",
	Content = "djsx:Content",
	Embed = "djsx:Embed",
	EmbedAuthor = "djsx:EmbedAuthor",
	EmbedTitle = "djsx:EmbedTitle",
	EmbedDescription = "djsx:EmbedDescription",
	EmbedFields = "djsx:EmbedFields",
	EmbedField = "djsx:EmbedField",
	EmbedFieldTitle = "djsx:EmbedFieldTitle",
	EmbedFieldValue = "djsx:EmbedFieldValue",
	EmbedFooter = "djsx:EmbedFooter",
	EmbedImage = "djsx:EmbedImage",
	EmbedThumbnail = "djsx:EmbedThumbnail",
	ActionRow = "djsx:ActionRow",
	Button = "djsx:Button",
	StringSelect = "djsx:StringSelect",
	SelectOption = "djsx:SelectOption",
	UserSelect = "djsx:UserSelect",
	RoleSelect = "djsx:RoleSelect",
	MentionableSelect = "djsx:MentionableSelect",
	ChannelSelect = "djsx:ChannelSelect",
	Section = "djsx:Section",
	TextDisplay = "djsx:TextDisplay",
	Thumbnail = "djsx:Thumbnail",
	MediaGallery = "djsx:MediaGallery",
	MediaGalleryItem = "djsx:MediaGalleryItem",
	File = "djsx:File",
	Separator = "djsx:Separator",
	Container = "djsx:Container",
}

export interface TypedDJSXComponent<P, T extends DJSX> extends React.FC<P> {
	djsxType: T;
}
/* Message */

/**
 * Represents a Discord message, which can contain text, embeds, and components.
 * Supports both legacy and V2 component systems via the `isV2` prop.
 * @see {@link MessageProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#message-object}
 */
export const Message: TypedDJSXComponent<MessageProps, DJSX.Message> = (_props) => null;
Message.djsxType = DJSX.Message;

/**
 * Represents the main text content of a legacy Discord message.
 * Used when `MessageProps.isV2` is `false` or not set.
 * @see {@link ContentProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#message-object-message-structure} (content field)
 */
export const Content: TypedDJSXComponent<ContentProps, DJSX.Content> = (_props) => null;
Content.djsxType = DJSX.Content;

/**
 * Represents an embed object within a Discord message.
 * Embeds are rich content blocks that can include titles, descriptions, images, and more.
 * @see {@link EmbedProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object}
 */
export const Embed: TypedDJSXComponent<EmbedProps, DJSX.Embed> = (_props) => null;
Embed.djsxType = DJSX.Embed;

/**
 * Represents the author section of an embed.
 * Typically includes the author's name, URL, and icon.
 * @see {@link EmbedAuthorProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure}
 */
export const EmbedAuthor: TypedDJSXComponent<EmbedAuthorProps, DJSX.EmbedAuthor> = (_props) => null;
EmbedAuthor.djsxType = DJSX.EmbedAuthor;

/**
 * Represents the title of an embed.
 * @see {@link EmbedTitleProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-structure} (title field)
 */
export const EmbedTitle: TypedDJSXComponent<EmbedTitleProps, DJSX.EmbedTitle> = (_props) => null;
EmbedTitle.djsxType = DJSX.EmbedTitle;

/**
 * Represents the description text of an embed.
 * @see {@link EmbedDescriptionProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-structure} (description field)
 */
export const EmbedDescription: TypedDJSXComponent<EmbedDescriptionProps, DJSX.EmbedDescription> = (_props) => null;
EmbedDescription.djsxType = DJSX.EmbedDescription;

/**
 * Represents a container for multiple fields within an embed.
 * @see {@link EmbedFieldsProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure}
 */
export const EmbedFields: TypedDJSXComponent<EmbedFieldsProps, DJSX.EmbedFields> = (_props) => null;
EmbedFields.djsxType = DJSX.EmbedFields;

/**
 * Represents a single field within an embed, consisting of a name (title) and a value.
 * Fields can be displayed inline.
 * @see {@link EmbedFieldProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure}
 */
export const EmbedField: TypedDJSXComponent<EmbedFieldProps, DJSX.EmbedField> = (_props) => null;
EmbedField.djsxType = DJSX.EmbedField;

/**
 * Represents the title (name) part of an embed field.
 * @see {@link EmbedFieldTitleProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure} (name field)
 */
export const EmbedFieldTitle: TypedDJSXComponent<EmbedFieldTitleProps, DJSX.EmbedFieldTitle> = (_props) => null;
EmbedFieldTitle.djsxType = DJSX.EmbedFieldTitle;

/**
 * Represents the value part of an embed field.
 * @see {@link EmbedFieldValueProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure} (value field)
 */
export const EmbedFieldValue: TypedDJSXComponent<EmbedFieldValueProps, DJSX.EmbedFieldValue> = (_props) => null;
EmbedFieldValue.djsxType = DJSX.EmbedFieldValue;

/**
 * Represents the footer section of an embed.
 * Typically includes text and an icon.
 * @see {@link EmbedFooterProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure}
 */
export const EmbedFooter: TypedDJSXComponent<EmbedFooterProps, DJSX.EmbedFooter> = (_props) => null;
EmbedFooter.djsxType = DJSX.EmbedFooter;

/**
 * Represents the main image of an embed.
 * @see {@link EmbedImageProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure}
 */
export const EmbedImage: TypedDJSXComponent<EmbedImageProps, DJSX.EmbedImage> = (_props) => null;
EmbedImage.djsxType = DJSX.EmbedImage;

/**
 * Represents the thumbnail image of an embed, displayed in the top-right corner.
 * @see {@link EmbedThumbnailProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure}
 */
export const EmbedThumbnail: TypedDJSXComponent<EmbedThumbnailProps, DJSX.EmbedThumbnail> = (_props) => null;
EmbedThumbnail.djsxType = DJSX.EmbedThumbnail;

/* Action Row */

/**
 * Represents an Action Row, a container for interactive components like buttons or select menus.
 * An Action Row can hold up to 5 buttons, or a single select menu, or a single text input (in modals).
 * @see {@link ActionRowProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#action-row}
 */
export const ActionRow: TypedDJSXComponent<ActionRowProps, DJSX.ActionRow> = (_props) => null;
ActionRow.djsxType = DJSX.ActionRow;

/**
 * Represents an interactive button component.
 * Buttons can trigger interactions or link to URLs.
 * Must be placed within an Action Row or as a Section accessory.
 * @see {@link ButtonProps}
 * @see {@link ButtonStyle}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#button}
 */
export const Button: TypedDJSXComponent<ButtonProps, DJSX.Button> = (_props) => null;
Button.djsxType = DJSX.Button;

/**
 * Represents a String Select Menu, allowing users to choose from a list of predefined text options.
 * Must be placed within an Action Row.
 * @see {@link StringSelectProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#string-select-menu}
 */
export const StringSelect: TypedDJSXComponent<StringSelectProps, DJSX.StringSelect> = (_props) => null;
StringSelect.djsxType = DJSX.StringSelect;

/**
 * Represents an option within a String Select Menu.
 * Each option has a user-facing label and a developer-defined value.
 * @see {@link SelectOptionProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#string-select-menu-select-option-structure}
 */
export const SelectOption: TypedDJSXComponent<SelectOptionProps, DJSX.SelectOption> = (_props) => null;
SelectOption.djsxType = DJSX.SelectOption;

/**
 * Represents a User Select Menu, allowing users to select one or more users from the server.
 * Must be placed within an Action Row.
 * @see {@link UserSelectProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#user-select-menu}
 */
export const UserSelect: TypedDJSXComponent<UserSelectProps, DJSX.UserSelect> = (_props) => null;
UserSelect.djsxType = DJSX.UserSelect;

/**
 * Represents a Role Select Menu, allowing users to select one or more roles from the server.
 * Must be placed within an Action Row.
 * @see {@link RoleSelectProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#role-select-menu}
 */
export const RoleSelect: TypedDJSXComponent<RoleSelectProps, DJSX.RoleSelect> = (_props) => null;
RoleSelect.djsxType = DJSX.RoleSelect;

/**
 * Represents a Mentionable Select Menu, allowing users to select users or roles from the server.
 * Must be placed within an Action Row.
 * @see {@link MentionableSelectProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#mentionable-select-menu}
 */
export const MentionableSelect: TypedDJSXComponent<MentionableSelectProps, DJSX.MentionableSelect> = (_props) => null;
MentionableSelect.djsxType = DJSX.MentionableSelect;

/**
 * Represents a Channel Select Menu, allowing users to select one or more channels from the server.
 * Can be filtered by channel types.
 * Must be placed within an Action Row.
 * @see {@link ChannelSelectProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#channel-select-menu}
 */
export const ChannelSelect: TypedDJSXComponent<ChannelSelectProps, DJSX.ChannelSelect> = (_props) => null;
ChannelSelect.djsxType = DJSX.ChannelSelect;

/* Section */

/**
 * Represents a Section component, a layout element for V2 messages.
 * Sections display text alongside an optional accessory (like a Thumbnail or Button).
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link SectionProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#section}
 */
export const Section: TypedDJSXComponent<SectionProps, DJSX.Section> = (_props) => null;
Section.djsxType = DJSX.Section;

/**
 * Represents a Text Display component for V2 messages.
 * Used to display markdown-formatted text, similar to message content but as a distinct component.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link TextDisplayProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-display}
 */
export const TextDisplay: TypedDJSXComponent<TextDisplayProps, DJSX.TextDisplay> = (_props) => null;
TextDisplay.djsxType = DJSX.TextDisplay;

/**
 * Represents a Thumbnail component for V2 messages.
 * A small image typically used as an accessory within a Section.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link ThumbnailProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#thumbnail}
 */
export const Thumbnail: TypedDJSXComponent<ThumbnailProps, DJSX.Thumbnail> = (_props) => null;
Thumbnail.djsxType = DJSX.Thumbnail;

/**
 * Represents a Media Gallery component for V2 messages.
 * Displays 1-10 media items (images/videos) in an organized gallery format.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link MediaGalleryProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#media-gallery}
 */
export const MediaGallery: TypedDJSXComponent<MediaGalleryProps, DJSX.MediaGallery> = (_props) => null;
MediaGallery.djsxType = DJSX.MediaGallery;

/**
 * Represents a single item within a Media Gallery.
 * Contains the media URL and optional description.
 * @see {@link MediaGalleryItemProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#media-gallery-item-structure}
 */
export const MediaGalleryItem: TypedDJSXComponent<MediaGalleryItemProps, DJSX.MediaGalleryItem> = (_props) => null;
MediaGalleryItem.djsxType = DJSX.MediaGalleryItem;

/**
 * Represents a File component for V2 messages.
 * Displays an uploaded file as an attachment, referenced by `attachment://filename`.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link FileProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#file}
 */
export const File: TypedDJSXComponent<FileProps, DJSX.File> = (_props) => null;
File.djsxType = DJSX.File;

/**
 * Represents a Separator component for V2 messages.
 * Adds vertical padding and an optional visual divider between other components.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link SeparatorProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#separator}
 */
export const Separator: TypedDJSXComponent<SeparatorProps, DJSX.Separator> = (_props) => null;
Separator.djsxType = DJSX.Separator;

/**
 * Represents a Container component for V2 messages.
 * Visually groups a set of components, with an optional customizable color bar.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link ContainerProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#container}
 */
export const Container: TypedDJSXComponent<ContainerProps, DJSX.Container> = (_props) => null;
Container.djsxType = DJSX.Container;
