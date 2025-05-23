# DisJSX (Discord JSX)

DisJSX is a library for declaratively creating Discord message payloads using JSX. It supports both legacy message formats and Discord's V2 component system. With DisJSX, you can define your message structure in a familiar, React-like syntax, and `renderDiscordMessage` will transform it into the JSON object Discord expects.

**Note:** This library is for generating Discord message JSON payloads. It does NOT render messages in a browser or provide React components for direct use in a web UI.

## What is DisJSX?

DisJSX bridges the gap between the ease of JSX and the structure of Discord messages. Instead of manually crafting complex JSON objects, you can use intuitive components like `<Message>`, `<Embed>`, `<Button>`, and `<Section>` to build your messages.

**Key Benefits:**

*   **Developer Experience:** Write message structures in a more readable and maintainable way using JSX.
*   **Type Safety (with TypeScript):** Leverage TypeScript for better autocompletion and error checking when defining message props.
*   **Support for All Features:** Covers legacy content/embeds and the full V2 component system, including layouts, interactive elements, and rich media.
*   **Simplified JSON Generation:** The `renderDiscordMessage` function handles the conversion to the correct Discord JSON payload.

## Core Concepts

### JSX for Discord Payloads

You define the structure of your Discord message using JSX tags that correspond to Discord's message elements. For example, an embed is created with `<Embed>`, and its title with `<EmbedTitle>`.

### `renderDiscordMessage`

This is the core function that takes your DisJSX component tree and converts it into the final JSON object that can be sent to the Discord API.

### Legacy vs. V2 Messages

Discord has two primary ways of handling message components:

*   **Legacy Messages:** Primarily use `content` and `embeds`. Action Rows with buttons or select menus can be added.
*   **V2 Messages:** Enabled by passing the `isV2={true}` prop to the `<Message>` component. This activates Discord's newer component system (internally setting the `1 << 15` or `IS_COMPONENTS_V2` message flag).
    *   **Important:** When `isV2={true}`:
        *   The `content` and `embeds` fields (and their DisJSX counterparts `<Content>` and `<Embed>`) will no longer work directly under `<Message>`.
        *   Use `<TextDisplay>` for text content and `<Container>` (which can mimic embeds) or other V2 layout components.
        *   Attachments won't show by default; they must be exposed through components like `<File>` or `<MediaGalleryItem>`.
        *   The `poll` and `stickers` fields are disabled.
        *   Messages allow up to 40 total components.

## Installation

```bash
npm install disjsx
```

## Examples

### Legacy Messages

#### Simple Text Message

```tsx
import { Message, Content, renderDiscordMessage } from "disjsx";

const message = (
	<Message>
		<Content>Hello world!</Content>
	</Message>
);

console.log(renderDiscordMessage(message));
// Output: { content: "Hello world!" }
```

#### Rich Embed Message

```tsx
import {
	Message,
	Embed,
	EmbedTitle,
	EmbedDescription,
	EmbedAuthor,
	EmbedField,
	EmbedFields,
	EmbedFieldTitle,
	EmbedFieldValue,
	EmbedFooter,
	EmbedImage,
	EmbedThumbnail,
	Colors,
	renderDiscordMessage,
} from "disjsx";

const message = (
	<Message>
		<Embed color={Colors.Purple} timestamp={new Date()} url="https://discord.com">
			<EmbedAuthor name="John Doe" iconUrl="https://cdn.discordapp.com/embed/avatars/0.png" url="https://github.com" />
			<EmbedTitle>This is an Embed Title!</EmbedTitle>
			<EmbedDescription>
				This is a rich embed description. It can contain **markdown** and links like [this one](https://discord.com).
			</EmbedDescription>
			<EmbedThumbnail url="https://cdn.discordapp.com/embed/avatars/1.png" />
			<EmbedFields>
				<EmbedField title="Field 1 (Inline)" value="Value 1" inline />
				<EmbedField title="Field 2 (Inline)" value="Value 2" inline />
				<EmbedField title="Field 3 (Not Inline)" value="Value 3" />
				<EmbedField inline>
					<EmbedFieldTitle>Field 4 Title (Child)</EmbedFieldTitle>
					<EmbedFieldValue>Field 4 Value (Child)</EmbedFieldValue>
				</EmbedField>
			</EmbedFields>
			<EmbedImage url="https://placehold.co/1024/45BFEA/FFFFFF.png?text=Cats%20Are%20Cool" />
			<EmbedFooter text="This is the footer text" iconUrl="https://cdn.discordapp.com/embed/avatars/2.png" />
		</Embed>
		<Embed title="Minimal Embed" description="Just title and description." color={0x00ff00} />
	</Message>
);

console.log(renderDiscordMessage(message));
// Output: { embeds: [{...}, {...}] }
```

