// v2-media-message.tsx
import { Message, MediaGallery, MediaGalleryItem, File, TextDisplay, renderDiscordMessage } from "disjsx";

const V2MediaMessage = () => {
	return (
		<Message isV2>
			<TextDisplay>### Media Showcase</TextDisplay>
			<MediaGallery>
				<MediaGalleryItem
					url="https://placehold.co/1024/45BFEA/FFFFFF.png?text=Cats%20Are%20Cool"
					description="First image"
				/>
				<MediaGalleryItem
					url="https://www3.cde.ca.gov/download/rod/big_buck_bunny.mp4"
					description="A cool video"
					spoiler
				/>
				<MediaGalleryItem url="attachment://local-image.jpg" description="Local image from attachment" />
			</MediaGallery>

			<TextDisplay>### File Attachments</TextDisplay>
			<File url="attachment://document.pdf" />
			<File url="attachment://archive.zip" spoiler />
		</Message>
	);
};

// Note: For 'attachment://' URLs to work, the files (local-image.jpg, document.pdf, archive.zip)
// would need to be included in the multipart/form-data request when sending the message to Discord.
// renderDiscordMessage only generates the JSON payload.

console.log(
	"Media Message:",
	Bun.inspect(renderDiscordMessage(<V2MediaMessage />), {
		colors: true,
		depth: 250,
	}),
);
