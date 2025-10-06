import {
	renderDiscordModal,
	Modal,
	Label,
	TextInput,
	TextInputStyle,
	StringSelect,
	SelectOption,
	ChannelSelect,
	ChannelTypes,
} from "disjsx";

/**
 * Example: Poll Creator Modal
 * 
 * This demonstrates:
 * - Multiple TextInput components with different styles
 * - StringSelect with multiple selection
 * - ChannelSelect with channel type filtering
 * - Complex form with many fields
 */
const PollCreatorModal = () => {
	return (
		<Modal title="Create a Poll" customId="poll_creator_modal">
			<Label label="Poll Question" description="What question do you want to ask?">
				<TextInput
					customId="poll_question"
					style={TextInputStyle.Short}
					maxLength={256}
					placeholder="What's your favorite programming language?"
					required
				/>
			</Label>

			<Label label="Poll Options" description="Enter options separated by new lines">
				<TextInput
					customId="poll_options"
					style={TextInputStyle.Paragraph}
					minLength={10}
					maxLength={1000}
					placeholder="JavaScript\nPython\nRust\nTypeScript"
					required
				/>
			</Label>

			<Label label="Poll Duration" description="How long should the poll run?">
				<StringSelect customId="poll_duration" placeholder="Select duration" required>
					<SelectOption label="1 Hour" value="3600" />
					<SelectOption label="6 Hours" value="21600" />
					<SelectOption label="12 Hours" value="43200" />
					<SelectOption label="1 Day" value="86400" />
					<SelectOption label="3 Days" value="259200" />
					<SelectOption label="1 Week" value="604800" />
				</StringSelect>
			</Label>

			<Label label="Post in Channel" description="Where should this poll be posted?">
				<ChannelSelect
					customId="poll_channel"
					channelTypes={[ChannelTypes.GuildText, ChannelTypes.GuildAnnouncement]}
					required
				/>
			</Label>

			<Label label="Allow Multiple Choices?" description="Can users select more than one option?">
				<StringSelect customId="multiple_choice" required>
					<SelectOption label="Yes, allow multiple selections" value="true" />
					<SelectOption label="No, only one selection" value="false" isDefault />
				</StringSelect>
			</Label>
		</Modal>
	);
};

console.log(
	"Poll Creator Modal:",
	Bun.inspect(renderDiscordModal(<PollCreatorModal />), {
		colors: true,
		depth: 250,
	}),
);
