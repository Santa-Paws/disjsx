import {
	renderDiscordModal,
	Modal,
	Label,
	TextInput,
	TextInputStyle,
	StringSelect,
	SelectOption,
} from "disjsx";

/**
 * Example: Feedback Form Modal using Label components
 * 
 * This demonstrates:
 * - Label components wrapping TextInput
 * - Label components wrapping StringSelect
 * - Descriptions providing additional context
 * - Different TextInput styles (Short and Paragraph)
 */
const FeedbackFormModal = () => {
	return (
		<Modal title="Game Feedback" customId="game_feedback_modal">
			<Label
				label="What did you find interesting about the game?"
				description="Please give us as much detail as possible so we can improve the game!"
			>
				<TextInput
					customId="game_feedback"
					style={TextInputStyle.Paragraph}
					minLength={100}
					maxLength={4000}
					placeholder="Write your feedback here..."
					required
				/>
			</Label>

			<Label label="Rate your experience" description="How would you rate your overall experience?">
				<StringSelect customId="rating" placeholder="Select a rating" required>
					<SelectOption label="⭐⭐⭐⭐⭐ Excellent" value="5" />
					<SelectOption label="⭐⭐⭐⭐ Good" value="4" />
					<SelectOption label="⭐⭐⭐ Average" value="3" />
					<SelectOption label="⭐⭐ Below Average" value="2" />
					<SelectOption label="⭐ Poor" value="1" />
				</StringSelect>
			</Label>

			<Label label="Your username (optional)">
				<TextInput
					customId="username"
					style={TextInputStyle.Short}
					maxLength={100}
					placeholder="Enter your username..."
					required={false}
				/>
			</Label>
		</Modal>
	);
};

console.log(
	"Feedback Form Modal:",
	Bun.inspect(renderDiscordModal(<FeedbackFormModal />), {
		colors: true,
		depth: 250,
	}),
);
