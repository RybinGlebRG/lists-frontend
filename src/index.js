

import React from 'react';
import ReactDOM from 'react-dom';
import DisplayArea from './displayArea';
import { Provider } from 'react-redux'
import store from './redux/store'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'

ReactDOM.render(
	<Provider store={store}>
		<DisplayArea />
	</Provider>
	,
	document.getElementById('root')
  );