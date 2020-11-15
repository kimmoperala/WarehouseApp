import React from 'react';
import Navigation from './Components/navigation';
import Home from './Components/home';
import Jackets from './Components/jackets';
import Shirts from './Components/shirts';
import Accessories from './Components/accessories';
import {BrowserRouter as Router , Switch , Route } from 'react-router-dom';

function App() {
  return (
<Router>
      <div>
        <Navigation/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/jackets" component={Jackets}/>
          <Route path="/shirts" component={Shirts}/>
          <Route path="/accessories" component={Accessories}/>
        </Switch>
      </div>
</Router>
  );
}

export default App;
