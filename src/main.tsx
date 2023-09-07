import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

import { BrowserRouter } from "react-router-dom";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ChakraProvider>
			<ClerkProvider
				publishableKey={
					import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY
				}
			>
				<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ConvexProviderWithClerk>
			</ClerkProvider>
		</ChakraProvider>
	</React.StrictMode>
);
