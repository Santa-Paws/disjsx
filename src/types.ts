/* eslint-disable @typescript-eslint/no-empty-object-type */
/**
 * @see {@link https://discord.com/developers/docs/resources/channel#message-object-message-flags}
 * taken from "discord-api-types": @see {@link https://github.com/discordjs/discord-api-types/blob/main/payloads/v10/channel.ts#L887}
 */
export enum MessageFlags {
	/**
	 * This message has been published to subscribed channels (via Channel Following)
	 */
	Crossposted = 1 << 0,
	/**
	 * This message originated from a message in another channel (via Channel Following)
	 */
	IsCrosspost = 1 << 1,
	/**
	 * Do not include any embeds when serializing this message
	 */
	SuppressEmbeds = 1 << 2,
	/**
	 * The source message for this crosspost has been deleted (via Channel Following)
	 */
	SourceMessageDeleted = 1 << 3,
	/**
	 * This message came from the urgent message system
	 */
	Urgent = 1 << 4,
	/**
	 * This message has an associated thread, which shares its id
	 */
	HasThread = 1 << 5,
	/**
	 * This message is only visible to the user who invoked the Interaction
	 */
	Ephemeral = 1 << 6,
	/**
	 * This message is an Interaction Response and the bot is "thinking"
	 */
	Loading = 1 << 7,
	/**
	 * This message failed to mention some roles and add their members to the thread
	 */
	FailedToMentionSomeRolesInThread = 1 << 8,
	/**
	 * @unstable This message flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	 */
	ShouldShowLinkNotDiscordWarning = 1 << 10,
	/**
	 * This message will not trigger push and desktop notifications
	 */
	SuppressNotifications = 1 << 12,
	/**
	 * This message is a voice message
	 */
	IsVoiceMessage = 1 << 13,
	/**
	 * This message has a snapshot (via Message Forwarding)
	 */
	HasSnapshot = 1 << 14,
	/**
	 * Allows you to create fully component-driven messages
	 */
	IsComponentsV2 = 1 << 15,
}

/**
 * Enum representing the different types of message components.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object-component-types}
 */
export enum ComponentType {
	/** Container to display a row of interactive components. */
	ActionRow = 1,
	/** Button object. */
	Button = 2,
	/** Select menu for picking from defined text options. */
	StringSelect = 3,
	// Note: Text Input (type 4) is in the documentation but not in this enum.
	/** Select menu for users. */
	UserSelect = 5,
	/** Select menu for roles. */
	RoleSelect = 6,
	/** Select menu for mentionables (users and roles). */
	MentionableSelect = 7,
	/** Select menu for channels. */
	ChannelSelect = 8,
	/** Container to display text alongside an accessory component. */
	Section = 9,
	/** Markdown text. */
	TextDisplay = 10,
	/** Small image that can be used as an accessory. */
	Thumbnail = 11,
	/** Display images and other media. */
	MediaGallery = 12,
	/** Displays an attached file. */
	File = 13,
	/** Component to add vertical padding between other components. */
	Separator = 14,
	/** Container that visually groups a set of components. */
	Container = 17,
}

/**
 * Enum representing the different styles for a button component.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#button-button-styles}
 */
export enum ButtonStyle {
	/** The most important or recommended action in a group of options. Requires `custom_id`. */
	Primary = 1,
	/** Alternative or supporting actions. Requires `custom_id`. */
	Secondary = 2,
	/** Positive confirmation or completion actions. Requires `custom_id`. */
	Success = 3,
	/** An action with irreversible consequences. Requires `custom_id`. */
	Danger = 4,
	/** Navigates to a URL. Requires `url`. */
	Link = 5,
	/** Purchase button. Requires `sku_id`. */
	Premium = 6,
}

/**
 * Enum representing the different styles for a text input component.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-input-text-input-styles}
 */
export enum TextInputStyle {
	/** Single-line input. */
	Short = 1,
	/** Multi-line input. */
	Paragraph = 2,
}

