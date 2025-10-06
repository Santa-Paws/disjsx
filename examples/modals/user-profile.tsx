import { Modal, Label, TextInput, TextInputStyle, renderDiscordModal } from "disjsx";

/**
 * Example: User Profile Modal (Updated to use Label components)
 * 
 * This demonstrates:
 * - Label components replacing the deprecated ActionRow pattern
 * - TextInput components with different styles
 * - Mix of required and optional fields
 * - Clean, modern modal structure
 * 
 * Note: ActionRow with TextInput is deprecated for modals. Use Label instead!
 */
const UserProfileModal = () => (
	<Modal title="Edit Profile" customId="profile_modal">
		<Label label="Username" description="Choose a display name for your profile">
			<TextInput
				customId="username"
				style={TextInputStyle.Short}
				placeholder="Enter your username"
				maxLength={32}
				required={true}
				label="Username"
			/>
		</Label>
		
		<Label label="Bio" description="Tell the community about yourself">
			<TextInput
				customId="bio"
				style={TextInputStyle.Paragraph}
				placeholder="Tell us about yourself..."
				maxLength={1000}
				required={false}
			/>
		</Label>
		
		<Label label="Email" description="Your contact email (kept private)">
			<TextInput
				customId="email"
				style={TextInputStyle.Short}
				placeholder="user@example.com"
				required={true}
			/>
		</Label>
	</Modal>
);

console.log(
	"UserProfile Modal:",
	Bun.inspect(renderDiscordModal(<UserProfileModal />), {
		colors: true,
		depth: 250,
	}),
);
