import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home/Home';
import Inner from './pages/Inner/Inner';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/inner" element={<Inner />} />
			</Routes>
		</>
	);
}

export default App;