/**
 * Some default colors for embeds to help you get started.
 */
export enum Colors {
	/** Hex: #5865F2 */
	Blurple = 0x5865f2,

	/** Hex: #ED4245 */
	Red = 0xed4245,

	/** Hex: #57F287 */
	Green = 0x57f287,

	/** Hex: #FEE75C */
	Yellow = 0xfee75c,

	/** Hex: #9B59B6 */
	Purple = 0x9b59b6,

	/** Hex: #E91E63 */
	Pink = 0xe91e63,

	/** Hex: #E67E22 */
	Orange = 0xe67e22,

	/** Hex: #3498DB */
	Blue = 0x3498db,

	/** Hex: #FFD700 */
	Gold = 0xffd700,

	/** Hex: #1ABC9C */
	Aqua = 0x1abc9c,

	/** Hex: #FFFFFF */
	White = 0xffffff,

	/** Hex: #E0E3FF - Discord's "Light Blurple" */
	LightBlurple = 0xe0e3ff,

	/** Hex: #2C2F33 - Discord's Embed Background (Dark Theme) */
	EmbedDarkBackground = 0x2c2f33,

	/** Hex: #000000 - True Black */
	TrueBlack = 0x000000,
}

export enum ChannelTypes {
	/** A text channel within a server. */
	GuildText = 0,
	/** A direct message between users. */
	Dm = 1,
	/** A voice channel within a server. */
	GuildVoice = 2,
	/** A group direct message. */
	GroupDm = 3,
	/** A category channel within a server. */
	GuildCategory = 4,
	/** An announcement channel within a server. */
	GuildAnnouncement = 5,
	/** A thread in an announcement channel. */
	AnnouncementThread = 10,
	/** A public thread in a text channel. */
	PublicThread = 11,
	/** A private thread in a text channel. */
	PrivateThread = 12,
	/** A stage channel within a server. */
	GuildStageVoice = 13,
	GuildDirectory = 14,
	/** A forum channel within a server. */
	GuildForum = 15,
	/** A media channel within a server. */
	GuildMedia = 16,
}

/**
 * Represents a partial emoji object.
 * @see {@link https://discord.com/developers/docs/resources/emoji#emoji-object}
 */
interface EmojiObject {
	/** Emoji ID. */
	id?: string;
	/** Emoji name. */
	name?: string;
	/** Whether this emoji is animated. */
	animated?: boolean;
}

/**
 * Represents an unfurled media item, used in Thumbnails, Media Galleries, and Files.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#unfurled-media-item-structure}
 */
interface UnfurledMediaItem {
	/**
	 * URL of the media. Supports arbitrary URLs and `attachment://<filename>` references.
	 * For File components, this only supports `attachment://<filename>`.
	 */
	url: string;
	/** Proxied URL of the media item. (Provided by API, ignored in requests). */
	proxy_url?: string;
	/** Height of the media item. (Provided by API, ignored in requests). */
	height?: number;
	/** Width of the media item. (Provided by API, ignored in requests). */
	width?: number;
	/** Media type of the content. (Provided by API, ignored in requests). */
	content_type?: string;
}

/**
 * Base interface for all component objects.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object}
 */
interface BaseComponent {
	/** The type of the component. */
	type: ComponentType;
	/** Optional 32-bit integer identifier for the component. Generated sequentially if empty. */
	id?: number;
}

/**
 * Base interface for interactive components that require a `custom_id`.
 */
interface InteractiveComponent extends BaseComponent {
	/** Developer-defined identifier for the component, max 100 characters. Must be unique per component on a message. */
	custom_id: string;
}

/**
 * Props for the ActionRow component.
 * An Action Row is a top-level layout component used in messages and modals.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#action-row}
 */
export interface ActionRowProps {
	/**
	 * Child components. Can contain:
	 * - Up to 5 contextually grouped Buttons.
	 * - A single Text Input (for modals).
	 * - A single Select Menu (String, User, Role, Mentionable, or Channel).
	 */
	children: React.ReactNode;
	/** Optional identifier for the component. */
	id?: number;
}
/**
 * Payload structure for an Action Row component.
 */
