/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	type MessageProps,
	type ModalProps,
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
	type TextInputProps,
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
 * DISJSX component types.
 *
 * These are used to identify the type of a DISJSX component.
 */
export enum DISJSX {
	Message = "disjsx:Message",
	Modal = "disjsx:Modal",
	Content = "disjsx:Content",
	Embed = "disjsx:Embed",
	EmbedAuthor = "disjsx:EmbedAuthor",
	EmbedTitle = "disjsx:EmbedTitle",
	EmbedDescription = "disjsx:EmbedDescription",
	EmbedFields = "disjsx:EmbedFields",
	EmbedField = "disjsx:EmbedField",
	EmbedFieldTitle = "disjsx:EmbedFieldTitle",
	EmbedFieldValue = "disjsx:EmbedFieldValue",
	EmbedFooter = "disjsx:EmbedFooter",
	EmbedImage = "disjsx:EmbedImage",
	EmbedThumbnail = "disjsx:EmbedThumbnail",
	ActionRow = "disjsx:ActionRow",
	Button = "disjsx:Button",
	StringSelect = "disjsx:StringSelect",
	SelectOption = "disjsx:SelectOption",
	UserSelect = "disjsx:UserSelect",
	RoleSelect = "disjsx:RoleSelect",
	MentionableSelect = "disjsx:MentionableSelect",
	ChannelSelect = "disjsx:ChannelSelect",
	TextInput = "disjsx:TextInput",
	Section = "disjsx:Section",
	TextDisplay = "disjsx:TextDisplay",
	Thumbnail = "disjsx:Thumbnail",
	MediaGallery = "disjsx:MediaGallery",
	MediaGalleryItem = "disjsx:MediaGalleryItem",
	File = "disjsx:File",
	Separator = "disjsx:Separator",
	Container = "disjsx:Container",
}

export interface TypedDISJSXComponent<P, T extends DISJSX> extends React.FC<P> {
	disjsxType: T;
}
/* Message */

/**
 * Represents a Discord message, which can contain text, embeds, and components.
 * Supports both legacy and V2 component systems via the `isV2` prop.
 * @see {@link MessageProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#message-object}
 */
export const Message: TypedDISJSXComponent<MessageProps, DISJSX.Message> = (_props) => null;
Message.disjsxType = DISJSX.Message;

/**
 * Represents a Discord modal dialog for collecting user input.
 * Modals can only contain Action Rows with Text Input components.
 * @see {@link ModalProps}
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-modal}
 */
export const Modal: TypedDISJSXComponent<ModalProps, DISJSX.Modal> = (_props) => null;
Modal.disjsxType = DISJSX.Modal;

/**
 * Represents the main text content of a legacy Discord message.
 * Used when `MessageProps.isV2` is `false` or not set.
 * @see {@link ContentProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#message-object-message-structure} (content field)
 */
export const Content: TypedDISJSXComponent<ContentProps, DISJSX.Content> = (_props) => null;
Content.disjsxType = DISJSX.Content;

/**
 * Represents an embed object within a Discord message.
 * Embeds are rich content blocks that can include titles, descriptions, images, and more.
 * @see {@link EmbedProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object}
 */
export const Embed: TypedDISJSXComponent<EmbedProps, DISJSX.Embed> = (_props) => null;
Embed.disjsxType = DISJSX.Embed;

/**
 * Represents the author section of an embed.
 * Typically includes the author's name, URL, and icon.
 * @see {@link EmbedAuthorProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure}
 */
export const EmbedAuthor: TypedDISJSXComponent<EmbedAuthorProps, DISJSX.EmbedAuthor> = (_props) => null;
EmbedAuthor.disjsxType = DISJSX.EmbedAuthor;

/**
 * Represents the title of an embed.
 * @see {@link EmbedTitleProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-structure} (title field)
 */
export const EmbedTitle: TypedDISJSXComponent<EmbedTitleProps, DISJSX.EmbedTitle> = (_props) => null;
EmbedTitle.disjsxType = DISJSX.EmbedTitle;

/**
 * Represents the description text of an embed.
 * @see {@link EmbedDescriptionProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-structure} (description field)
 */
export const EmbedDescription: TypedDISJSXComponent<EmbedDescriptionProps, DISJSX.EmbedDescription> = (_props) => null;
EmbedDescription.disjsxType = DISJSX.EmbedDescription;

/**
 * Represents a container for multiple fields within an embed.
 * @see {@link EmbedFieldsProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure}
 */
