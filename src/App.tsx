import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Nav />} />
		</Routes>
	);
}

export default App;
