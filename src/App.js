import React, { Suspense, lazy } from "react";
import './index.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar } from "./components/Navbar";
import { Header } from "./components/Header";
import { observer } from "mobx-react";
import { useStores } from "./stores";
import { isHydrated } from 'mobx-persist-store';
import 'bootstrap/dist/css/bootstrap.min.css';
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Records = lazy(() => import('./pages/Records'));
const Help = lazy(() => import('./pages/Help'));
const ModelSettings = lazy(() => import('./pages/ModelSettings'));

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
          <Suspense fallback={<div>Загрузка...</div>}>
          <Route path={'/'} exact component={Home} />
          <Route path={'/help'} component={Help} />
          <Route path={'/records'} component={Records} />
          <Route path={'/about'} component={About} />
          <Route path={'/model_settings'} component={ModelSettings} />
          </Suspense>
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
