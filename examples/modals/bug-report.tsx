import {
	renderDiscordModal,
	Modal,
	Label,
	TextInput,
	TextInputStyle,
	FileUpload,
	TextDisplay,
} from "disjsx";

/**
 * Example: Bug Report Modal with FileUpload
 * 
 * This demonstrates:
 * - TextDisplay component for modal instructions
 * - Label with TextInput for text description
 * - Label with FileUpload for screenshot uploads
 * - FileUpload with min and max values
 */
const BugReportModal = () => {
	return (
		<Modal title="Bug Report" customId="bug_report_modal">
			<TextDisplay>
				Please provide detailed information about the bug you encountered. **Screenshots are required!**
			</TextDisplay>

			<Label
				label="Description of the bug"
				description="Please describe the cause and effects of the bug"
			>
				<TextInput
					customId="description"
					style={TextInputStyle.Paragraph}
					minLength={30}
					placeholder="Whenever I click my profile..."
					required
				/>
			</Label>

			<Label
				label="Steps to reproduce"
				description="How can we reproduce this bug?"
			>
				<TextInput
					customId="steps"
					style={TextInputStyle.Paragraph}
					minLength={20}
					placeholder="1. Go to...\n2. Click on...\n3. See error"
					required
				/>
			</Label>

			<Label
				label="Provide screenshots of the bug"
				description="Please include at least two pictures of the bug in action"
			>
				<FileUpload customId="screenshots" minValues={2} maxValues={10} required />
			</Label>
		</Modal>
	);
};

console.log(
	"Bug Report Modal:",
	Bun.inspect(renderDiscordModal(<BugReportModal />), {
		colors: true,
		depth: 250,
	}),
);
