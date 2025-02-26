// main.jsx
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Carrier from './carrier.jsx';
import store from './modules/store.js';
import { BrowserRouter as Router } from 'react-router-dom';
 
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>   
      <Carrier />
    </Router>
  </Provider>
)