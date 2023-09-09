import {
	Box,
	VStack,
	HStack,
	Card,
	CardBody,
	CardHeader,
	Flex,
	Image,
	List,
	ListItem,
	ListIcon,
	Text,
	Tooltip,
	IconButton,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Button,
	Spinner,
	useToast,
} from "@chakra-ui/react";
import { RepeatClockIcon } from "@chakra-ui/icons";

import { api } from "../../convex/_generated/api";
import { useAction, useQuery } from "convex/react";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStoreUserEffect from "../hooks/useStoreUserEffect";

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

const schema = z.object({
	prompt: z.string().min(1).max(100),
});

type Inputs = z.infer<typeof schema>;

export default function CardCreator() {
	const userId = useStoreUserEffect();

	const toast = useToast();
	const card = useQuery(api.cards.GetCard, {
		cardId: "31tgjb3rdkdpkfdncn08vcn49jcchdr",
	});

	const action = useAction(api.ai.send);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({
		resolver: zodResolver(schema),
	});

	if (card === null || card === undefined) {
		return (
			<Flex align="center" justify="center" h="100vh">
				<Spinner size="xl" />
			</Flex>
		);
	}

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			await action({
				cardId: card._id,
				prompt: data.prompt,
			});
			toast({
				title: "Card Created",
				description: "Card has been created.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		} catch (err) {
			toast({
				title: "Error",
				description: "Card could not be created.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return (
		<Flex
			align="center"
			justify="center"
			maxW={["100%", "80%"]}
			direction={["column", "row"]}
			gap={4}
			mx="auto"
		>
			<Box w={["100%", "50%"]}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl id="prompt" isInvalid={Boolean(errors.prompt)}>
						<FormLabel htmlFor="prompt">Prompt</FormLabel>
						<Input
							size={"lg"}
							disabled={userId === null}
							{...register("prompt")}
						/>
					</FormControl>
					<FormErrorMessage>
						{errors.prompt?.message}
					</FormErrorMessage>
					<Button
						mt={4}
						colorScheme="teal"
						isLoading={isSubmitting}
						type="submit"
					>
						Generate card
					</Button>
				</form>

				<Tooltip label="Auto generate card stats">
					<IconButton
						aria-label="Auto Generate"
						icon={<RepeatClockIcon />}
						onClick={() => {}}
					/>
				</Tooltip>
			</Box>
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
