import React from 'react';
import './assets/styles/main.scss'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { routes } from './routes'
import { Header } from './cmps/Header';

function App() {
  return (
    <div className="app">
           <Router>
      <Header/>
      <main className="full">
        <Switch>
          {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
        </Switch>
      </main>
      {/* <Footer/> */}
      </Router>
    </div>
  );
}

export default App;
