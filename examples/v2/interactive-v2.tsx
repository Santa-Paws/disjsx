import {
	Message,
	Section,
	TextDisplay,
	Button,
	Container,
	ActionRow,
	ButtonStyle,
	StringSelect,
	SelectOption,
	UserSelect,
	RoleSelect,
	Colors,
	renderDiscordMessage,
} from "disjsx";

/**
 * Example: Interactive V2 Message
 *
 * This demonstrates various interactive patterns in V2:
 * - Buttons in different contexts (standalone, in sections, in containers)
 * - Select menus (string, user, role) in various arrangements
 * - Interactive accessories in sections
 * - Mixed interactive layouts
 * - Disabled and enabled states
 */
const InteractiveV2Message = () => {
	return (
		<Message isV2>
			<TextDisplay>## Interactive Components Showcase</TextDisplay>
			<TextDisplay>This message focuses on **interactive elements** and how they work in V2.</TextDisplay>

			<TextDisplay>### Standalone Action Row</TextDisplay>
			<TextDisplay>A simple row of buttons for basic interactions.</TextDisplay>
			<ActionRow>
				<Button customId="approve" style={ButtonStyle.Success} emoji={{ name: "✅" }}>
					Approve
				</Button>
				<Button customId="reject" style={ButtonStyle.Danger} emoji={{ name: "❌" }}>
					Reject
				</Button>
				<Button customId="info" style={ButtonStyle.Secondary} emoji={{ name: "ℹ️" }}>
					More Info
				</Button>
			</ActionRow>

			<Section>
				<TextDisplay>### Section with Button Accessory</TextDisplay>
				<TextDisplay>Buttons can be accessories to sections, appearing alongside text.</TextDisplay>
				<Button customId="section_accessory" style={ButtonStyle.Primary}>
					Section Button
				</Button>
			</Section>

			<Container accentColor={Colors.Green}>
				<TextDisplay>## Container with Interactive Elements</TextDisplay>
				<TextDisplay>Containers can hold multiple interactive components.</TextDisplay>

				<ActionRow>
					<Button customId="container_primary" style={ButtonStyle.Primary}>
						Primary
					</Button>
					<Button customId="container_secondary" style={ButtonStyle.Secondary}>
						Secondary
					</Button>
				</ActionRow>

				<ActionRow>
					<StringSelect customId="container_select" placeholder="Choose from container">
						<SelectOption label="Option A" value="a" description="First option" />
						<SelectOption label="Option B" value="b" description="Second option" emoji={{ name: "🚀" }} />
						<SelectOption label="Option C" value="c" description="Third option" />
					</StringSelect>
				</ActionRow>
			</Container>

			<TextDisplay>### Select Menu Variations</TextDisplay>

			<ActionRow>
				<StringSelect customId="multi_select" placeholder="Multi-select example" minValues={1} maxValues={3}>
					<SelectOption label="🚀 Feature Request" value="feature" />
					<SelectOption label="🐛 Bug Report" value="bug" />
					<SelectOption label="💡 Suggestion" value="suggestion" />
					<SelectOption label="📖 Documentation" value="docs" />
					<SelectOption label="🎨 Design" value="design" />
				</StringSelect>
			</ActionRow>

			<ActionRow>
				<UserSelect
					customId="user_picker"
					placeholder="Select users to notify"
					minValues={1}
					maxValues={5}
				/>
			</ActionRow>

			<ActionRow>
				<RoleSelect
					customId="role_picker"
					placeholder="Select roles"
					minValues={0}
					maxValues={3}
					disabled
				/>
			</ActionRow>

			<TextDisplay>### Mixed Interactive Layout</TextDisplay>
			<ActionRow>
				<Button customId="left_action" style={ButtonStyle.Success}>
					Left Action
				</Button>
				<Button customId="center_action" style={ButtonStyle.Primary}>
					Center
				</Button>
				<Button style={ButtonStyle.Link} url="https://discord.com">
					External Link
				</Button>
			</ActionRow>

			<TextDisplay>### Final Section with Mixed Accessories</TextDisplay>
			<TextDisplay>This section shows how multiple interactive elements can work together.</TextDisplay>
			<ActionRow>
				<Button customId="final_approve" style={ButtonStyle.Success}>
					✅ Approve
				</Button>
				<Button customId="final_edit" style={ButtonStyle.Secondary}>
					✏️ Edit
				</Button>
			</ActionRow>
		</Message>
	);
};

console.log(
	"Interactive V2 Message:",
	Bun.inspect(renderDiscordMessage(<InteractiveV2Message />), {
		colors: true,
		depth: 250,
	}),
);
