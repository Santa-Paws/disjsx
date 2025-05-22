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

const FullEmbedMessage = () => {
	return (
		<Message>
			<Embed color={Colors.Purple} timestamp={new Date()} url="https://discord.com">
				<EmbedAuthor
					name="John Doe"
					iconUrl="https://cdn.discordapp.com/embed/avatars/0.png"
					url="https://github.com"
				/>
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
};

console.log(
	"Embed Message:",
	Bun.inspect(renderDiscordMessage(<FullEmbedMessage />), {
		colors: true,
		depth: 250,
	}),
);