### V2 Messages

```tsx
import { Message, Section, TextDisplay, renderDiscordMessage } from "disjsx";

const message = (
	<Message isV2>
		<Section>
			<TextDisplay>Hello world from a V2 message!</TextDisplay>
		</Section>
	</Message>
);

console.log(renderDiscordMessage(message));
// Output: { components: [{ type: 9, ... }], flags: 32768 }
```

## Component Reference

This section details the DisJSX components and how they map to Discord's message structures.

---

### `<Message>`

Represents a Discord message, the top-level container for all content. Supports both legacy and V2 component systems via the `isV2` prop.

-   **Props (`MessageProps`):**
    -   `isV2?: boolean`: If `true`, enables the V2 components system. This changes how content and embeds are handled (they are disabled in favor of V2 components like `<TextDisplay>` and `<Container>`) and allows new V2 component types. The `flags` field in the output JSON will include `32768` (Discord's `1 << 15` flag for `IS_COMPONENTS_V2`).
    -   `children: React.ReactNode`:
        -   **For V2 (`isV2={true}`):** Can be `<Section>`, `<Container>`, `<MediaGallery>`, `<File>`, `<Separator>`, `<ActionRow>`, `<TextDisplay>`.
        -   **For Legacy (`isV2={false}` or omitted):** Can be `<Content>`, `<Embed>`, `<ActionRow>`.
    -   `username?: string`: Overrides the default username of the webhook/bot.
    -   `avatarUrl?: string`: Overrides the default avatar of the webhook/bot.
    -   `tts?: boolean`: Whether this is a text-to-speech message.
    -   `flags?: number`: Additional message flags combined as a bitfield. `32768` is automatically added if `isV2` is true.

---

### `<Content>` (Legacy)

Represents the main text content of a legacy Discord message.
*Only used when `MessageProps.isV2` is `false` or not set.*

-   **Props (`ContentProps`):**
    -   `children: React.ReactNode`: The text content (will be stringified). Markdown is supported.

---

### `<Embed>` (Legacy)

Represents an embed object within a legacy Discord message. Embeds are rich content blocks that can include titles, descriptions, images, fields, and more.
*Only used when `MessageProps.isV2` is `false` or not set. For V2 messages, use `<Container>` to achieve similar visual grouping, or structure content with `<Section>` and `<TextDisplay>`.*

-   **Props (`EmbedProps`):**
    -   `title?: string`: Title of the embed.
    -   `description?: string`: Description of the embed. Supports markdown.
    -   `url?: string`: URL of the embed title (makes the title a hyperlink).
    -   `timestamp?: string | Date`: Timestamp of the embed content (ISO8601 format or Date object).
    -   `color?: number | string`: Color code of the embed's left border. Can be an integer (e.g., `Colors.Blurple`, `0x5865F2`) or a hex string (e.g., `'#5865F2'`).
    -   `children?: React.ReactNode`: Can include `<EmbedAuthor>`, `<EmbedFooter>`, `<EmbedImage>`, `<EmbedThumbnail>`, `<EmbedFields>`, `<EmbedTitle>`, `<EmbedDescription>` to structure the embed.

---

### `<EmbedAuthor>` (Legacy)

Represents the author section of an embed.

-   **Props (`EmbedAuthorProps`):**
    -   `name: string`: Name of the author.
    -   `url?: string`: URL to link the author's name to.
    -   `iconUrl?: string`: URL of the author icon (a small image next to the author's name).

---

### `<EmbedTitle>` (Legacy)

Represents the title of an embed. Can also be set directly via the `title` prop on `<Embed>`.

-   **Props (`EmbedTitleProps`):**
    -   `children: React.ReactNode`: Content for the embed title.

---

### `<EmbedDescription>` (Legacy)

Represents the main description text of an embed. Can also be set directly via the `description` prop on `<Embed>`. Supports markdown.

-   **Props (`EmbedDescriptionProps`):**
    -   `children: React.ReactNode`: Content for the embed description.

---

### `<EmbedFields>` (Legacy)

A container for multiple `<EmbedField>` components within an embed.

-   **Props (`EmbedFieldsProps`):**
    -   `children: React.ReactElement<EmbedFieldProps> | React.ReactElement<EmbedFieldProps>[]`: One or more `<EmbedField>` elements.

---

### `<EmbedField>` (Legacy)

Represents a single field within an embed, consisting of a name (title) and a value. Fields can be displayed inline.

-   **Props (`EmbedFieldProps`):**
    -   `title?: string`: Title of the field (maps to Discord's `name` field in the payload).
    -   `value?: string`: Value of the field (maps to Discord's `value` field in the payload). Supports markdown.
    -   `inline?: boolean`: Whether the field should be displayed inline with other inline fields.
    -   `children?: React.ReactNode`: Can be used to structure title and value using `<EmbedFieldTitle>` and `<EmbedFieldValue>`. Alternatively, `title` and `value` props can be used directly.

---

### `<EmbedFieldTitle>` (Legacy)

Represents the title (name) part of an embed field.

-   **Props (`EmbedFieldTitleProps`):**
    -   `children: React.ReactNode`: Content for the field title.

---

### `<EmbedFieldValue>` (Legacy)

Represents the value part of an embed field.

-   **Props (`EmbedFieldValueProps`):**
    -   `children: React.ReactNode`: Content for the field value. Supports markdown.

---

### `<EmbedFooter>` (Legacy)

Represents the footer section of an embed.

-   **Props (`EmbedFooterProps`):**
    -   `text?: string`: Text content of the footer. Alternative to `children`.
    -   `children?: string`: Text content of the footer. Alternative to `text`.
    -   `iconUrl?: string`: URL of the footer icon (a small image next to the footer text).

---

### `<EmbedImage>` (Legacy)

Represents the main large image of an embed.

-   **Props (`EmbedImageProps`):**
    -   `url: string`: URL of the image.

---

### `<EmbedThumbnail>` (Legacy)

Represents the thumbnail image of an embed, displayed in the top-right corner.

-   **Props (`EmbedThumbnailProps`):**
    -   `url: string`: URL of the thumbnail.

---

### `<ActionRow>` (Layout Component - Legacy & V2)

A top-level layout component that acts as a container for interactive components.
*In V2 messages, an Action Row can also be a child of a `<Container>`.*

-   **Discord Rules:**
    -   Can contain up to 5 `<Button>` components.
    -   OR a single Select Menu component (`<StringSelect>`, `<UserSelect>`, `<RoleSelect>`, `<MentionableSelect>`, `<ChannelSelect>`).
    -   OR a single `<TextInput>` (only within Modals, not directly in messages).
    -   An Action Row cannot mix buttons and select menus.
-   **Props (`ActionRowProps`):**
    -   `children: React.ReactNode`: Child components (Buttons, Select Menus, or Text Input for modals).
    -   `id?: number`: Optional identifier for the component. If not provided, Discord may assign one.

---

### `<Button>` (Interactive Component - Legacy & V2)

Represents an interactive button. Buttons can trigger interactions (sending data back to your bot) or link to URLs.
*Must be placed within an `<ActionRow>` or as a `<Section>` accessory (V2 only).*

-   **Props (`ButtonProps`):**
    -   `label?: string`: Text that appears on the button (max 80 characters). Alternative to `children`.
    -   `children?: string`: Text that appears on the button (max 80 characters). Alternative to `label`.
    -   `style: ButtonStyle`: The style of the button (e.g., `ButtonStyle.Primary`, `ButtonStyle.Link`). Determines behavior and required fields.
        -   `Primary`, `Secondary`, `Success`, `Danger`: Require `customId`.
        -   `Link`: Requires `url`, does not send an interaction.
        -   `Premium`: Requires `skuId`, for monetized apps, does not send an interaction.
    -   `customId?: string`: Developer-defined identifier (max 100 characters). Sent back in the interaction payload when the button is clicked. **Required for non-link/non-premium styles.** Must be unique within the message.
    -   `url?: string`: URL for `ButtonStyle.Link` buttons.
    -   `skuId?: string`: Identifier for a purchasable SKU for `ButtonStyle.Premium` buttons.
    -   `emoji?: EmojiObject`: Partial emoji object (`{ id?: string, name?: string, animated?: boolean }`) to display on the button.
    -   `disabled?: boolean`: Whether the button is disabled (defaults to `false`).
    -   `id?: number`: Optional identifier for the component.

---

### Select Menus (Interactive Components - Legacy & V2)

Select menus allow users to choose one or more options from a list.
*All select menus must be placed as the sole child of an `<ActionRow>`.*

**Common Select Menu Props (`BaseSelectProps`):**

-   `customId: string`: Developer-defined ID for the select menu (max 100 characters). Sent back in the interaction payload. Must be unique.
-   `placeholder?: string`: Placeholder text if nothing is selected (max 150 characters).
-   `minValues?: number`: Minimum number of items that must be chosen (0-25, defaults to 1).
-   `maxValues?: number`: Maximum number of items that can be chosen (1-25, defaults to 1).
-   `disabled?: boolean`: Whether the select menu is disabled (defaults to `false`).
-   `id?: number`: Optional identifier for the component.

#### `<StringSelect>`

Allows users to choose from a list of predefined text options.

-   **Props (`StringSelectProps` extends `BaseSelectProps`):**
    -   `children: React.ReactElement<SelectOptionProps> | React.ReactElement<SelectOptionProps>[]`: Array of `<SelectOption>` elements (max 25 options).

#### `<SelectOption>` (Child of `<StringSelect>`)

Represents an option within a `<StringSelect>` menu.

-   **Props (`SelectOptionProps`):**
    -   `label: string`: User-facing name of the option (max 100 characters). Alternative to `children`.
    -   `children?: string`: User-facing name of the option (max 100 characters). Alternative to `label`.
    -   `value: string`: Developer-defined value of the option (max 100 characters). This value is sent in the interaction.
    -   `description?: string`: Additional description of the option (max 100 characters).
    -   `emoji?: EmojiObject`: Partial emoji object to display with the option.
    -   `isDefault?: boolean`: Whether this option is selected by default.

#### Auto-Populated Select Menus

These select menus are automatically populated by Discord based on server context (users, roles, channels).

**Common Auto-Populated Select Props (`AutoPopulatedSelectProps` extends `BaseSelectProps`):**

-   `defaultValues?: SelectDefaultValue[]`: List of default selected values. Each object is `{ id: string, type: "user" | "role" | "channel" }`. The number of values must be between `minValues` and `maxValues`.

#### `<UserSelect>`

Allows users to select one or more users from the server.

-   **Props (`UserSelectProps` extends `AutoPopulatedSelectProps`):**
    -   `defaultValues?: SelectDefaultValue[]`: Default values must have `type: "user"`.

#### `<RoleSelect>`

Allows users to select one or more roles from the server.

-   **Props (`RoleSelectProps` extends `AutoPopulatedSelectProps`):**
    -   `defaultValues?: SelectDefaultValue[]`: Default values must have `type: "role"`.

#### `<MentionableSelect>`

Allows users to select users or roles from the server.

-   **Props (`MentionableSelectProps` extends `AutoPopulatedSelectProps`):**
    -   `defaultValues?: SelectDefaultValue[]`: Default values can have `type: "user"` or `type: "role"`.

#### `<ChannelSelect>`

Allows users to select one or more channels from the server. Can be filtered by channel types.

-   **Props (`ChannelSelectProps` extends `AutoPopulatedSelectProps`):**
    -   `defaultValues?: SelectDefaultValue[]`: Default values must have `type: "channel"`.
    -   `channelTypes?: number[]`: List of channel type integers (e.g., from `ChannelTypes` enum) to filter the selectable channels.

---
### V2 Only Components
*These components require `<Message isV2={true}>`.*

---

### `<Section>` (V2 Layout Component)

A layout element for V2 messages. Sections display text alongside an optional accessory (like a `<Thumbnail>` or `<Button>`).

-   **Props (`SectionProps`):**
    -   `children: React.ReactNode`: Child components. Typically processed into 1 to 3 `<TextDisplay>` components and one optional accessory. The accessory should be the last child if provided.
    -   `id?: number`: Optional identifier for the component.
-   **Structure:** Discord expects `components` (for TextDisplays) and `accessory` (for Thumbnail/Button) fields in the JSON. DisJSX handles this based on children.

---

### `<TextDisplay>` (V2 Content Component)

Used to display markdown-formatted text within V2 messages. Similar to message `content` but as a distinct, repeatable component.

-   **Props (`TextDisplayProps`):**
    -   `children: React.ReactNode`: The markdown content to be displayed (will be stringified to form the `content` field in the JSON).
    -   `id?: number`: Optional identifier for the component.

---

### `<Thumbnail>` (V2 Content Component - Section Accessory)

A small image typically used as an accessory within a `<Section>`.

-   **Props (`ThumbnailProps`):**
    -   `url: string`: URL of the media. Supports HTTP/HTTPS URLs or `attachment://<filename>` references (requires file upload).
    -   `description?: string`: Alt text for the media (max 1024 characters).
    -   `spoiler?: boolean`: Whether the thumbnail should be a spoiler (blurred). Defaults to `false`.
    -   `id?: number`: Optional identifier for the component.
-   **Note:** This component maps to Discord's `thumbnail` component (type 11) which has a `media` object containing the `url`.

---

### `<MediaGallery>` (V2 Content Component)

Displays 1-10 media items (images/videos) in an organized gallery format.

-   **Props (`MediaGalleryProps`):**
    -   `children: React.ReactElement<MediaGalleryItemProps> | React.ReactElement<MediaGalleryItemProps>[]`: One to ten `<MediaGalleryItem>` elements.
    -   `id?: number`: Optional identifier for the component.
-   **Note:** Maps to Discord's `media_gallery` component (type 12) which has an `items` array.

---

### `<MediaGalleryItem>` (V2 - Child of `<MediaGallery>`)

Represents a single item within a `<MediaGallery>`.

-   **Props (`MediaGalleryItemProps`):**
    -   `url: string`: URL of the media. Supports HTTP/HTTPS URLs or `attachment://<filename>` references.
    -   `description?: string`: Alt text for the media (max 1024 characters).
    -   `spoiler?: boolean`: Whether the media should be a spoiler. Defaults to `false`.
-   **Note:** Each item maps to an object in the `items` array of the `media_gallery` component, containing a `media` object (for the `url`) and other props.

---

### `<File>` (V2 Content Component)

Displays an uploaded file as an attachment, referenced by `attachment://filename`. Requires the file to be uploaded with the message via `multipart/form-data`.

-   **Props (`FileProps`):**
    -   `url: string`: URL of the file, **must** be an attachment reference using `attachment://<filename>` syntax.
    -   `spoiler?: boolean`: Whether the file should be a spoiler. Defaults to `false`.
    -   `id?: number`: Optional identifier for the component.
-   **Note:** Maps to Discord's `file` component (type 13) which has a `file` object containing the `url`.

---

### `<Separator>` (V2 Layout Component)

Adds vertical padding and an optional visual divider between other V2 components.

-   **Props (`SeparatorProps`):**
    -   `divider?: boolean`: Whether a visual divider should be displayed. Defaults to `true`.
    -   `spacing?: 1 | 2`: Size of separator padding: `1` for small, `2` for large. Defaults to `1`.
    -   `id?: number`: Optional identifier for the component.
-   **Note:** Maps to Discord's `separator` component (type 14).

---

### `<Container>` (V2 Layout Component)

Visually groups a set of V2 components, with an optional customizable color bar on the left. Can be used to create embed-like structures in V2 messages.

-   **Props (`ContainerProps`):**
    -   `children: React.ReactNode`: Child components. Can be `<ActionRow>`, `<TextDisplay>`, `<Section>`, `<MediaGallery>`, `<Separator>`, or `<File>`.
    -   `accentColor?: number | string`: Optional color for the accent bar (RGB integer from `0x000000` to `0xFFFFFF`, or a hex string).
    -   `spoiler?: boolean`: Whether the entire container should be a spoiler (blurred out). Defaults to `false`.
    -   `id?: number`: Optional identifier for the component.
-   **Note:** Maps to Discord's `container` component (type 17).

---

## Utility Objects & Enums

DisJSX provides several utility objects/enums that map to Discord constants:

-   **`Colors`**: Provides predefined color integer values for embeds and containers (e.g., `Colors.Blurple`, `Colors.Red`).
    ```tsx
    <Embed color={Colors.Green} />
    <Container accentColor={Colors.Yellow} />
    ```
-   **`ButtonStyle`**: Defines styles for `<Button>` components (e.g., `ButtonStyle.Primary`, `ButtonStyle.Link`, `ButtonStyle.Danger`).
    ```tsx
    <Button style={ButtonStyle.Success} customId="accept">Accept</Button>
    ```
-   **`MessageFlags`**: For advanced message control (e.g., `MessageFlags.Ephemeral`). The `IsComponentsV2` flag (`1 << 15` or `32768`) is automatically handled by `<Message isV2={true}>`.
    ```tsx
    <Message flags={MessageFlags.Ephemeral} isV2>
        <TextDisplay>This message is ephemeral.</TextDisplay>
    </Message>
    ```
-   **`ChannelTypes`**: Provides predefined channel type integers for use with `<ChannelSelect>` (e.g., `ChannelTypes.GuildText`, `ChannelTypes.GuildAnnouncement`).
    ```tsx
    <ChannelSelect customId="ch_select" channelTypes={[ChannelTypes.GuildText, ChannelTypes.GuildVoice]} />
    ```

## Final Rendering

Remember to always use the `renderDiscordMessage` function to convert your DisJSX tree into the JSON payload expected by Discord:

```tsx
import { Message, Content, renderDiscordMessage } from "disjsx";

const myJsxMessage = (
    <Message>
        <Content>Hello from DisJSX!</Content>
    </Message>
);

const discordPayload = renderDiscordMessage(myJsxMessage);
// Send discordPayload to the Discord API
console.log(discordPayload);
```