interface ActionRowPayload extends BaseComponent {
	type: ComponentType.ActionRow;
	/**
	 * Array of components within the Action Row.
	 * Can be up to 5 Button components, or a single Select Menu component, or a single Text Input component.
	 */
	components: AnyComponentPayload[]; // Assuming AnyComponentPayload is a union of all component payloads
}

/**
 * Props for the Section component.
 * A Section is a top-level layout component that allows joining text contextually with an accessory.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#section}
 */
export interface SectionProps {
	/**
	 * Child components, typically processed into 1 to 3 TextDisplay components.
	 */
	children: React.ReactNode;
	/** Optional identifier for the component. */
	id?: number;
	// Note: The accessory (Thumbnail or Button) is part of the payload but not explicitly a prop here.
	// It's likely handled by specific child components or an internal mechanism.
}
/**
 * Payload structure for a Section component.
 */
interface SectionPayload extends BaseComponent {
	type: ComponentType.Section;
	/** One to three Text Display components. */
	components: TextDisplayPayload[];
	/** An optional accessory component (Thumbnail or Button). */
	accessory?: ThumbnailPayload | ButtonPayload;
}

/**
 * Props for the Container component.
 * A Container is a top-level layout component that visually groups a set of components.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#container}
 */
export interface ContainerProps {
	/**
	 * Child components. Can be Action Rows, Text Displays, Sections, Media Galleries, Separators, or Files.
	 */
	children: React.ReactNode;
	/** Optional color for the accent on the container (RGB integer from `0x000000` to `0xFFFFFF`). */
	accentColor?: number | string; // string for hex representation convenience
	/** Whether the container should be a spoiler (blurred out). Defaults to `false`. */
	spoiler?: boolean;
	/** Optional identifier for the component. */
	id?: number;
}
/**
 * Payload structure for a Container component.
 */
interface ContainerPayload extends BaseComponent {
	type: ComponentType.Container;
	/**
	 * Components within the container.
	 * Allowed types: Action Row, Text Display, Section, Media Gallery, Separator, File.
	 */
	components: AnyComponentPayload[]; // Assuming AnyComponentPayload is a union of specific component payloads
	/** Color for the accent on the container as an RGB integer. */
	accent_color?: number;
	/** Whether the container should be a spoiler. Defaults to `false`. */
	spoiler?: boolean;
}

/**
 * Props for the Separator component.
 * A Separator is a top-level layout component that adds vertical padding and visual division.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#separator}
 */
export interface SeparatorProps {
	/** Whether a visual divider should be displayed. Defaults to `true`. */
	divider?: boolean;
	/** Size of separator padding: `1` for small, `2` for large. Defaults to `1`. */
	spacing?: 1 | 2;
	/** Optional identifier for the component. */
	id?: number;
}
/**
 * Payload structure for a Separator component.
 */
interface SeparatorPayload extends BaseComponent {
	type: ComponentType.Separator;
	/** Whether a visual divider should be displayed. Defaults to `true`. */
	divider?: boolean;
	/** Size of separator padding. Defaults to `1`. */
	spacing?: 1 | 2;
}

/**
 * Props for the TextDisplay component.
 * A Text Display is a top-level content component for formatted markdown text.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-display}
 */
export interface TextDisplayProps {
	/** The markdown content to be displayed. */
	children: React.ReactNode; // Will be stringified to form the 'content' field
	/** Optional identifier for the component. */
	id?: number;
}
/**
 * Payload structure for a Text Display component.
 */
interface TextDisplayPayload extends BaseComponent {
	type: ComponentType.TextDisplay;
	/** Text that will be displayed, supporting markdown. */
	content: string;
}

/**
 * Props for the Thumbnail component.
 * A Thumbnail is a small image used as an accessory in a Section.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#thumbnail}
 */
