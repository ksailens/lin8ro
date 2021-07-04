import {makeAutoObservable} from "mobx";

class FormStore {
  formParameters = {
    width: '',
    height: '',
    depth: '',
    volume: '',
    weight: '',
    localization: -1,
    xrayThickness: '',
    thickness: '',
    massLoss: '',
    mobility: -1,
    dustiness: -1,
    muddiness: -1,
    frequency: 1,
    energy: 0.1
  };

  constructor() {
    makeAutoObservable(this);
  }

  // get count() {
  //   return this.count;
  // }

}

export default new FormStore()
