import { makeAutoObservable } from "mobx";
import round from 'lodash/round';
import moment from "moment";
import DBStore from "./DBStore";

class FormStore {
  defaultForm = {
    fio: '',
    birthDate: '',
    operationDate: moment().format('YYYY-MM-DD'),
    width: '',
    height: '',
    depth: '',
    volume: '',
    localization: '-1',
    xrayThickness: '',
    massLoss: '',
    mobility: '-1',
    dustiness: '-1',
    muddiness: '-1',
    frequency: '1',
    energy: '0.1'
  };

  defaultOperationData = {
    operationDuration: 0,
    thickness: 0,
    weight: 0,
  }

  formParameters = { ...this.defaultForm };

  operationData = { ...this.defaultOperationData }

  cloneInformation;

  constructor() {
    makeAutoObservable(this);
  }

  get isDisableButton() {
    const { width, height, depth, volume, xrayThickness,
      fio, birthDate, operationDate, massLoss } = this.formParameters;
    const hasVolume = (!!width && !!height && !!depth) || !!volume ;
    const hasMassLoss = !!massLoss;

    return !hasMassLoss || !fio || !birthDate || !operationDate || !xrayThickness || !hasVolume
  }

  updateField(fieldName, value) {
    this.formParameters[fieldName] = value;
  }

  resetForm() {
    this.formParameters = {...this.defaultForm}
    this.operationData = {...this.defaultOperationData}
    this.cloneInformation = null;
  }


  calculateDuration() {
    const { width, height, depth, volume, xrayThickness,
      massLoss, energy, frequency, localization, muddiness, dustiness, mobility, operationDate, birthDate } = this.formParameters;

    let calcThickness = 1.539 + 0.000485 * xrayThickness;
    let calcVolume = volume ? parseFloat(volume) : (width * height * depth)/1000;
    let calcMass = calcThickness * calcVolume;

    const T2 = calcMass / (massLoss * energy * frequency);
    const T1 = 2.008 + 4.7427 * T2 - 0.0211 * localization + 1.6247 * muddiness - 0.0432 * dustiness + 1.1424 * mobility;

    this.operationData = {
      operationDuration: round(T1, 2),
      thickness: round(calcThickness, 2),
      weight: round(calcMass, 3)
    }
    this.cloneInformation = {
      ...this.formParameters,
      operationDate: moment(operationDate, 'YYYY-MM-DD').format('DD.MM.YYYY'),
      birthDate: moment(birthDate, 'YYYY-MM-DD').format('DD.MM.YYYY'),
    }
    DBStore.saveOperation({
      ...this.operationData,
      ...this.cloneInformation
    })
      .then(() => {
        this.formParameters = {...this.defaultForm}
      });
  }

}

export default new FormStore()
