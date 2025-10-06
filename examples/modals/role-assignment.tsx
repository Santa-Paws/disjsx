import {
	renderDiscordModal,
	Modal,
	Label,
	UserSelect,
	RoleSelect,
	ChannelSelect,
	ChannelTypes,
	TextDisplay,
} from "disjsx";

/**
 * Example: Role Assignment Modal using Select Menus
 * 
 * This demonstrates:
 * - TextDisplay with markdown formatting
 * - Label with UserSelect for multiple users
 * - Label with RoleSelect for multiple roles
 * - Label with ChannelSelect with channel type filtering
 */
const RoleAssignmentModal = () => {
	return (
		<Modal title="Assign Roles" customId="role_assignment_modal">
			<TextDisplay>
				## Role Assignment Tool
				
				This tool allows you to assign roles to multiple users at once.
				Select the users, roles, and notification channel below.
			</TextDisplay>

			<Label label="Select Users" description="Choose the users to assign roles to">
				<UserSelect customId="users_selected" maxValues={10} required />
			</Label>

			<Label label="Select Roles" description="Choose which roles to assign">
				<RoleSelect customId="roles_selected" maxValues={5} required />
			</Label>

			<Label label="Notification Channel" description="Where should we announce these role changes?">
				<ChannelSelect
					customId="announcement_channel"
					channelTypes={[ChannelTypes.GuildText, ChannelTypes.GuildAnnouncement]}
					required
				/>
			</Label>
		</Modal>
	);
};

console.log(
	"Role Assignment Modal:",
	Bun.inspect(renderDiscordModal(<RoleAssignmentModal />), {
		colors: true,
		depth: 250,
	}),
);