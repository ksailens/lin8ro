import { makeAutoObservable } from "mobx";
import round from 'lodash/round';

class FormStore {
  defaultStore = {
    width: '',
    height: '',
    depth: '',
    volume: '',
    weight: '',
    localization: '-1',
    xrayThickness: '',
    thickness: '',
    massLoss: '',
    mobility: '-1',
    dustiness: '-1',
    muddiness: '-1',
    frequency: '1',
    energy: '0.1'
  };

  formParameters = { ...this.defaultStore };

  operationDuration = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get isDisableButton() {
    const { width, height, depth, volume, weight, xrayThickness,
      thickness, massLoss } = this.formParameters;
    const hasVolume = (!!width && !!height && !!depth) || !!volume ;
    const hasThickness = !!xrayThickness || !!thickness;
    const hasMassLoss = !!massLoss;
    const hasWeight = !!weight || (hasVolume && hasThickness);

    return !hasMassLoss || !hasWeight;
  }

  updateField(fieldName, value) {
    this.formParameters[fieldName] = value;
  }

  resetForm() {
    this.formParameters = { ...this.defaultStore }
    this.operationDuration = 0;
  }

  calculateDuration() {
    const { width, height, depth, volume, weight, xrayThickness,
      thickness, massLoss, energy, frequency, localization, muddiness, dustiness, mobility } = this.formParameters;
    let calcMass = 0;
    let calcVolume = 0;
    let calcThickness = 0;

    if (weight) {
      calcMass = parseFloat(weight);
    } else {
      calcThickness = xrayThickness ? parseFloat(xrayThickness) : parseFloat(thickness);
      calcVolume = volume ? parseFloat(volume) : (width * height * depth);
      calcMass = calcThickness * calcVolume;
    }

    const T2 = calcMass / (massLoss * energy * frequency);
    const T1 = 2.008 + 4.7427 * T2 - 0.0211 * localization + 1.6247 * muddiness - 0.0432 * dustiness + 1.1424 * mobility;

    this.operationDuration = round(T1, 2);
  }

}

export default new FormStore()
