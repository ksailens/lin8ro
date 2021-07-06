import React, {useEffect, useState} from "react";
import DBStore from "../stores/DBStore";
import moment from "moment";
import {Dustiness, Localization, Mobility, Muddiness} from "../constants";
import {observer} from "mobx-react";

export const Records = observer(() => {
  const { data } = DBStore;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    setPending(true);
    setError(false);
    DBStore.getOperationData()
      .then(data => {
        DBStore.setData(data.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setPending(false);
      })
  }

  const handleGetData = () => {
    getData();
  }

  const handleDeleteNote = id => {
    DBStore.deleteOperation(id);
  }

  const renderLoader = () => {
    if (pending) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      );
    }
    return null;
  }

  const renderAlert = () => {
    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          Упс! Что-то пошло не так...
        </div>
      );
    }
    return null;
  }

  const renderTable = () => {
    if (data) {
      return (
        <div className='table-responsive'>
          <table className="table table-sm table-bordered align-middle">
            <thead>
              <tr className='text-center'>
                <th rowSpan='2'> </th>
                <th colSpan='3'>Пациент</th>
                <th colSpan='10'>Конкремент</th>
                <th colSpan='3'>Параметры ФКЛТ</th>
                <th rowSpan='2'> </th>
              </tr>
              <tr>
                <th>Ф.И.О.</th>
                <th>Дата рождения</th>
                <th>Дата операции</th>
                <th>Объем, см<sup><small>3</small></sup></th>
                <th>Размер, мм</th>
                <th>Локализация</th>
                <th>Рентгенологическая плотность, HU</th>
                <th>γ, мг/Дж</th>
                <th>Масса, г</th>
                <th>Плотность, г/см<sup><small>3</small></sup></th>
                <th>Подвижность</th>
                <th>Пыльность</th>
                <th>Видимость</th>
                <th>Частота импульсов, Гц</th>
                <th>Энергия импульсов, Дж</th>
                <th>Длительность операции, мин.</th>
              </tr>
            </thead>
            <tbody>
              {data.map((one, index) => (
                <tr key={one.id}>
                  <td>{ index+1 }</td>
                  <td>{ one.fio }</td>
                  <td>{ moment(one.birthDate, 'YYYY-MM-DD').format('DD.MM.YYYY') }</td>
                  <td>{ moment(one.operationDate, 'YYYY-MM-DD').format('DD.MM.YYYY') }</td>
                  <td>{ one.volume || '-' }</td>
                  <td>{ one.width && one.height && one.depth ? `${one.width}x${one.height}x${one.depth}` : '-' }</td>
                  <td>{ Localization[one.localization] }</td>
                  <td>{ one.xrayThickness }</td>
                  <td>{ one.massLoss }</td>
                  <td>{ one.weight }</td>
                  <td>{ one.thickness }</td>
                  <td>{ Mobility[one.mobility] }</td>
                  <td>{ Dustiness[one.dustiness] }</td>
                  <td>{ Muddiness[one.muddiness] }</td>
                  <td>{ one.frequency }</td>
                  <td>{ one.energy }</td>
                  <td>{ one.operationDuration }</td>
                  <td>
                    <button
                      type="button"
                      className='btn btn-outline-danger btn-sm'
                      onClick={() => handleDeleteNote(one.id)}
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="p-3 mb-4 bg-light rounded-3">
      <div className="container">
        <h1 className="display-5 text-center mb-3">Сохраненные данные по операциям</h1>
        { renderLoader() }
        { renderAlert() }
        { renderTable() }
        <div className="mt-3">
          <button
            className="btn btn-primary"
            onClick={handleGetData}
          >
            Получить данные...
          </button>
        </div>
      </div>
    </div>
  )
});