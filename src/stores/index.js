import React from "react";
import DBStore from "./DBStore";
import FormStore from "./FormStore";
import CoefficientStore from "./CoefficientStore";

class RootStore {
  constructor() {
    this.dbStore = new DBStore(this);
    this.formStore = new FormStore(this);
    this.coefficientStore = new CoefficientStore(this);
  }
}

const StoresContext = React.createContext(new RootStore());

// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext);
