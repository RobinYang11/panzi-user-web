import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import{HashRouter as Router} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Main/>
      </div>
    </Router>
  );
}

export default App;
