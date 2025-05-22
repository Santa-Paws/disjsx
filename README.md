# D.JSX (Discord JSX)

blah blah write Discord messages in JSX blah blah (I suck at writing ReadMe's)

## Usage

## `<Message>`

Represents a Discord message, which can contain text, embeds, and components. Supports both legacy and V2 component systems via the `isV2` prop.

- **Props (`MessageProps`):**
  - `isV2?: boolean`: If true, enables the V2 components system. This changes how `content` and `embeds` work and allows new component types. If true, the `flags` field will include `1 << 15`.
  - `children: React.ReactNode`:
    - For V2: Can be TextDisplay, Section, Container, MediaGallery, File, Separator, ActionRow.
    - For Legacy: Can be Content, Embed, ActionRow.
  - `username?: string`: Override the default username of the webhook/bot.
  - `avatarUrl?: string`: Override the default avatar of the webhook/bot.
  - `tts?: boolean`: Whether this is a TTS message.
  - `flags?: number`: Message flags combined as a bitfield. `1 << 15` is automatically added if `isV2` is true.

## `<Content>`

Represents the main text content of a legacy Discord message. Used when `MessageProps.isV2` is `false` or not set.

- **Props (`ContentProps`):**
  - `children: React.ReactNode`: The text content (will be stringified).

## `<Embed>`

Represents an embed object within a Discord message. Embeds are rich content blocks that can include titles, descriptions, images, and more.

- **Props (`EmbedProps`):**
  - `title?: string`: Title of the embed.
  - `description?: string`: Description of the embed.
  - `url?: string`: URL of the embed.
  - `timestamp?: string | Date`: Timestamp of the embed content (ISO8601 format or Date object).
  - `color?: number | string`: Color code of the embed. Can be an integer or a hex string (e.g., `Colors.Blurple` or `0x5865F2` or `'#5865F2'`).
  - `children?: React.ReactNode`: Can include `EmbedAuthor`, `EmbedFooter`, `EmbedImage`, `EmbedThumbnail`, `EmbedFields`, `EmbedTitle`, `EmbedDescription` to structure the embed.

## `<EmbedAuthor>`

Represents the author section of an embed. Typically includes the author's name, URL, and icon.

- **Props (`EmbedAuthorProps`):**
  - `name: string`: Name of the author.
  - `url?: string`: URL of the author.
  - `iconUrl?: string`: URL of the author icon.

## `<EmbedTitle>`

Represents the title of an embed.

- **Props (`EmbedTitleProps`):**
  - `children: React.ReactNode`: Content for the embed title.

## `<EmbedDescription>`

Represents the description text of an embed.

- **Props (`EmbedDescriptionProps`):**
  - `children: React.ReactNode`: Content for the embed description.

## `<EmbedFields>`

Represents a container for multiple fields within an embed.

- **Props (`EmbedFieldsProps`):**
  - `children: React.ReactElement<EmbedFieldProps> | React.ReactElement<EmbedFieldProps>[]`: One or more `EmbedField` elements.

## `<EmbedField>`

Represents a single field within an embed, consisting of a name (title) and a value. Fields can be displayed inline.

- **Props (`EmbedFieldProps`):**
  - `title?: string`: Title of the field (maps to 'name' in payload).
  - `value?: string`: Value of the field (maps to 'value' in payload).
  - `inline?: boolean`: Whether the field should be displayed inline.
  - `children?: React.ReactNode`: Can be used to structure title and value, e.g., `<EmbedFieldTitle>Title</EmbedFieldTitle><EmbedFieldValue>Value</EmbedFieldValue>`. Alternatively, `title` and `value` props can be used directly.

## `<EmbedFieldTitle>`

Represents the title (name) part of an embed field.

- **Props (`EmbedFieldTitleProps`):**
  - `children: React.ReactNode`: Content for the field title.

## `<EmbedFieldValue>`

Represents the value part of an embed field.

- **Props (`EmbedFieldValueProps`):**
  - `children: React.ReactNode`: Content for the field value.

## `<EmbedFooter>`

Represents the footer section of an embed. Typically includes text and an icon.

- **Props (`EmbedFooterProps`):**
  - `children?: string`: Text content of the footer. Alternative to `text` prop.
  - `iconUrl?: string`: URL of the footer icon.
  - `text?: string`: Text content of the footer. Alternative to `children` prop.

## `<EmbedImage>`

Represents the main image of an embed.

- **Props (`EmbedImageProps`):**
  - `url: string`: URL of the image.

## `<EmbedThumbnail>`

Represents the thumbnail image of an embed, displayed in the top-right corner.

- **Props (`EmbedThumbnailProps`):**
  - `url: string`: URL of the thumbnail.

## `<ActionRow>`

Represents an Action Row, a container for interactive components like buttons or select menus. An Action Row can hold up to 5 buttons, or a single select menu, or a single text input (in modals).

- **Props (`ActionRowProps`):**
  - `children: React.ReactNode`: Child components. Can contain:
    - Up to 5 contextually grouped Buttons.
    - A single Text Input (for modals).
    - A single Select Menu (String, User, Role, Mentionable, or Channel).
  - `id?: number`: Optional identifier for the component.

## `<Button>`

Represents an interactive button component. Buttons can trigger interactions or link to URLs. Must be placed within an Action Row or as a Section accessory.

- **Props (`ButtonProps`):**
  - `children?: string`: Text that appears on the button, max 80 characters. Alternative to `label` prop.
  - `label?: string`: Text that appears on the button, max 80 characters. Alternative to `children` prop.
  - `style: ButtonStyle`: The style of the button (e.g., `ButtonStyle.Primary`).
  - `customId?: string`: Developer-defined identifier for non-link/non-premium buttons, max 100 characters.
  - `url?: string`: URL for link-style buttons.
  - `skuId?: string`: Identifier for a purchasable SKU for premium-style buttons.
  - `emoji?: EmojiObject`: Partial emoji object (`{ id?: string, name?: string, animated?: boolean }`) to display on the button.
  - `disabled?: boolean`: Whether the button is disabled. Defaults to `false`.
  - `id?: number`: Optional identifier for the component.

## `<StringSelect>`

Represents a String Select Menu, allowing users to choose from a list of predefined text options. Must be placed within an Action Row.

- **Props (`StringSelectProps` extends `BaseSelectProps`):**
  - `customId: string`: Developer-defined ID for the select menu, max 100 characters.
  - `placeholder?: string`: Placeholder text if nothing is selected, max 150 characters.
  - `minValues?: number`: Minimum number of items that must be chosen (0-25). Defaults to 1.
  - `maxValues?: number`: Maximum number of items that can be chosen (1-25). Defaults to 1.
  - `disabled?: boolean`: Whether the select menu is disabled. Defaults to `false`.
  - `id?: number`: Optional identifier for the component.
  - `children: React.ReactElement<SelectOptionProps> | React.ReactElement<SelectOptionProps>[]`: Array of `SelectOption` elements, max 25 options.

## `<SelectOption>`

Represents an option within a String Select Menu. Each option has a user-facing label and a developer-defined value.

- **Props (`SelectOptionProps`):**
  - `label: string`: User-facing name of the option, max 100 characters.
  - `value: string`: Developer-defined value of the option, max 100 characters.
  - `description?: string`: Additional description of the option, max 100 characters.
  - `emoji?: EmojiObject`: Partial emoji object (`{ id?: string, name?: string, animated?: boolean }`) to display with the option.
  - `isDefault?: boolean`: Whether this option is selected by default.
  - `children?: string`: User-facing name of the option, max 100 characters. Alternative to `label` prop.

## `<UserSelect>`

Represents a User Select Menu, allowing users to select one or more users from the server. Must be placed within an Action Row.

- **Props (`UserSelectProps` extends `AutoPopulatedSelectProps`):**
  - `customId: string`: Developer-defined ID for the select menu, max 100 characters.
  - `placeholder?: string`: Placeholder text if nothing is selected, max 150 characters.
  - `minValues?: number`: Minimum number of items that must be chosen (0-25). Defaults to 1.
  - `maxValues?: number`: Maximum number of items that can be chosen (1-25). Defaults to 1.
  - `disabled?: boolean`: Whether the select menu is disabled. Defaults to `false`.
  - `id?: number`: Optional identifier for the component.
  - `defaultValues?: SelectDefaultValue[]`: List of default values (`{ id: string, type: "user" }`). Number of values must be between `minValues` and `maxValues`.

## `<RoleSelect>`

Represents a Role Select Menu, allowing users to select one or more roles from the server. Must be placed within an Action Row.

- **Props (`RoleSelectProps` extends `AutoPopulatedSelectProps`):**
  - `customId: string`: Developer-defined ID for the select menu, max 100 characters.
  - `placeholder?: string`: Placeholder text if nothing is selected, max 150 characters.
  - `minValues?: number`: Minimum number of items that must be chosen (0-25). Defaults to 1.
  - `maxValues?: number`: Maximum number of items that can be chosen (1-25). Defaults to 1.
  - `disabled?: boolean`: Whether the select menu is disabled. Defaults to `false`.
  - `id?: number`: Optional identifier for the component.
  - `defaultValues?: SelectDefaultValue[]`: List of default values (`{ id: string, type: "role" }`).

## `<MentionableSelect>`

Represents a Mentionable Select Menu, allowing users to select users or roles from the server. Must be placed within an Action Row.

- **Props (`MentionableSelectProps` extends `AutoPopulatedSelectProps`):**
  - `customId: string`: Developer-defined ID for the select menu, max 100 characters.
  - `placeholder?: string`: Placeholder text if nothing is selected, max 150 characters.
  - `minValues?: number`: Minimum number of items that must be chosen (0-25). Defaults to 1.
  - `maxValues?: number`: Maximum number of items that can be chosen (1-25). Defaults to 1.
  - `disabled?: boolean`: Whether the select menu is disabled. Defaults to `false`.
  - `id?: number`: Optional identifier for the component.
  - `defaultValues?: SelectDefaultValue[]`: List of default values (`{ id: string, type: "user" | "role" }`).

## `<ChannelSelect>`

Represents a Channel Select Menu, allowing users to select one or more channels from the server. Can be filtered by channel types. Must be placed within an Action Row.

- **Props (`ChannelSelectProps` extends `AutoPopulatedSelectProps`):**
  - `customId: string`: Developer-defined ID for the select menu, max 100 characters.
  - `placeholder?: string`: Placeholder text if nothing is selected, max 150 characters.
  - `minValues?: number`: Minimum number of items that must be chosen (0-25). Defaults to 1.
  - `maxValues?: number`: Maximum number of items that can be chosen (1-25). Defaults to 1.
  - `disabled?: boolean`: Whether the select menu is disabled. Defaults to `false`.
  - `id?: number`: Optional identifier for the component.
  - `defaultValues?: SelectDefaultValue[]`: List of default values (`{ id: string, type: "channel" }`).
  - `channelTypes?: number[]`: List of channel type integers to include in the select menu.

## `<Section>` (V2 Component)

Represents a Section component, a layout element for V2 messages. Sections display text alongside an optional accessory (like a Thumbnail or Button). Requires the `IS_COMPONENTS_V2` message flag.

- **Props (`SectionProps`):**
  - `children: React.ReactNode`: Child components. Typically processed into 1 to 3 `TextDisplay` components and one optional accessory (`Thumbnail` or `Button`).
  - `id?: number`: Optional identifier for the component.

## `<TextDisplay>` (V2 Component)

Represents a Text Display component for V2 messages. Used to display markdown-formatted text, similar to message content but as a distinct component. Requires the `IS_COMPONENTS_V2` message flag.

- **Props (`TextDisplayProps`):**
  - `children: React.ReactNode`: The markdown content to be displayed (will be stringified to form the 'content' field).
  - `id?: number`: Optional identifier for the component.

## `<Thumbnail>` (V2 Component)

Represents a Thumbnail component for V2 messages. A small image typically used as an accessory within a Section. Requires the `IS_COMPONENTS_V2` message flag.

- **Props (`ThumbnailProps`):**
  - `url: string`: URL of the media. Supports arbitrary URLs (http/https) or `attachment://<filename>` references.
  - `description?: string`: Alt text for the media, max 1024 characters.
  - `spoiler?: boolean`: Whether the thumbnail should be a spoiler. Defaults to `false`.
  - `id?: number`: Optional identifier for the component.

## `<MediaGallery>` (V2 Component)

Represents a Media Gallery component for V2 messages. Displays 1-10 media items (images/videos) in an organized gallery format. Requires the `IS_COMPONENTS_V2` message flag.

- **Props (`MediaGalleryProps`):**
  - `children: React.ReactElement<MediaGalleryItemProps> | React.ReactElement<MediaGalleryItemProps>[]`: One to ten `MediaGalleryItem` elements.
  - `id?: number`: Optional identifier for the component.

## `<MediaGalleryItem>` (V2 Component)

Represents a single item within a Media Gallery. Contains the media URL and optional description.

- **Props (`MediaGalleryItemProps`):**
  - `url: string`: URL of the media. Supports arbitrary URLs (http/https) or `attachment://<filename>` references.
  - `description?: string`: Alt text for the media, max 1024 characters.
  - `spoiler?: boolean`: Whether the media should be a spoiler. Defaults to `false`.

## `<File>` (V2 Component)

Represents a File component for V2 messages. Displays an uploaded file as an attachment, referenced by `attachment://filename`. Requires the `IS_COMPONENTS_V2` message flag.

- **Props (`FileProps`):**
  - `url: string`: URL of the file, must be an attachment reference using `attachment://<filename>` syntax.
  - `spoiler?: boolean`: Whether the file should be a spoiler. Defaults to `false`.
  - `id?: number`: Optional identifier for the component.

## `<Separator>` (V2 Component)

Represents a Separator component for V2 messages. Adds vertical padding and an optional visual divider between other components. Requires the `IS_COMPONENTS_V2` message flag.

- **Props (`SeparatorProps`):**
  - `divider?: boolean`: Whether a visual divider should be displayed. Defaults to `true`.
  - `spacing?: 1 | 2`: Size of separator padding: `1` for small, `2` for large. Defaults to `1`.
  - `id?: number`: Optional identifier for the component.

## `<Container>` (V2 Component)

Represents a Container component for V2 messages. Visually groups a set of components, with an optional customizable color bar. Requires the `IS_COMPONENTS_V2` message flag.

- **Props (`ContainerProps`):**
  - `children: React.ReactNode`: Child components. Can be Action Rows, Text Displays, Sections, Media Galleries, Separators, or Files.
  - `accentColor?: number | string`: Optional color for the accent on the container (RGB integer from `0x000000` to `0xFFFFFF`, or a hex string).
  - `spoiler?: boolean`: Whether the container should be a spoiler (blurred out). Defaults to `false`.
  - `id?: number`: Optional identifier for the component.

---

**Note on Enums:**

- `Colors`: Provides predefined color values (e.g., `Colors.Blurple`, `Colors.Red`).
- `ButtonStyle`: Defines styles for buttons (e.g., `ButtonStyle.Primary`, `ButtonStyle.Link`).
- `MessageFlags`: For advanced message control (e.g., `MessageFlags.Ephemeral`). `IsComponentsV2` (`1 << 15`) is automatically handled by `Message isV2={true}`.
- `ChannelTypes`: Provides predefined channel types (e.g., `ChannelTypes.GuildText`, `ChannelTypes.GuildAnnouncement`).
