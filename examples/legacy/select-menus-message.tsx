import {
	Message,
	ActionRow,
	UserSelect,
	RoleSelect,
	MentionableSelect,
	ChannelSelect,
	renderDiscordMessage,
	ChannelTypes,
} from "disjsx";

const SelectMenusMessage = () => {
	return (
		<Message>
			<ActionRow>
				<UserSelect
					customId="user_select"
					placeholder="Select a user"
					minValues={1}
					maxValues={5}
					defaultValues={[{ id: "123456789012345678", type: "user" }]}
				/>
			</ActionRow>
			<ActionRow>
				<RoleSelect customId="role_select" placeholder="Select a role" />
			</ActionRow>
			<ActionRow>
				<MentionableSelect customId="mentionable_select" placeholder="Select a user or role" disabled />
			</ActionRow>
			<ActionRow>
				<ChannelSelect
					customId="channel_select"
					placeholder="Select a channel"
					channelTypes={[ChannelTypes.GuildText, ChannelTypes.GuildAnnouncement]}
				/>
			</ActionRow>
		</Message>
	);
};

console.log(
	"Select Menus Message:",
	Bun.inspect(renderDiscordMessage(<SelectMenusMessage />), {
		colors: true,
		depth: 250,
	}),
);
