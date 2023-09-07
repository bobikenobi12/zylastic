import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Game from "./pages/Game";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Nav />} />
			<Route path="/game" element={<Game />} />
		</Routes>
	);
}

export default App;
