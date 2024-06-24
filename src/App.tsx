import { RouterProvider } from 'react-router-dom';
import { router } from './navigation';
import { ToastContainer } from 'react-toastify';

import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';
import './styles/main.css';

function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
			mutations: {
				retry: false,
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<ToastContainer />
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
