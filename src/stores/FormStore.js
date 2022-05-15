import { makeAutoObservable } from "mobx";
import round from 'lodash/round';
import moment from "moment";
import { Systems } from "../constants";

class FormStore {
  defaultForm = {
    fio: '',
    birthDate: '',
    operationDate: moment().format('YYYY-MM-DD'),
    width: '',
    height: '',
    depth: '',
    volume: '',
    localization: Systems.pelvis,
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
    tLitChistoe: 0,
  }

  formParameters = { ...this.defaultForm };

  operationData = { ...this.defaultOperationData }

  cloneInformation;

  constructor(store) {
    this.store = store;
    makeAutoObservable(this);
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
    const { coefficientStore, dbStore } = this.store;
    const { width, height, depth, volume, xrayThickness,
      massLoss, energy, frequency, localization, muddiness, dustiness, mobility, operationDate, birthDate } = this.formParameters;
    const { currentCoefficients } = coefficientStore;

    let calcThickness = 1.539 + 0.000485 * xrayThickness;
    let calcVolume = volume ? parseFloat(volume) : (width * height * depth * Math.PI * 0.167)/1000;
    let calcMass = calcThickness * calcVolume * 1000;
    const localizationValue = [Systems.ureterMiddle, Systems.ureterTop, Systems.ureterBottom].includes(localization) ? -1 : 1;

    let T1;
    const T2 = calcMass / (massLoss * energy * frequency);
    if ([Systems.ureterMiddle, Systems.ureterTop, Systems.ureterBottom].includes(localization)) {
      const coefficients = currentCoefficients[localization];
      T1 = coefficients.q1 + coefficients.q2 * T2 + coefficients.q3 * localizationValue + coefficients.q4 * muddiness + coefficients.q5 * dustiness + coefficients.q6 * mobility;

    } else {
      const coefficients = currentCoefficients[localization];
      T1 = coefficients.q1 + coefficients.q2 * T2 + coefficients.q3 * localizationValue + coefficients.q4 * muddiness + coefficients.q5 * dustiness;
    }

    this.operationData = {
      operationDuration: T1 > 0 ? round(T1, 1) : 6,
      thickness: round(calcThickness, 2),
      weight: round(calcMass, 2),
      tLitChistoe: round(T2, 1)
    }
    this.cloneInformation = {
      ...this.formParameters,
      operationDate: moment(operationDate, 'YYYY-MM-DD').format('DD.MM.YYYY'),
      birthDate: moment(birthDate, 'YYYY-MM-DD').format('DD.MM.YYYY'),
    }
    dbStore.saveOperation({
      ...this.operationData,
      ...this.cloneInformation
    })
      .then(() => {
        this.formParameters = {...this.defaultForm}
      });
  }

}

export default FormStore;
