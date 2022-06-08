import { makeAutoObservable } from "mobx";
import round from 'lodash/round';
import moment from "moment";
import { Systems } from "../constants";

class FormStore {
  // значения формы по умолчанию
  defaultForm = {
    fio: '', // Ф.И.О
    birthDate: '', // дата рождения
    operationDate: moment().format('YYYY-MM-DD'), // дата проведения операции
    width: '', // длина конкремента
    height: '', // ширина конкремента
    depth: '', // толщина конкремента
    volume: '', // объем конкремента
    localization: Systems.pelvis, // расположение конкремента
    xrayThickness: '', // рентгенологическая плотность
    massLoss: '', // удельная величина потери массы камня
    mobility: '-1', // подвижность конкремента
    dustiness: '-1',// пыльность конкремента
    muddiness: '-1',// видимость конкремента
    frequency: '1',// частота импульсов
    energy: '0.1'// энергия импульсов
  };

  defaultOperationData = {
    operationDuration: 0, // длительность операции
    thickness: 0, // плотность конкремента
    weight: 0, // вес конкремента
    tLitChistoe: 0, // чистое время литотрипсии
  }

  formParameters = { ...this.defaultForm };

  operationData = { ...this.defaultOperationData }

  cloneInformation;

  constructor(store) {
    this.store = store;
    makeAutoObservable(this);
  }

  /**
   * сохранение значения поля формы
   * */
  updateField(fieldName, value) {
    this.formParameters[fieldName] = value;
  }

  /**
   * сброс формы
   * */
  resetForm() {
    this.formParameters = {...this.defaultForm}
    this.operationData = {...this.defaultOperationData}
    this.cloneInformation = null;
  }

  /**
   * расчет параметров операции
   * */
  calculateDuration() {
    const { coefficientStore, dbStore } = this.store;
    const { width, height, depth, volume, xrayThickness,
      massLoss, energy, frequency, localization, muddiness, dustiness, mobility, operationDate, birthDate } = this.formParameters;
    const { currentCoefficients } = coefficientStore;

    let calcThickness = 1.539 + 0.000485 * xrayThickness; // расчет плотности конкремента
    let calcVolume = volume ? parseFloat(volume) : (width * height * depth * Math.PI * 0.167)/1000; // расчет объема конкремента
    let calcMass = calcThickness * calcVolume * 1000; // расчет массы конкремента
    const localizationValue = [Systems.ureterMiddle,  Systems.calyxMidBottom, Systems.calyxTop].includes(localization) ? -1 : 1;

    let T1;
    const T2 = calcMass / (massLoss * energy * frequency); // "чистое" время длительности литотрипсии
    const coefficients = currentCoefficients[localization]; // выбор коэффициентов модели, в зависимости от локализации конкремента (хранятся в CoefficientStore.js)
    if ([Systems.ureterMiddle, Systems.ureterTop, Systems.ureterBottom].includes(localization)) {
      // расчет длительности литотрипсии, если конкремент находится в мочеточнике
      T1 = coefficients.q1 + coefficients.q2 * T2 + coefficients.q3 * localizationValue + coefficients.q4 * muddiness + coefficients.q5 * dustiness + coefficients.q6 * mobility;
    } else {
      // расчет длительности литотрипсии, если конкремент находится в почке
      T1 = coefficients.q1 + coefficients.q2 * T2 + coefficients.q3 * localizationValue + coefficients.q4 * muddiness + coefficients.q5 * dustiness;
    }

    this.operationData = {
      // округляем результаты до двух знаков после запятой
      operationDuration: T1 > 0 ? round(T1, 2) : 6,
      thickness: round(calcThickness, 2),
      weight: round(calcMass, 2),
      tLitChistoe: round(T2, 2)
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
