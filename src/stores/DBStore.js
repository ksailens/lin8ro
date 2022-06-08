import axios from "axios";
import {makeAutoObservable} from "mobx";

const URL = process.env.REACT_APP_DB_URL;

class DBStore {
  data = null;

  constructor() {
    makeAutoObservable(this);
  }

  /** получение списка операций */
  async getOperationData() {
    return await axios.get(`${URL}/notes.json`);
  }

  /** редактирование записи */
  async editOperation(id, data) {
    return await axios.patch(`${URL}/notes/${id}.json`, data);
  }

  /** создание новой записи */
  async saveOperation(data) {
    await axios.post(`${URL}/notes.json`, data);
  }

  /** запись в стор списка операций */
  setData(data) {
    if (!data) {
      return this.data = [];
    }
    this.data = Object.keys(data).map(key => {
      return {
        id: key,
        ...data[key]
      }
    })
  }

  /** удаление записи */
  deleteOperation(id) {
    axios.delete(`${URL}/notes/${id}.json`)
      .then(() => {
        this.data = this.data.filter(one => one.id !== id);
      });
  }

}

export default DBStore;