export interface ThumbnailProps {
	/**
	 * URL of the media. Supports arbitrary URLs (http/https) or `attachment://<filename>` references.
	 */
	url: string;
	/** Alt text for the media, max 1024 characters. */
	description?: string;
	/** Whether the thumbnail should be a spoiler. Defaults to `false`. */
	spoiler?: boolean;
	/** Optional identifier for the component. */
	id?: number;
}
/**
 * Payload structure for a Thumbnail component.
 */
interface ThumbnailPayload extends BaseComponent {
	type: ComponentType.Thumbnail;
	/** The unfurled media item (URL or attachment). */
	media: UnfurledMediaItem;
	/** Alt text for the media, max 1024 characters. */
	description?: string;
	/** Whether the thumbnail should be a spoiler. Defaults to `false`. */
	spoiler?: boolean;
}

/**
 * Props for an item within a MediaGallery.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#media-gallery-item-structure}
 */
export interface MediaGalleryItemProps {
	/**
	 * URL of the media. Supports arbitrary URLs (http/https) or `attachment://<filename>` references.
	 */
	url: string;

	/** Alt text for the media, max 1024 characters. */
	description?: string;
	/** Whether the media should be a spoiler. Defaults to `false`. */
	spoiler?: boolean;
}
/**
 * Payload structure for a Media Gallery item.
 */
interface MediaGalleryItemPayload {
	/** The unfurled media item (URL or attachment). */
	media: UnfurledMediaItem;
	/** Alt text for the media, max 1024 characters. */
	description?: string;
	/** Whether the media should be a spoiler. Defaults to `false`. */
	spoiler?: boolean;
}

/**
 * Props for the MediaGallery component.
 * A Media Gallery displays 1-10 media attachments in an organized format.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#media-gallery}
 */
export interface MediaGalleryProps {
	/** One to ten MediaGalleryItemProps elements. */
	children: React.ReactElement<MediaGalleryItemProps> | React.ReactElement<MediaGalleryItemProps>[];
	/** Optional identifier for the component. */
	id?: number;
}
/**
 * Payload structure for a Media Gallery component.
 */
interface MediaGalleryPayload extends BaseComponent {
	type: ComponentType.MediaGallery;
	/** Array of 1 to 10 media gallery items. */
	items: MediaGalleryItemPayload[];
}

/**
 * Props for the File component.
 * A File component displays an uploaded file as an attachment.
 * Requires the `IS_COMPONENTS_V2` message flag.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#file}
 */
export interface FileProps {
	/**
	 * URL of the file, must be an attachment reference using `attachment://<filename>` syntax.
	 */
	url: string; // Must be attachment://<filename>
	/** Whether the file should be a spoiler. Defaults to `false`. */
	spoiler?: boolean;
	/** Optional identifier for the component. */
	id?: number;
}
/**
 * Payload structure for a File component.
 */
interface FilePayload extends BaseComponent {
	type: ComponentType.File;
	/**
	 * The unfurled media item, which uniquely only supports `attachment://<filename>` for its URL.
	 */
	file: UnfurledMediaItem;
	/** Whether the file should be a spoiler. Defaults to `false`. */
	spoiler?: boolean;
}

/**
 * Props for the Button component.
 * A Button is an interactive component used in messages.
 * Must be placed inside an Action Row or a Section's accessory field.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#button}
 */
export interface ButtonProps {
	/** Text that appears on the button, max 80 characters. Alternative to `label` prop. */
	children?: string;
	/** Text that appears on the button, max 80 characters. Alternative to `children` prop. */
	label?: string;
	/** The style of the button. */
	style: ButtonStyle;
	/** Developer-defined identifier for non-link/non-premium buttons, max 100 characters. */
	customId?: string;
	/** URL for link-style buttons. */
	url?: string;
	/** Identifier for a purchasable SKU for premium-style buttons. */
	skuId?: string;
	/** Partial emoji object to display on the button. */
	emoji?: EmojiObject;
	/** Whether the button is disabled. Defaults to `false`. */
	disabled?: boolean;
	/** Optional identifier for the component. */
	id?: number;
}
/**
 * Payload structure for a Button component.
 */
