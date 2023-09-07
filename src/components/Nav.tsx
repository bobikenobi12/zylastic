import {
	Box,
	Flex,
	HStack,
	IconButton,
	useDisclosure,
	Stack,
	Spinner,
	useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { AuthLoading, Authenticated, Unauthenticated } from "convex/react";
import { UserButton, SignInButton, SignOutButton } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

import { Outlet } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";
interface Props {
	children: React.ReactNode;
}

const Links = ["Dashboard", "Team"];

const NavLink = (props: Props) => {
	const { children } = props;

	return (
		<Box
			as="a"
			px={2}
			py={1}
			rounded={"md"}
			_hover={{
				textDecoration: "none",
				bg: useColorModeValue("gray.200", "gray.700"),
			}}
			href={"#"}
		>
			{children}
		</Box>
	);
};

export default function Nav() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
				<Flex
					h={16}
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={"center"}>
						<Box>Elemental Conquest</Box>
						<HStack
							as={"nav"}
							spacing={4}
							display={{ base: "none", md: "flex" }}
						>
							{Links.map((link) => (
								<NavLink key={link}>{link}</NavLink>
							))}
						</HStack>
					</HStack>
					<Flex alignItems={"center"} gap={4}>
						<ThemeToggle />
						<AuthLoading>
							<Spinner />
						</AuthLoading>
						<Authenticated>
							<SignOutButton />

							<UserButton
								appearance={{
									baseTheme: useColorModeValue(
										undefined,
										dark
									),
								}}
							/>
						</Authenticated>
						<Unauthenticated>
							<SignInButton />
						</Unauthenticated>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							{Links.map((link) => (
								<NavLink key={link}>{link}</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>

			<Outlet />
		</>
	);
}
