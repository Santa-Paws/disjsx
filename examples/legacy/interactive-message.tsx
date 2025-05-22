// interactive-message.tsx
import {
	Message,
	ActionRow,
	Button,
	StringSelect,
	SelectOption,
	ButtonStyle,
	Colors,
	renderDiscordMessage,
	Embed,
	EmbedTitle,
	EmbedDescription,
} from "disjsx";

const InteractiveMessage = () => {
	return (
		<Message>
			<Embed color={Colors.Blurple}>
				<EmbedTitle>Interactive Components</EmbedTitle>
				<EmbedDescription>Below are some buttons and a select menu.</EmbedDescription>
			</Embed>
			<ActionRow>
				<Button customId="primary_btn" style={ButtonStyle.Primary}>
					Primary
				</Button>
				<Button customId="secondary_btn" style={ButtonStyle.Secondary} label="Secondary Labeled" />
				<Button customId="success_btn" style={ButtonStyle.Success} emoji={{ name: "✅" }} />
				<Button customId="danger_btn" style={ButtonStyle.Danger} disabled>
					Danger (Disabled)
				</Button>
				<Button style={ButtonStyle.Link} url="https://discord.com">
					Link Button
				</Button>
			</ActionRow>
			<ActionRow>
				<StringSelect customId="string_select_menu" placeholder="Choose an option" minValues={1} maxValues={2}>
					<SelectOption label="Option 1" value="opt1" description="This is the first option">
						Option 1 (Child)
					</SelectOption>
					<SelectOption label="Option 2" value="opt2" emoji={{ name: "👍" }} isDefault />
					<SelectOption label="Option 3" value="opt3" description="A third choice" />
				</StringSelect>
			</ActionRow>
		</Message>
	);
};

console.log(
	"Interactive Message:",
	Bun.inspect(renderDiscordMessage(<InteractiveMessage />), {
		colors: true,
		depth: 250,
	}),
);