interface ButtonPayload extends BaseComponent, Partial<InteractiveComponent> {
	// `custom_id` is part of `InteractiveComponent` but optional here due to link/premium buttons
	type: ComponentType.Button;
	/** A button style. */
	style: ButtonStyle;
	/** Text that appears on the button, max 80 characters. */
	label?: string;
	/** Partial emoji object. */
	emoji?: EmojiObject;
	/** Developer-defined identifier for the button, max 100 characters. Required for non-link/non-premium styles. */
	custom_id?: string;
	/** Identifier for a purchasable SKU. Required for premium style. */
	sku_id?: string;
	/** URL for link-style buttons. Required for link style. */
	url?: string;
	/** Whether the button is disabled. Defaults to `false`. */
	disabled?: boolean;
}

/**
 * Props for an option in a StringSelect menu.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#string-select-menu-select-option-structure}
 */
export interface SelectOptionProps {
	/** User-facing name of the option, max 100 characters. */
	label: string;
	/** Developer-defined value of the option, max 100 characters. */
	value: string;
	/** Additional description of the option, max 100 characters. */
	description?: string;
	/** Partial emoji object to display with the option. */
	emoji?: EmojiObject;
	/** Whether this option is selected by default. */
	isDefault?: boolean;
	/** User-facing name of the option, max 100 characters. Alternative to `label` prop. */
	children?: string; // Alternative for label
}
/**
 * Payload structure for a select option in a String Select Menu.
 */
interface SelectOptionPayload {
	/** User-facing name of the option, max 100 characters. */
	label: string;
	/** Developer-defined value of the option, max 100 characters. */
	value: string;
	/** Additional description of the option, max 100 characters. */
	description?: string;
	/** Partial emoji object. */
	emoji?: EmojiObject;
	/** Will show this option as selected by default. */
	default?: boolean;
}

/**
 * Base props for all select menu components.
 */
interface BaseSelectProps {
	/** Developer-defined ID for the select menu, max 100 characters. */
	customId: string;
	/** Placeholder text if nothing is selected, max 150 characters. */
	placeholder?: string;
	/** Minimum number of items that must be chosen (0-25). Defaults to 1. */
	minValues?: number;
	/** Maximum number of items that can be chosen (1-25). Defaults to 1. */
	maxValues?: number;
	/** Whether the select menu is disabled. Defaults to `false`. */
	disabled?: boolean;
	/** Optional identifier for the component. */
	id?: number;
}

/**
 * Props for the StringSelect component.
 * Allows users to select from developer-defined text options.
 * Must be placed inside an Action Row.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#string-select-menu}
 */
export interface StringSelectProps extends BaseSelectProps {
	/** Array of SelectOptionProps elements, max 25 options. */
	children: React.ReactElement<SelectOptionProps> | React.ReactElement<SelectOptionProps>[];
}
/**
 * Payload structure for a String Select Menu component.
 */
interface StringSelectPayload extends InteractiveComponent {
	type: ComponentType.StringSelect;
	/** Specified choices in the select menu, max 25. */
	options: SelectOptionPayload[];
	/** Placeholder text if nothing is selected, max 150 characters. */
	placeholder?: string;
	/** Minimum number of items that must be chosen (0-25). Defaults to 1. */
	min_values?: number;
	/** Maximum number of items that can be chosen (1-25). Defaults to 1. */
	max_values?: number;
	/** Whether the select menu is disabled. Defaults to `false`. */
	disabled?: boolean;
}

/**
 * Structure for default values in auto-populated select menus (User, Role, Channel, Mentionable).
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-default-value-structure}
 */
interface SelectDefaultValue {
	/** ID of a user, role, or channel. */
	id: string; // Snowflake
	/** Type of value that `id` represents. */
	type: "user" | "role" | "channel";
}

/**
 * Base props for auto-populated select menus (User, Role, Mentionable, Channel).
 */
