import {BrowserRouter as Router,
        Routes,
        Route} from 'react-router-dom';

import Nav from './components/nav.components/nav.component.js';
import Table from './components/table.components/table.component.js';

import './App.css';

const Home = () => {
  return(
  <div>
    <Nav />
    <Table />
  </div>);
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
