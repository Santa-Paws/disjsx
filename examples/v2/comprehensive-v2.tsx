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
	MediaGallery,
	MediaGalleryItem,
	File,
	renderDiscordMessage,
} from "disjsx";

/**
 * Example: Comprehensive V2 Message
 *
 * This demonstrates all major V2 components in a single message:
 * - TextDisplay for various content
 * - Section with text and accessories
 * - Container with accent colors and spoiler
 * - MediaGallery with multiple items
 * - File attachments
 * - Separator for layout control
 * - ActionRow with buttons
 * - Interactive components throughout
 */
const ComprehensiveV2Message = () => {
	return (
		<Message isV2 username="V2Bot" avatarUrl="https://cdn.discordapp.com/embed/avatars/0.png">
			<TextDisplay>## Welcome to the Comprehensive V2 Demo!</TextDisplay>
			<TextDisplay>This message showcases **all major V2 components** in a single, cohesive example.</TextDisplay>

			<Section>
				<TextDisplay>### Section with Thumbnail Accessory</TextDisplay>
				<TextDisplay>This section demonstrates how text content pairs with a visual accessory.</TextDisplay>
				<Thumbnail
					url="https://cdn.discordapp.com/embed/avatars/1.png"
					description="Demo thumbnail image"
				/>
			</Section>

			<Section>
				<TextDisplay>### Section with Button Accessory</TextDisplay>
				<TextDisplay>Sections can also have interactive accessories like buttons.</TextDisplay>
				<Button customId="demo_button" style={ButtonStyle.Primary}>
					Demo Button
				</Button>
			</Section>

			<Separator spacing={2} divider />

			<Container accentColor={Colors.Blurple}>
				<TextDisplay>## Container with Accent Color</TextDisplay>
				<TextDisplay>Containers provide visual grouping with optional accent bars and spoiler support.</TextDisplay>
				<ActionRow>
					<Button customId="container_btn_1" style={ButtonStyle.Success}>
						Success Button
					</Button>
					<Button customId="container_btn_2" style={ButtonStyle.Danger}>
						Danger Button
					</Button>
				</ActionRow>
			</Container>

			<Container accentColor="#FF6B6B" spoiler>
				<TextDisplay>## Spoiler Container</TextDisplay>
				<TextDisplay>This entire container is marked as a spoiler and has a custom pink accent color!</TextDisplay>
			</Container>

			<Separator spacing={1} />

			<TextDisplay>### Media Gallery Demo</TextDisplay>
			<MediaGallery>
				<MediaGalleryItem
					url="https://placehold.co/800x600/45BFEA/FFFFFF.png?text=Image+1"
					description="First gallery image"
				/>
				<MediaGalleryItem
					url="https://placehold.co/800x600/FF6B6B/FFFFFF.png?text=Image+2"
					description="Second gallery image"
					spoiler
				/>
				<MediaGalleryItem
					url="https://placehold.co/800x600/4ECDC4/FFFFFF.png?text=Image+3"
					description="Third gallery image"
				/>
				<MediaGalleryItem
					url="attachment://demo-video.mp4"
					description="Local video attachment"
				/>
			</MediaGallery>

			<TextDisplay>### File Attachments</TextDisplay>
			<File url="attachment://document.pdf" />
			<File url="attachment://archive.zip" spoiler />

			<Separator divider={false} />

			<TextDisplay>## Interactive Elements</TextDisplay>
			<ActionRow>
				<Button customId="primary_action" style={ButtonStyle.Primary}>
					Primary Action
				</Button>
				<Button customId="secondary_action" style={ButtonStyle.Secondary}>
					Secondary
				</Button>
				<Button style={ButtonStyle.Link} url="https://discord.com">
					External Link
				</Button>
			</ActionRow>

			<TextDisplay>*This comprehensive example shows how all V2 components work together harmoniously!*</TextDisplay>
		</Message>
	);
};

console.log(
	"Comprehensive V2 Message:",
	Bun.inspect(renderDiscordMessage(<ComprehensiveV2Message />), {
		colors: true,
		depth: 250,
	}),
);