export interface AutoPopulatedSelectProps extends BaseSelectProps {
	/** List of default values. Number of values must be between `minValues` and `maxValues`. */
	defaultValues?: SelectDefaultValue[];
}

/**
 * Props for the UserSelect component.
 * Allows users to select one or more users.
 * Must be placed inside an Action Row.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#user-select-menu}
 */
export interface UserSelectProps extends AutoPopulatedSelectProps {}
/**
 * Payload structure for a User Select Menu component.
 */
interface UserSelectPayload extends InteractiveComponent {
	type: ComponentType.UserSelect;
	/** Placeholder text if nothing is selected, max 150 characters. */
	placeholder?: string;
	/** List of default user IDs. */
	default_values?: SelectDefaultValue[];
	/** Minimum number of users that must be chosen (0-25). Defaults to 1. */
	min_values?: number;
	/** Maximum number of users that can be chosen (1-25). Defaults to 1. */
	max_values?: number;
	/** Whether the select menu is disabled. Defaults to `false`. */
	disabled?: boolean;
}

/**
 * Props for the RoleSelect component.
 * Allows users to select one or more roles.
 * Must be placed inside an Action Row.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#role-select-menu}
 */
export interface RoleSelectProps extends AutoPopulatedSelectProps {}
/**
 * Payload structure for a Role Select Menu component.
 */
interface RoleSelectPayload extends InteractiveComponent {
	type: ComponentType.RoleSelect;
	/** Placeholder text if nothing is selected, max 150 characters. */
	placeholder?: string;
	/** List of default role IDs. */
	default_values?: SelectDefaultValue[];
	/** Minimum number of roles that must be chosen (0-25). Defaults to 1. */
	min_values?: number;
	/** Maximum number of roles that can be chosen (1-25). Defaults to 1. */
	max_values?: number;
	/** Whether the select menu is disabled. Defaults to `false`. */
	disabled?: boolean;
}

/**
 * Props for the MentionableSelect component.
 * Allows users to select one or more mentionables (users and roles).
 * Must be placed inside an Action Row.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#mentionable-select-menu}
 */
export interface MentionableSelectProps extends AutoPopulatedSelectProps {}
/**
 * Payload structure for a Mentionable Select Menu component.
 */
interface MentionableSelectPayload extends InteractiveComponent {
	type: ComponentType.MentionableSelect;
	/** Placeholder text if nothing is selected, max 150 characters. */
	placeholder?: string;
	/** List of default user/role IDs. */
	default_values?: SelectDefaultValue[];
	/** Minimum number of items that must be chosen (0-25). Defaults to 1. */
	min_values?: number;
	/** Maximum number of items that can be chosen (1-25). Defaults to 1. */
	max_values?: number;
	/** Whether the select menu is disabled. Defaults to `false`. */
	disabled?: boolean;
}

/**
 * Props for the ChannelSelect component.
 * Allows users to select one or more channels.
 * Must be placed inside an Action Row.
 * @see {@link https://discord.com/developers/docs/interactions/message-components#channel-select-menu}
 */
export interface ChannelSelectProps extends AutoPopulatedSelectProps {
	/** List of channel types to include in the select menu. */
	channelTypes?: number[]; // Array of channel type integers
}
/**
 * Payload structure for a Channel Select Menu component.
 */
interface ChannelSelectPayload extends InteractiveComponent {
	type: ComponentType.ChannelSelect;
	/** List of channel types to include. */
	channel_types?: number[];
	/** Placeholder text if nothing is selected, max 150 characters. */
	placeholder?: string;
	/** List of default channel IDs. */
	default_values?: SelectDefaultValue[];
	/** Minimum number of channels that must be chosen (0-25). Defaults to 1. */
	min_values?: number;
	/** Maximum number of channels that can be chosen (1-25). Defaults to 1. */
	max_values?: number;
	/** Whether the select menu is disabled. Defaults to `false`. */
	disabled?: boolean;
}

// Embed related structures (common for Discord messages)
// These are not fully detailed in the provided "Component Reference" for V2 components,
// but are relevant for legacy messages and general Discord message structure.

