import React from "react";
import './index.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Navbar} from "./components/Navbar";
import {Header} from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Navbar/>
      <div className="container pt-4">
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/about'} component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
