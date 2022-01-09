import { makeAutoObservable } from "mobx";
import { makePersistable, isPersisting, isHydrated, stopPersisting } from 'mobx-persist-store';
import forEach from "lodash/forEach";

const DEFAULT_COEFFICIENTS = {
  q1: 2.008,
  q2: 4.7427,
  q3: -0.0211,
  q4: 1.6247,
  q5: -0.0432,
  q6: 1.1424,
}

class CoefficientStore {
  currentCoefficients = { ...DEFAULT_COEFFICIENTS };

  previousCoefficients = {};

  constructor() {
    makeAutoObservable(this);
    makePersistable(this,
      { name: 'lt_model_coeff',
        properties: ['currentCoefficients', 'previousCoefficients'],
        storage: window.localStorage
      }
    );
  }

  get isHydrated() {
    return isHydrated(this);
  }

  get isPersisting() {
    return isPersisting(this);
  }

  get isCoefficientsChanged() {
    return JSON.stringify(DEFAULT_COEFFICIENTS) !== JSON.stringify(this.currentCoefficients)
  }

  stopStore() {
    stopPersisting(this);
  }

  setCurrentCoefficients(data) {

    const copyObj = {...data};
    forEach(copyObj, (val, key) => {
      let newVal = parseFloat(val);
      if (newVal === -0 || Number.isNaN(newVal)) {
        newVal = 0;
      }
      copyObj[key] = newVal;
    });

    this.previousCoefficients = { ...this.currentCoefficients };
    this.currentCoefficients = copyObj;
  }

  resetCurrentCoefficients() {
    this.currentCoefficients = { ...DEFAULT_COEFFICIENTS };
  }

  resetPreviousCoefficients() {
    this.previousCoefficients = {};
  }

}

export default CoefficientStore;