/** Props for the author section of an embed. */
export interface EmbedAuthorProps {
	/** Name of the author. */
	name: string;
	/** URL of the author. */
	url?: string;
	/** URL of the author icon. */
	iconUrl?: string;
}
/** Payload for the author section of an embed. */
interface EmbedAuthorPayload {
	name: string;
	url?: string;
	icon_url?: string;
}

/** Props for the footer section of an embed. */
export interface EmbedFooterProps {
	/** Text content of the footer. Alternative to `text` prop. */
	children?: string;
	/** URL of the footer icon. */
	iconUrl?: string;
	/** Text content of the footer. Alternative to `children` prop. */
	text?: string;
}
/** Payload for the footer section of an embed. */
interface EmbedFooterPayload {
	text: string;
	icon_url?: string;
}

/** Props for the image section of an embed. */
export interface EmbedImageProps {
	/** URL of the image. */
	url: string;
}
/** Payload for the image section of an embed. */
interface EmbedImagePayload {
	url: string;
}

/** Props for the thumbnail section of an embed. */
export interface EmbedThumbnailProps {
	/** URL of the thumbnail. */
	url: string;
}
/** Payload for the thumbnail section of an embed. */
interface EmbedThumbnailPayload {
	url: string;
}

/** Props for the title of an embed field. */
export interface EmbedFieldTitleProps {
	/** Content for the field title. */
	children: React.ReactNode;
}
/** Props for the value of an embed field. */
export interface EmbedFieldValueProps {
	/** Content for the field value. */
	children: React.ReactNode;
}

/** Props for a field in an embed. */
export interface EmbedFieldProps {
	/** Title of the field. */
	title?: string; // Maps to 'name' in payload
	/** Value of the field. */
	value?: string; // Maps to 'value' in payload
	/** Whether the field should be displayed inline. */
	inline?: boolean;
	/**
	 * Children can be used to structure title and value,
	 * e.g., <EmbedFieldTitle>Title</EmbedFieldTitle><EmbedFieldValue>Value</EmbedFieldValue>.
	 * Alternatively, `title` and `value` props can be used directly.
	 */
	children?: React.ReactNode;
}
/** Payload for a field in an embed. */
interface EmbedFieldPayload {
	/** Name of the field (max 256 characters). */
	name: string;
	/** Value of the field (max 1024 characters). */
	value: string;
	/** Whether this field should display inline. */
	inline?: boolean;
}

/** Props for a collection of embed fields. */
export interface EmbedFieldsProps {
	/** One or more EmbedFieldProps elements. */
	children: React.ReactElement<EmbedFieldProps> | React.ReactElement<EmbedFieldProps>[];
}

/** Props for the description of an embed. */
export interface EmbedDescriptionProps {
	/** Content for the embed description. */
	children: React.ReactNode;
}
/** Props for the title of an embed. */
export interface EmbedTitleProps {
	/** Content for the embed title. */
	children: React.ReactNode;
}

/**
 * Props for an embed object.
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object}
 */
export interface EmbedProps {
	/** Title of the embed. */
	title?: string;
	/** Description of the embed. */
	description?: string;
	/** URL of the embed. */
	url?: string;
	/** Timestamp of the embed content (ISO8601 format or Date object). */
	timestamp?: string | Date;
	/** Color code of the embed. Can be an integer or a hex string. */
	color?: number | string;
	/**
	 * Children can include EmbedAuthor, EmbedFooter, EmbedImage, EmbedThumbnail, EmbedFields,
	 * EmbedTitle, EmbedDescription to structure the embed.
	 */
	children?: React.ReactNode;
}
/** Payload structure for an embed object. */
interface EmbedPayload {
	/** Title of embed (max 256 characters). */
	title?: string;
	/** Description of embed (max 4096 characters). */
	description?: string;
	/** URL of embed. */
	url?: string;
	/** Timestamp of embed content (ISO8601 string). */
	timestamp?: string;
	/** Color code of the embed. */
	color?: number;
	/** Footer information. */
	footer?: EmbedFooterPayload;
	/** Image information. */
	image?: EmbedImagePayload;
	/** Thumbnail information. */
	thumbnail?: EmbedThumbnailPayload;
	/** Author information. */
	author?: EmbedAuthorPayload;
	/** Fields information (max 25 fields). */
	fields?: EmbedFieldPayload[];
}

