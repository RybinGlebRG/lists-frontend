

import DisplayArea from './views/displayArea';
import { Provider } from 'react-redux'
import store from './dao/redux/store'
import { createRoot } from 'react-dom/client'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'


const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error('Failed to find the root element');
} 
const root = createRoot(rootElement);

root.render(
	<Provider store={store}>
		<DisplayArea />
	</Provider>
  );