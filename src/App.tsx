import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import CardCreator from "./pages/CardCreator";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Nav />}>
				<Route path="/game" element={<CardCreator />} />
			</Route>
		</Routes>
	);
}

export default App;
