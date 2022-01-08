import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';

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

  setCurrentCoefficients(data) {
    this.previousCoefficients = { ...this.currentCoefficients };
    this.currentCoefficients = data;
  }

  resetCurrentCoefficients() {
    this.currentCoefficients = { ...DEFAULT_COEFFICIENTS };
  }

}

export default CoefficientStore;
