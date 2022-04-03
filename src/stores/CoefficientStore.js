import { makeAutoObservable } from "mobx";
import { makePersistable, isPersisting, isHydrated, stopPersisting } from 'mobx-persist-store';
import forEach from "lodash/forEach";
import cloneDeep from "lodash/cloneDeep";
import { Systems } from "../constants";

const DEFAULT_COEFFICIENTS = {
  [Systems.calyxTop]: {
    q1: 6.7371,
    q2: 2.2448,
    q3: -1.355,
    q4: 2.0653,
    q5: 1.3168
  },
  [Systems.calyxMidBottom]: {
    q1: 6.7371,
    q2: 2.2448,
    q3: -1.355,
    q4: 2.0653,
    q5: 1.3168
  },
  [Systems.pelvis]: {
    q1: 6.7371,
    q2: 2.2448,
    q3: -1.355,
    q4: 2.0653,
    q5: 1.3168
  },
  [Systems.ureterTop]: {
    q1: 2.008,
    q2: 4.7427,
    q3: -0.0211,
    q4: 1.6247,
    q5: -0.0432,
    q6: 1.1424,
  },
  [Systems.ureterBottom]: {
    q1: 2.008,
    q2: 4.7427,
    q3: -0.0211,
    q4: 1.6247,
    q5: -0.0432,
    q6: 1.1424,
  },
  [Systems.ureterMiddle]: {
    q1: 2.008,
    q2: 4.7427,
    q3: -0.0211,
    q4: 1.6247,
    q5: -0.0432,
    q6: 1.1424,
  }
}

class CoefficientStore {
  currentCoefficients = cloneDeep(DEFAULT_COEFFICIENTS);

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
    const equals = {};
    forEach(Systems, one => {
      equals.one = JSON.stringify(DEFAULT_COEFFICIENTS[one]) !== JSON.stringify(this.currentCoefficients[one])
    })
    return equals;
  }

  stopStore() {
    stopPersisting(this);
  }

  setCurrentCoefficients(data, type) {

    const copyObj = {...data};
    forEach(copyObj, (val, key) => {
      let newVal = parseFloat(val);
      if (newVal === -0 || Number.isNaN(newVal)) {
        newVal = 0;
      }
      copyObj[key] = newVal;
    });

    this.previousCoefficients = cloneDeep(this.currentCoefficients)
    this.currentCoefficients[type] = copyObj;
  }

  resetCurrentCoefficients(type) {
    this.currentCoefficients[type] = { ...DEFAULT_COEFFICIENTS[type] };
  }

  resetPreviousCoefficients(type) {
    this.previousCoefficients[type] = {};
  }

}

export default CoefficientStore;
