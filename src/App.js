import React from "react";
import './index.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Records } from "./pages/Records";
import { Help } from "./pages/Help";
import { Navbar } from "./components/Navbar";
import { Header } from "./components/Header";
import { ModelSettings } from "./pages/ModelSettings";
import { observer } from "mobx-react";
import { useStores } from "./stores";
import { isHydrated } from 'mobx-persist-store';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = observer(() => {
  const { coefficientStore } = useStores();

  const allStoreAreSynchronized = () => {
    return Object.values({ coefficientStore }).every((store => {
      return isHydrated(store)
    }))
  }

  const renderContent = () => {
    if (!allStoreAreSynchronized()) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      );
    }
    return (
      <Switch>
        <Route path={'/'} exact component={Home} />
        <Route path={'/help'} exact component={Help} />
        <Route path={'/records'} component={Records} />
        <Route path={'/about'} component={About} />
        <Route path={'/model_settings'} component={ModelSettings} />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Header/>
      <Navbar/>
      <div className="container pt-4">
        { renderContent() }
      </div>
    </BrowserRouter>
  );
});

export default App;
