import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import './index.css';
import './svg.css';
import App from './App';
import About from './components/About';
import Ocean from './components/Ocean';
import Post from './components/Post';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
   <Router history={browserHistory}>
      <Route path='/' component={App}>
         <IndexRoute component={About} />
         <Route path='ocean' component={Ocean} />
         <Route path='post' component={Post}  />
      </Route>
   </Router>
   , document.getElementById('root'));
registerServiceWorker();
