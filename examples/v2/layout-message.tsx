// v2-layout-message.tsx
import {
	Message,
	Section,
	TextDisplay,
	Thumbnail,
	Button,
	Container,
	Separator,
	ActionRow,
	ButtonStyle,
	Colors,
	renderDiscordMessage,
} from "disjsx";

const V2LayoutMessage = () => {
	return (
		<Message isV2 username="V2Bot">
			<TextDisplay>## Welcome to V2 Components! This message uses the new V2 component system.</TextDisplay>

			<Section>
				<TextDisplay>This is a section with text and a thumbnail accessory.</TextDisplay>
				<Thumbnail url="https://cdn.discordapp.com/embed/avatars/3.png" description="Accessory Thumbnail" />
			</Section>

			<Section>
				<TextDisplay>This section has a button accessory.</TextDisplay>
				<Button customId="section_button" style={ButtonStyle.Secondary}>
					Section Button
				</Button>
			</Section>

			<Separator spacing={2} divider />

			<Container accentColor={Colors.Green} spoiler>
				<TextDisplay>This content is inside a **spoiler container** with a green accent!</TextDisplay>
				<ActionRow>
					<Button customId="container_btn" style={ButtonStyle.Success}>
						Button in Container
					</Button>
				</ActionRow>
			</Container>

			<Container accentColor="#FF00FF">
				<TextDisplay>This container has a custom hex color accent.</TextDisplay>
			</Container>

			<Separator divider={false} />
			<TextDisplay>Separator above has no visible divider.</TextDisplay>
		</Message>
	);
};

console.log(
	"Layout Message:",
	Bun.inspect(renderDiscordMessage(<V2LayoutMessage />), {
		colors: true,
		depth: 250,
	}),
);
