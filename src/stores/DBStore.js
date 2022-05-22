import axios from "axios";
import {makeAutoObservable} from "mobx";

const URL = process.env.REACT_APP_DB_URL;

class DBStore {
  data = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getOperationData() {
    return await axios.get(`${URL}/notes.json`);
  }

  async editOperation(id, data) {
    return await axios.patch(`${URL}/notes/${id}.json`, data);
  }

  async saveOperation(data) {
    await axios.post(`${URL}/notes.json`, data);
  }

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

  deleteOperation(id) {
    axios.delete(`${URL}/notes/${id}.json`)
      .then(() => {
        this.data = this.data.filter(one => one.id !== id);
      });
  }

}

export default DBStore;