export const EmbedFields: TypedDISJSXComponent<EmbedFieldsProps, DISJSX.EmbedFields> = (_props) => null;
EmbedFields.disjsxType = DISJSX.EmbedFields;

/**
 * Represents a single field within an embed, consisting of a name (title) and a value.
 * Fields can be displayed inline.
 * @see {@link EmbedFieldProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure}
 */
export const EmbedField: TypedDISJSXComponent<EmbedFieldProps, DISJSX.EmbedField> = (_props) => null;
EmbedField.disjsxType = DISJSX.EmbedField;

/**
 * Represents the title (name) part of an embed field.
 * @see {@link EmbedFieldTitleProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure} (name field)
 */
export const EmbedFieldTitle: TypedDISJSXComponent<EmbedFieldTitleProps, DISJSX.EmbedFieldTitle> = (_props) => null;
EmbedFieldTitle.disjsxType = DISJSX.EmbedFieldTitle;

/**
 * Represents the value part of an embed field.
 * @see {@link EmbedFieldValueProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure} (value field)
 */
export const EmbedFieldValue: TypedDISJSXComponent<EmbedFieldValueProps, DISJSX.EmbedFieldValue> = (_props) => null;
EmbedFieldValue.disjsxType = DISJSX.EmbedFieldValue;

/**
 * Represents the footer section of an embed.
 * Typically includes text and an icon.
 * @see {@link EmbedFooterProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure}
 */
export const EmbedFooter: TypedDISJSXComponent<EmbedFooterProps, DISJSX.EmbedFooter> = (_props) => null;
EmbedFooter.disjsxType = DISJSX.EmbedFooter;

/**
 * Represents the main image of an embed.
 * @see {@link EmbedImageProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure}
 */
export const EmbedImage: TypedDISJSXComponent<EmbedImageProps, DISJSX.EmbedImage> = (_props) => null;
EmbedImage.disjsxType = DISJSX.EmbedImage;

/**
 * Represents the thumbnail image of an embed, displayed in the top-right corner.
 * @see {@link EmbedThumbnailProps}
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure}
 */
export const EmbedThumbnail: TypedDISJSXComponent<EmbedThumbnailProps, DISJSX.EmbedThumbnail> = (_props) => null;
EmbedThumbnail.disjsxType = DISJSX.EmbedThumbnail;

/* Action Row */

/**
 * Represents an Action Row, a container for interactive components like buttons or select menus.
 * An Action Row can hold up to 5 buttons, or a single select menu, or a single text input (in modals).
 * @see {@link ActionRowProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#action-row}
 */
export const ActionRow: TypedDISJSXComponent<ActionRowProps, DISJSX.ActionRow> = (_props) => null;
ActionRow.disjsxType = DISJSX.ActionRow;

/**
 * Represents an interactive button component.
 * Buttons can trigger interactions or link to URLs.
 * Must be placed within an Action Row or as a Section accessory.
 * @see {@link ButtonProps}
 * @see {@link ButtonStyle}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#button}
 */
export const Button: TypedDISJSXComponent<ButtonProps, DISJSX.Button> = (_props) => null;
Button.disjsxType = DISJSX.Button;

/**
 * Represents a String Select Menu, allowing users to choose from a list of predefined text options.
 * Must be placed within an Action Row.
 * @see {@link StringSelectProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#string-select-menu}
 */
export const StringSelect: TypedDISJSXComponent<StringSelectProps, DISJSX.StringSelect> = (_props) => null;
StringSelect.disjsxType = DISJSX.StringSelect;

/**
 * Represents an option within a String Select Menu.
 * Each option has a user-facing label and a developer-defined value.
 * @see {@link SelectOptionProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#string-select-menu-select-option-structure}
 */
export const SelectOption: TypedDISJSXComponent<SelectOptionProps, DISJSX.SelectOption> = (_props) => null;
SelectOption.disjsxType = DISJSX.SelectOption;

/**
 * Represents a User Select Menu, allowing users to select one or more users from the server.
 * Must be placed within an Action Row.
 * @see {@link UserSelectProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#user-select-menu}
 */
export const UserSelect: TypedDISJSXComponent<UserSelectProps, DISJSX.UserSelect> = (_props) => null;
UserSelect.disjsxType = DISJSX.UserSelect;

/**
 * Represents a Role Select Menu, allowing users to select one or more roles from the server.
 * Must be placed within an Action Row.
 * @see {@link RoleSelectProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#role-select-menu}
 */
