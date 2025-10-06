import {
	Message,
	Section,
	TextDisplay,
	Container,
	Separator,
	Colors,
	renderDiscordMessage,
} from "disjsx";

/**
 * Example: Formatting and Layout V2 Message
 *
 * This demonstrates text formatting and layout patterns in V2:
 * - HTML-like elements for semantic markup
 * - Headers, lists, code blocks, and other formatting
 * - Container layouts with different styling
 * - Typography and spacing patterns
 * - Complex nested content structures
 */
const FormattingV2Message = () => {
	return (
		<Message isV2>
			<TextDisplay>## Typography & Formatting Showcase</TextDisplay>

			<Container accentColor={Colors.Blurple}>
				<TextDisplay># Main Title</TextDisplay>
				<TextDisplay>## Secondary Heading</TextDisplay>
				<TextDisplay>### Section Header</TextDisplay>
			</Container>

			<Section>
				<TextDisplay>## Text Styling Examples</TextDisplay>
				<TextDisplay>
					This text demonstrates **bold formatting** and *italic text* with __underlined__ elements.
					We can also use <s>strikethrough</s> and <small>small text</small> for various effects.
				</TextDisplay>
			</Section>

			<Separator spacing={2} />

			<TextDisplay>## List Formatting</TextDisplay>

			<Section>
				<TextDisplay>### Unordered Lists</TextDisplay>
				<TextDisplay>
					<ul>
						<li>First item in the list</li>
						<li>Second item with **bold text**</li>
						<li>Third item containing <code>inline code</code></li>
						<li>
							Nested list:
							<ul>
								<li>Nested item 1</li>
								<li>Nested item 2</li>
							</ul>
						</li>
					</ul>
				</TextDisplay>
			</Section>

			<Section>
				<TextDisplay>### Ordered Lists</TextDisplay>
				<TextDisplay>
					<ol>
						<li>Complete the first step</li>
						<li>Move to the second phase</li>
						<li>Execute the third action</li>
						<li>
							Final steps:
							<ol>
								<li>Review the work</li>
								<li>Submit for approval</li>
							</ol>
						</li>
					</ol>
				</TextDisplay>
			</Section>

			<Container accentColor={Colors.Green}>
				<TextDisplay>## Code Examples</TextDisplay>
				<TextDisplay>Here's some inline <code>const message = "Hello World!";</code> code.</TextDisplay>
				<TextDisplay>
					<pre language="javascript">{`function createMessage() {
  const content = "This is a code block";
  return {
    type: "message",
    content: content
  };
}`}</pre>
				</TextDisplay>
				<TextDisplay>
					<pre language="json">{`{
  "name": "discord-message",
  "components": [
    {
      "type": 1,
      "content": "Text content here"
    }
  ]
}`}</pre>
				</TextDisplay>
			</Container>

			<Separator />

			<TextDisplay>## Quote and Block Elements</TextDisplay>

			<Section>
				<TextDisplay>### Blockquotes</TextDisplay>
				<TextDisplay>
					<blockquote>
						<strong>Important Notice:</strong><br />
						This is a blockquote that can contain multiple lines of formatted text.
						It supports *italic*, **bold**, and <code>code</code> formatting within the quote.
					</blockquote>
				</TextDisplay>
			</Section>

			<Container accentColor={Colors.Yellow}>
				<TextDisplay>## Mixed Content Layout</TextDisplay>
				<TextDisplay>
					<p>This paragraph shows how <strong>bold</strong> and <em>italic</em> text work together.</p>

					<p>Here's a second paragraph with <a href="https://discord.com">a link</a> and <s>strikethrough</s> text.</p>

					<p>The third paragraph demonstrates <small>small text</small> and regular content.</p>
				</TextDisplay>
			</Container>

			<TextDisplay>## Complex Nested Structure</TextDisplay>

			<TextDisplay>### Nested Container Example</TextDisplay>
			<Container accentColor={Colors.Red}>
				<TextDisplay>## Inner Container</TextDisplay>
				<TextDisplay>This container demonstrates complex nested content.</TextDisplay>
				<TextDisplay>
					<ul>
						<li>Item with <strong>bold text</strong></li>
						<li>Item with <em>italic text</em></li>
						<li>Item with <code>code</code></li>
					</ul>
				</TextDisplay>
			</Container>

			<Separator divider={false} />

			<TextDisplay>## Link and Media Placeholders</TextDisplay>
			<Section>
				<TextDisplay>
					Here are some example links:<br />
					- <a href="https://discord.com">Discord Homepage</a><br />
					- <a href="https://github.com">GitHub</a><br />
					- <a href="https://example.com">Example Domain</a>
				</TextDisplay>
			</Section>

			<TextDisplay>*This example demonstrates the rich formatting capabilities available in V2 messages!*</TextDisplay>
		</Message>
	);
};

console.log(
	"Formatting V2 Message:",
	Bun.inspect(renderDiscordMessage(<FormattingV2Message />), {
		colors: true,
		depth: 250,
	}),
);
