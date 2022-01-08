import React from "react";
import './index.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Records } from "./pages/Records";
import { Navbar } from "./components/Navbar";
import { Header } from "./components/Header";
import { ModelSettings } from "./pages/ModelSettings";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Navbar/>
      <div className="container pt-4">
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/records'} component={Records} />
          <Route path={'/about'} component={About} />
          <Route path={'/model_settings'} component={ModelSettings} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