export const RoleSelect: TypedDISJSXComponent<RoleSelectProps, DISJSX.RoleSelect> = (_props) => null;
RoleSelect.disjsxType = DISJSX.RoleSelect;

/**
 * Represents a Mentionable Select Menu, allowing users to select users or roles from the server.
 * Must be placed within an Action Row.
 * @see {@link MentionableSelectProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#mentionable-select-menu}
 */
export const MentionableSelect: TypedDISJSXComponent<MentionableSelectProps, DISJSX.MentionableSelect> = (_props) =>
	null;
MentionableSelect.disjsxType = DISJSX.MentionableSelect;

/**
 * Represents a Channel Select Menu, allowing users to select one or more channels from the server.
 * Can be filtered by channel types.
 * Must be placed within an Action Row.
 * @see {@link ChannelSelectProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#channel-select-menu}
 */
export const ChannelSelect: TypedDISJSXComponent<ChannelSelectProps, DISJSX.ChannelSelect> = (_props) => null;
ChannelSelect.disjsxType = DISJSX.ChannelSelect;

/**
 * Represents a Text Input component for modals.
 * Allows users to enter free-form text responses in single-line or multi-line formats.
 * Must be placed within an Action Row in a modal.
 * @see {@link TextInputProps}
 * @see {@link TextInputStyle}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-input}
 */
export const TextInput: TypedDISJSXComponent<TextInputProps, DISJSX.TextInput> = (_props) => null;
TextInput.disjsxType = DISJSX.TextInput;

/* Section */

/**
 * Represents a Section component, a layout element for V2 messages.
 * Sections display text alongside an optional accessory (like a Thumbnail or Button).
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link SectionProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#section}
 */
export const Section: TypedDISJSXComponent<SectionProps, DISJSX.Section> = (_props) => null;
Section.disjsxType = DISJSX.Section;

/**
 * Represents a Text Display component for V2 messages.
 * Used to display markdown-formatted text, similar to message content but as a distinct component.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link TextDisplayProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-display}
 */
export const TextDisplay: TypedDISJSXComponent<TextDisplayProps, DISJSX.TextDisplay> = (_props) => null;
TextDisplay.disjsxType = DISJSX.TextDisplay;

/**
 * Represents a Thumbnail component for V2 messages.
 * A small image typically used as an accessory within a Section.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link ThumbnailProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#thumbnail}
 */
export const Thumbnail: TypedDISJSXComponent<ThumbnailProps, DISJSX.Thumbnail> = (_props) => null;
Thumbnail.disjsxType = DISJSX.Thumbnail;

/**
 * Represents a Media Gallery component for V2 messages.
 * Displays 1-10 media items (images/videos) in an organized gallery format.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link MediaGalleryProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#media-gallery}
 */
export const MediaGallery: TypedDISJSXComponent<MediaGalleryProps, DISJSX.MediaGallery> = (_props) => null;
MediaGallery.disjsxType = DISJSX.MediaGallery;

/**
 * Represents a single item within a Media Gallery.
 * Contains the media URL and optional description.
 * @see {@link MediaGalleryItemProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#media-gallery-item-structure}
 */
export const MediaGalleryItem: TypedDISJSXComponent<MediaGalleryItemProps, DISJSX.MediaGalleryItem> = (_props) => null;
MediaGalleryItem.disjsxType = DISJSX.MediaGalleryItem;

/**
 * Represents a File component for V2 messages.
 * Displays an uploaded file as an attachment, referenced by `attachment://filename`.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link FileProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#file}
 */
export const File: TypedDISJSXComponent<FileProps, DISJSX.File> = (_props) => null;
File.disjsxType = DISJSX.File;

/**
 * Represents a Separator component for V2 messages.
 * Adds vertical padding and an optional visual divider between other components.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link SeparatorProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#separator}
 */
export const Separator: TypedDISJSXComponent<SeparatorProps, DISJSX.Separator> = (_props) => null;
Separator.disjsxType = DISJSX.Separator;

/**
 * Represents a Container component for V2 messages.
 * Visually groups a set of components, with an optional customizable color bar.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link ContainerProps}
 * @see {@link https://discord.com/developers/docs/interactions/message-components#container}
 */
export const Container: TypedDISJSXComponent<ContainerProps, DISJSX.Container> = (_props) => null;
Container.disjsxType = DISJSX.Container;
