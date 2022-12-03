import logo from './logo.svg';
import './App.css';

import Router from './routes';
import {
  HashRouter,

} from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
}

export default App;
