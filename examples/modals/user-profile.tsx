import { Modal, ActionRow, TextInput, TextInputStyle, renderDiscordModal } from "disjsx";

const UserProfileModal = () => (
	<Modal title="Edit Profile" customId="profile_modal">
		<ActionRow>
			<TextInput
				customId="username"
				label="Username"
				style={TextInputStyle.Short}
				placeholder="Enter your username"
				maxLength={32}
				required={true}
			/>
		</ActionRow>
		<ActionRow>
			<TextInput
				customId="bio"
				label="Bio"
				style={TextInputStyle.Paragraph}
				placeholder="Tell us about yourself..."
				maxLength={1000}
				required={false}
			/>
		</ActionRow>
		<ActionRow>
			<TextInput
				customId="email"
				label="Email"
				style={TextInputStyle.Short}
				placeholder="user@example.com"
				required={true}
			/>
		</ActionRow>
	</Modal>
);

console.log(
	"UserProfile Modal:",
	Bun.inspect(renderDiscordModal(<UserProfileModal />), {
		colors: true,
		depth: 250,
	}),
);
