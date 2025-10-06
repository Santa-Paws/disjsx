import {
	renderDiscordModal,
	Modal,
	Label,
	TextInput,
	TextInputStyle,
	FileUpload,
	StringSelect,
	SelectOption,
	TextDisplay,
	MentionableSelect,
} from "disjsx";

/**
 * Example: Content Submission Modal
 * 
 * This demonstrates:
 * - TextDisplay with complex markdown and formatting
 * - FileUpload with optional uploads
 * - MentionableSelect for credits
 * - Mix of required and optional fields
 */
const ContentSubmissionModal = () => {
	return (
		<Modal title="Submit Content" customId="content_submission_modal">
			<TextDisplay>
				# Content Submission Form
				
				Submit your creative content to be featured in our community!
				
				**Guidelines:**
				- Original content only
				- Must follow community guidelines
				- Files must be under 10MB each
			</TextDisplay>

			<Label label="Content Title" description="Give your submission a catchy title">
				<TextInput
					customId="title"
					style={TextInputStyle.Short}
					maxLength={100}
					placeholder="My Amazing Artwork"
					required
				/>
			</Label>

			<Label label="Description" description="Describe your content and creation process">
				<TextInput
					customId="description"
					style={TextInputStyle.Paragraph}
					minLength={50}
					maxLength={2000}
					placeholder="This piece was inspired by..."
					required
				/>
			</Label>

			<Label label="Content Category">
				<StringSelect customId="category" placeholder="Select a category" required>
					<SelectOption label="🎨 Artwork" value="artwork" />
					<SelectOption label="📝 Writing" value="writing" />
					<SelectOption label="🎵 Music" value="music" />
					<SelectOption label="🎥 Video" value="video" />
					<SelectOption label="📷 Photography" value="photography" />
					<SelectOption label="💻 Code/Project" value="code" />
					<SelectOption label="🎮 Game Content" value="game" />
					<SelectOption label="📚 Tutorial" value="tutorial" />
				</StringSelect>
			</Label>

			<Label label="Upload Files" description="Upload your content files (images, documents, etc.)">
				<FileUpload customId="content_files" minValues={1} maxValues={5} required />
			</Label>

			<Label label="Additional Links (optional)" description="Any external links related to your content">
				<TextInput
					customId="links"
					style={TextInputStyle.Paragraph}
					maxLength={500}
					placeholder="https://..."
					required={false}
				/>
			</Label>

			<Label label="Credits (optional)" description="Mention collaborators or people to credit">
				<MentionableSelect
					customId="credits"
					placeholder="Select users or roles to credit"
					maxValues={10}
					required={false}
				/>
			</Label>
		</Modal>
	);
};

console.log(
	"Content Submission Modal:",
	Bun.inspect(renderDiscordModal(<ContentSubmissionModal />), {
		colors: true,
		depth: 250,
	}),
);
