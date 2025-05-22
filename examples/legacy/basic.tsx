import { Content, Message, renderDiscordMessage } from "disjsx";

const BasicMessage = () => {
	const world = "world";

	return (
		<Message>
			<Content>Hello {world}!</Content>
		</Message>
	);
};

console.log(
	Bun.inspect(renderDiscordMessage(<BasicMessage />), {
		colors: true,
		depth: 250,
	}),
);
