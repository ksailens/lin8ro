import React, {useEffect, useState, useCallback} from "react";
import { useStores } from "../stores";
import {Dustiness, Localization, Mobility, Muddiness} from "../constants";
import {observer} from "mobx-react";
import { OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap';
import round from 'lodash/round';
import { NumberInput } from "../ui/NumberInput";
import moment from "moment";
import 'moment-duration-format';

const DEFAULT_TIME = { m: '', s: '' };

export const Records = observer(() => {
  const { dbStore } = useStores();
  const { data } = dbStore;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [realOperationDuration, setRealOperationDuration] = useState(DEFAULT_TIME);

  const getData = useCallback(() => {
    setPending(true);
    setError(false);
    dbStore.getOperationData()
      .then(data => {
        dbStore.setData(data.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setPending(false);
      })
  }, [dbStore]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleGetData = () => {
    getData();
  }

  const handleDeleteNote = id => {
    dbStore.deleteOperation(id);
  }

  const secondsToTime = seconds => moment.duration(seconds, 'seconds').format('m [мин] s [сек]');

  const handleOpenModal = id => {
    const one = data.find(one => one.id === id);
    if (one && one.realOperationDuration) {
      setRealOperationDuration({
        m: moment.duration(one.realOperationDuration, 'seconds').format('m', {
          trunc: true
        }),
        s: moment.utc(one.realOperationDuration*1000).seconds(),
      })
    }
    setId(id);
    setShow(true);
  }

  const handleCloseModal = () => {
    setId('');
    setRealOperationDuration(DEFAULT_TIME);
    setShow(false);
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
          Отсутствует связь с базой данных. Проверьте подключение к интернету
        </div>
      );
    }
    return null;
  }

  const handleFieldChange = (label, val) => {
    setRealOperationDuration(prevState => ({
      ...prevState,
      [label]: val
    }));
  }

  const handleSave = id => {
    handleCloseModal();
    const seconds = ((realOperationDuration.m || 0) * 60) + (realOperationDuration.s ? parseInt(realOperationDuration.s, 10) : 0);
    dbStore.editOperation(id, { realOperationDuration: seconds })
      .finally(() => {
        handleGetData()
      })
  }

  const calculateAccuracy = (fake, real) => {
    if (real) {
      return round(Math.abs(fake - real) / real * 100, 2);
    }
    return '';
  }

  const renderTable = () => {
    if (data && data.length) {
      return (
        <div className='table-responsive'>
          <table className="table table-sm table-bordered align-middle">
            <thead>
            <tr className='text-center'>
              <th rowSpan='2'> </th>
              <th colSpan='3'>Пациент</th>
              <th colSpan='10'>Конкремент</th>
              <th colSpan='3'>Параметры ФКЛТ</th>
              <th rowSpan='2'>Фактическое время литотрипсии</th>
              <th rowSpan='2'>Погрешность, %</th>
              <th rowSpan='2'> </th>
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
              <th>Масса, мг</th>
              <th>Плотность, г/см<sup><small>3</small></sup></th>
              <th>Подвижность</th>
              <th>Пыльность</th>
              <th>Видимость</th>
              <th>Частота импульсов, Гц</th>
              <th>Энергия импульсов, Дж</th>
              <th>Длительность литотрипсии</th>
            </tr>
            </thead>
            <tbody>
            {data.map((one, index) => (
              <tr key={one.id}>
                <td>{ index+1 }</td>
                <td>{ one.fio }</td>
                <td>{ one.birthDate }</td>
                <td>{ one.operationDate }</td>
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
                <td>{ secondsToTime(one.operationDuration) }</td>
                <td>{ one.realOperationDuration ? secondsToTime(one.realOperationDuration) : '' }</td>
                <td>{ calculateAccuracy(one.operationDuration, one.realOperationDuration) }</td>
                <td>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Добавить фактическое время проведения операции и рассчитать погрешность
                      </Tooltip>
                    }>
                    <button
                      onClick={() => handleOpenModal(one.id)}
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal">
                      +
                    </button>
                  </OverlayTrigger>

                </td>
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

    if (!error && data && !data.length) {
      return (
        <div className="alert alert-danger" role="alert">
          Данные отсутствуют
        </div>
      )
    }
    return null;
  }

  const renderEditModal = () => {
    return (
      <Modal
        backdrop="static"
        show={show}
        centered
        size="lg"
        onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Добавление фактического времени операции</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div className="input-group">
              <NumberInput
                type='text'
                label={'минуты'}
                value={realOperationDuration.m}
                isGrouped={true}
                onChange={val => handleFieldChange('m', val)}
              />
              <NumberInput
                type='text'
                label={'секунды'}
                value={realOperationDuration.s}
                isGrouped={true}
                maxValue={59}
                onChange={val => handleFieldChange('s', val)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Закрыть</Button>
          <Button disabled={!realOperationDuration.h && !realOperationDuration.m && !realOperationDuration.s} variant="primary" onClick={() => handleSave(id)}>Сохранить</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <div className="p-3 mb-4 bg-light rounded-3">
      <div className="container">
        <h1 className="display-5 text-center mb-3">Сохраненные данные по операциям</h1>
        { renderLoader() }
        { renderAlert() }
        { renderTable() }
        { show && renderEditModal() }
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