/**
 * Props for the main text content of a legacy message.
 */
export interface ContentProps {
	/** The text content. */
	children: React.ReactNode; // Will be stringified
}

/**
 * Props for a message.
 */
export interface MessageProps {
	/**
	 * If true, enables the V2 components system.
	 * This changes how `content` and `embeds` work and allows new component types.
	 * If true, the `flags` field will include `1 << 15`.
	 * @see {@link https://discord.com/developers/docs/interactions/message-components#customizing-messages-message-flags}
	 */
	isV2?: boolean;
	/**
	 * Child components.
	 * For V2: Can be TextDisplay, Section, Container, MediaGallery, File, Separator, ActionRow.
	 * For Legacy: Can be Content, Embed, ActionRow.
	 */
	children: React.ReactNode;
	/** Override the default username of the webhook/bot. */
	username?: string;
	/** Override the default avatar of the webhook/bot. */
	avatarUrl?: string;
	/** Whether this is a TTS message. */
	tts?: boolean;
	/** Message flags combined as a bitfield. `1 << 15` is automatically added if `isV2` is true. */
	flags?: number;
}

/** Base payload for a message. */
interface BaseMessagePayload {
	username?: string;
	avatar_url?: string;
	tts?: boolean;
}

/**
 * Payload for a legacy message (when `IS_COMPONENTS_V2` flag is not set).
 * @see {@link https://discord.com/developers/docs/interactions/message-components#legacy-message-component-behavior}
 */
interface LegacyMessagePayload extends BaseMessagePayload {
	/** The message contents (up to 2000 characters). */
	content?: string;
	/** Array of up to 10 embed objects. */
	embeds?: EmbedPayload[];
	/** Array of up to 5 Action Row components. */
	components?: ActionRowPayload[];
	/** Message flags. */
	flags?: number;
}

/**
 * Payload for a V2 message (when `IS_COMPONENTS_V2` flag is set).
 * `content` and `embeds` fields will not work. Use TextDisplay and Container instead.
 * Attachments must be exposed through components.
 * `poll` and `stickers` fields are disabled.
 * Allows up to 40 total components.
 */
interface V2MessagePayload extends BaseMessagePayload {
	/** Array of components. Max 40 total components. */
	components: AnyComponentPayload[]; // Union of all V2 component payloads
	/** Message flags. Must include `1 << 15` (IS_COMPONENTS_V2). */
	flags?: number;
}

type AnyComponentPayload =
	| ActionRowPayload
	| ButtonPayload
	| StringSelectPayload
	| UserSelectPayload
	| RoleSelectPayload
	| MentionableSelectPayload
	| ChannelSelectPayload
	| SectionPayload
	| TextDisplayPayload
	| ThumbnailPayload
	| MediaGalleryPayload
	| FilePayload
	| SeparatorPayload
	| ContainerPayload;

export type {
	EmojiObject,
	UnfurledMediaItem,
	BaseComponent,
	EmbedPayload,
	BaseMessagePayload,
	LegacyMessagePayload,
	V2MessagePayload,
	AnyComponentPayload,
	ActionRowPayload,
	ButtonPayload,
	StringSelectPayload,
	UserSelectPayload,
	RoleSelectPayload,
	MentionableSelectPayload,
	ChannelSelectPayload,
	SectionPayload,
	TextDisplayPayload,
	ThumbnailPayload,
	MediaGalleryPayload,
	FilePayload,
	SeparatorPayload,
	ContainerPayload,
	SelectOptionPayload,
	BaseSelectProps,
	MediaGalleryItemPayload,
};
