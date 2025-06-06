import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import makeServer from './services/server';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';

if (process.env.NODE_ENV === 'development') {
	makeServer();
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</StrictMode>
);
