import {
	Box,
	VStack,
	HStack,
	Card,
	CardBody,
	CardHeader,
	Grid,
	Flex,
	Image,
	List,
	ListItem,
	ListIcon,
	Text,
	Button,
	FormControl,
	FormLabel,
	Textarea,
} from "@chakra-ui/react";

const stats = {
	strength: 0,
	dexterity: 0,
	intelligence: 0,
	endurance: 0,
	luck: 0,
	arcane: 0,
	vigor: 0,
	vitality: 0,
};

export default function Game() {
	return (
		<Flex
			align="center"
			justify="center"
			maxW={["100%", "80%"]}
			direction={["column", "row"]}
			gap={4}
			mx="auto"
		>
			<FormControl id="prompt">
				<FormLabel>Prompt</FormLabel>
				<Textarea />
			</FormControl>
			<VStack alignItems={["center", "flex-start"]} spacing={4}>
				<Text>Card preview:</Text>
				<Card>
					<CardHeader>Card Name</CardHeader>
					<CardBody>
						<Image src="https://bit.ly/2Z4KKcF" />
						<VStack>
							<Text>Stats:</Text>
							<HStack gap={4}>
								<List>
									{Object.entries(stats)
										.splice(0, 4)
										.map(([key, value], idx) => (
											<ListItem key={idx}>
												<ListIcon></ListIcon>
												{key}: {value}
											</ListItem>
										))}
								</List>
								<List>
									{Object.entries(stats)
										.splice(4, 4)
										.map(([key, value], idx) => (
											<ListItem key={idx}>
												<ListIcon></ListIcon>
												{key}: {value}
											</ListItem>
										))}
								</List>
							</HStack>
						</VStack>
						<Text>Card Description</Text>
					</CardBody>
				</Card>
			</VStack>
		</Flex>
	);
}
