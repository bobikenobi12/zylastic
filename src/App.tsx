import { SignInButton, useUser, SignOutButton } from "@clerk/clerk-react";
import { AuthLoading, Authenticated, Unauthenticated } from "convex/react";

function App() {
	const { user } = useUser();

	return (
		<div className="App">
			<AuthLoading>
				<h1>Loading</h1>
			</AuthLoading>
			<Authenticated>
				{user && <h1>Logged in as {user.id}</h1>}

				<SignOutButton />
			</Authenticated>
			<Unauthenticated>
				<h1>Unauthenticated</h1>
				<SignInButton />
			</Unauthenticated>
		</div>
	);
}

export default App;
