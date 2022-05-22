import React, { useState, useEffect, useRef } from "react";
import { NumberInput } from "../ui/NumberInput";
import {Select} from "../ui/Select";
import {RadioGroup} from "../ui/RadioGroup";
import {observer} from "mobx-react";
import round from 'lodash/round';
import {Results} from "../components/Results";
import { useHistory } from 'react-router-dom';
import { useStores } from "../stores";
import { Systems } from "../constants";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

export const canUseDom = (() => !!(
  (typeof window !== 'undefined'
    && window.document && window.document.createElement)
))() || false;

export const Home = observer(() => {
  const { formStore } = useStores();
  const { formParameters } = formStore;
  const [showModal, setShowModal] = useState(false);
  const resetButton = useRef(null);
  const history = useHistory();
  const { width, height, depth, volume, weight, localization, xrayThickness,
    thickness, massLoss, mobility, dustiness, muddiness, frequency,
    energy, fio, birthDate, operationDate } = formParameters;

  useEffect(() => {
    if (canUseDom) {
      window.document.addEventListener('mousedown', handleDocumentMouseDown);
    }

    return () => {
      if (canUseDom) {
        window.document.removeEventListener('mousedown', handleDocumentMouseDown);
      }
    };
  }, []);

  useEffect(() => {
    if (canUseDom) {
      window.document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      if (canUseDom) {
        window.document.removeEventListener('keydown', handleKeyPress);
      }
    };
  }, []);


  const validate = () => {
    const forms = document.querySelectorAll('.needs-validation');
    // Зацикливайтесь на них и предотвращайте отправку
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })

    const invalidElems = document.querySelectorAll('.form-control:invalid');
    if (invalidElems && invalidElems[0]) {
      const yOffset = -30;
      const y = invalidElems[0].getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }

  const resetValidate = () => {
    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.classList.remove('was-validated');
      })
  }

  const handleSubmit = () => {
    validate();
  }

  const handleKeyPress = ev => {
    if (ev.keyCode === 9) {
      const errors = document.querySelectorAll('.is-invalid');
      if (errors.length) {
        setShowModal(true);
      }
    }
  }

  const handleResetForm = ev => {
    ev.preventDefault();
    Array.from(document.querySelectorAll('.is-invalid')).forEach((el) => el.classList.remove('is-invalid'));
    formStore.resetForm();
    resetValidate();
  }

  const handleSubmitForm = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    resetValidate();
    formStore.calculateDuration();
  }

  const handleCloseModal = () => {
    const errors = document.querySelectorAll('.is-invalid');
    setShowModal(false);
    if (errors.length) {
      errors[0].focus();
    }
  }

  const handleDocumentMouseDown = (ev) => {
    if (resetButton.current) {
      if (!resetButton.current.contains(ev.target)) {
        const errors = document.querySelectorAll('.is-invalid');
        if (errors.length) {
          setShowModal(true);
        }
      }
    }
  }

  const validateField = (fieldName) => {
    const input = document.getElementById(fieldName);
    if (input) {
      const validityState = input.validity;

      if (validityState.valueMissing) {
        input.classList.add('is-invalid');
      } else if (validityState.rangeUnderflow) {
        input.classList.add('is-invalid');
      } else if (validityState.badInput) {
        input.classList.add('is-invalid');
      } else if (validityState.rangeOverflow) {
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
      }
    }
  }

  const handleFieldChange = (fieldName, value) => {
    validateField(fieldName, value);
    formStore.updateField(fieldName, value)
  }

  const handleGoToSettings = () => history.push('/model_settings');

  const renderIcon = () => (
    <div className='questionIcon'>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
           className="bi bi-question-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path
          d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
      </svg>
    </div>
  );

  const renderEditModal = () => {
    return (
      <Modal
        backdrop="static"
        show={showModal}
        centered
        size="lg">
        <Modal.Header>
          <Modal.Title>Некорректные данные</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-danger" role="alert">
            Введите корректные данные, воспользовавшись подсказкой под полем!
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>ОК</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const isInKidney = [Systems.pelvis, Systems.calyxTop, Systems.calyxMidBottom].includes(localization);

  const renderWeightVolumeDimensions = () => {
    return (
      <div className="d-flex justify-content-between flex-column">
        <div className="mb-3">
          <label className="form-label">
            <div className='d-flex flex-row align-items-center'>
              Размер, мм
              <OverlayTrigger
                overlay={
                  <Tooltip>
                    максимальные размеры
                    {' '}
                    {isInKidney ? '70x35x35 мм' : '20x10x10 мм'}
                  </Tooltip>
                }>
                {renderIcon()}
              </OverlayTrigger>
            </div>
          </label>
          <div className="d-flex justify-content-between flex-md-row flex-column">
            <div className="mb-3 dimension">
              <NumberInput
                inputProps={
                  {
                    disabled: !!volume || !!weight,
                    max: isInKidney ? 70 : 20,
                    required: true,
                    min: 0,
                    id: 'width',
                  }
                }
                label={'длина'}
                value={width}
                onChange={val => handleFieldChange('width', val)}
                errorText={width && width > (isInKidney ? 70 : 20) ? `Длина не более ${isInKidney ? 70 : 20}мм` : 'Введите положительное число'}
              />
            </div>
            <div className="mb-3 dimension">
              <NumberInput
                inputProps={
                  {
                    disabled: !!volume || !!weight,
                    max: isInKidney ? 35 : 10,
                    required: true,
                    min: 0,
                    id: 'height',
                  }
                }
                label={'ширина'}
                value={height}
                onChange={val => handleFieldChange('height', val)}
                errorText={height && height > (isInKidney ? 35 : 10) ? `Ширина не более ${isInKidney ? 35 : 10}мм` : 'Введите положительное число'}
              />
            </div>
            <div className="mb-3 dimension">
              <NumberInput
                inputProps={
                  {
                    disabled: !!volume || !!weight,
                    max: isInKidney ? 35 : 10,
                    required: true,
                    min: 0,
                    id: 'depth',
                  }
                }
                label={'толщина'}
                value={depth}
                onChange={val => handleFieldChange('depth', val)}
                errorText={depth && depth > (isInKidney ? 35 : 10) ? `Толщина не более ${isInKidney ? 35 : 10}мм` : 'Введите положительное число'}
              />
            </div>
          </div>
        </div>
        <div className='px-2 text-uppercase align-self-center'>
          или
        </div>
        <div className="mb-3">
          <NumberInput
            inputProps={
              {
                disabled: (!!width && !!height && !!depth) || !!weight,
                max: 20,
                required: true,
                min: 0,
                id: 'volume',
              }
            }
            label={
              <div className='d-flex flex-row align-items-center'>
                Объем, см<sup><small>3</small></sup>
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      до 20см<sup><small>3</small></sup>
                    </Tooltip>
                  }>
                  {renderIcon()}
                </OverlayTrigger>
              </div>
            }
            value={volume}
            onChange={val => handleFieldChange('volume', val)}
            errorText={volume && volume > 20 ? <span>Объем камня не должен превышать 20см<sup><small>3</small></sup></span> : "Введите положительный объем или укажите размеры конкремента"}
          />
        </div>
      </div>
    );
  }

  const renderLocalizationSelect = () => {
    const items = [
      { key: 'Лоханка', value: Systems.pelvis },
      { key: 'Верхняя чашечка', value: Systems.calyxTop },
      { key: 'Нижняя или средняя чашечка', value: Systems.calyxMidBottom },
      { key: 'Верхняя треть мочеточника', value: Systems.ureterTop },
      { key: 'Средняя треть мочеточника', value: Systems.ureterMiddle },
      { key: 'Нижняя треть мочеточника', value: Systems.ureterBottom },
    ];

    return (
      <div className="mb-3">
        <Select
          value={localization}
          label={'Локализация'}
          items={items}
          onChange={val => handleFieldChange('localization', val)}
        />
      </div>
    )
  }

  const renderThickness = () => (
    <>
      <div className="mb-3">
        <NumberInput
          disabled={!!weight || !!thickness}
          value={xrayThickness}
          inputProps={
            {
              id: 'xrayThickness',
              disabled: !!weight || !!thickness,
              max: 3000,
              min: 0,
              required: true,
            }
          }
          label={
            <div className='d-flex flex-row align-items-center'>
              Рентгенологическая плотность, HU
              <OverlayTrigger
                overlay={
                  <Tooltip>
                    до 3000 HU
                  </Tooltip>
                }>
                {renderIcon()}
              </OverlayTrigger>
            </div>
          }
          onChange={val => handleFieldChange('xrayThickness', val)}
          errorText={xrayThickness > 3000 ? 'Рентгенологическая плотность не может быть более 3000 HU' : 'Обязательное поле. Не может быть отрицательным и нулем'}
        />
      </div>
    </>
  );

  const renderEnergySelect = () => {
    const items = [];
    for (let i = 0.1; i <= 6; i=round(i+0.1, 1)) {
      items.push({
        key: i.toString(10),
        value: i.toString(10)
      })
    }
    return (
      <div className="mb-3">
        <Select
          value={energy}
          label={'Энергия импульсов, Дж'}
          items={items}
          onChange={val => handleFieldChange('energy', val)}
        />
      </div>
    );
  }

  const renderFrequencySelect = () => {
    const items = [];
    for (let i = 1; i <= 20; i++) {
      items.push({
        key: i.toString(10),
        value: i.toString(10)
      })
    }

    return (
      <div className="mb-3">
        <Select
          value={frequency}
          name={'Frequency'}
          label={'Частота импульсов, Гц'}
          items={items}
          onChange={val => handleFieldChange('frequency', val)}
        />
      </div>
    );
  }

  const renderMuddinessRadio = () => {
    const items = [
      { key: 'нет замутнения', value: '-1' },
      { key: 'есть замутнение', value: '1' },
    ];

    return (
      <div className="mb-3">
        <RadioGroup
          value={muddiness}
          name={'Muddiness'}
          label='Видимость'
          items={items}
          onSelect={val => handleFieldChange('muddiness', val)}
        />
      </div>
    );
  }

  const renderDustinessRadio = () => {
    const items = [
      { key: 'непыльный', value: '-1' },
      { key: 'пыльный', value: '1' },
    ];
    return (
      <div className="mb-3">
        <RadioGroup
          value={dustiness}
          name={'Dustiness'}
          label='Пыльность камня'
          items={items}
          onSelect={val => handleFieldChange('dustiness', val)}
        />
      </div>
    );
  }

  const renderMobilityRadio = () => {
    const items = [
      { key: 'нет', value: '-1' },
      { key: 'есть', value: '1' },
    ];
    return (
      <div className="mb-3">
        <RadioGroup
          value={mobility}
          name={'Mobility'}
          label='Подвижность камня'
          items={items}
          onSelect={val => handleFieldChange('mobility', val)}
        />
      </div>
    );
  }

  const renderResult = () => {
    return (
      <ul className="list-group rightBlock mt-md-0 mt-3">
        <li className="list-group-item">
          <div>
            <label className="fw-bold fs-4 form-label">Результаты вычислений</label>
          </div>
          <Results />
        </li>
      </ul>
    );
  }

  const patientData = () => {
    return (
      <div>
        <div className='mb-3'>
          <label className="form-label">
            Ф.И.О.
          </label>
          <input
            id="fio"
            type="text"
            className="form-control text-center"
            onChange={ev => handleFieldChange('fio', ev.target.value)}
            value={fio}
            required
          />
          <div className="invalid-feedback">
            Пожалуйста, введите ФИО пациента
          </div>
        </div>
        <div>
          <label className="form-label">
            Дата рождения
          </label>
          <input
            id="birthDate"
            type="date"
            name='birthDate'
            className="form-control"
            value={birthDate}
            onChange={ev => handleFieldChange('birthDate', ev.target.value)}
            required
          />
          <div className="invalid-feedback">
            Пожалуйста, введите дату рождения пациента
          </div>
        </div>
      </div>
    )
  }

  const operationParameters = () => {
    return (
      <>
        { renderFrequencySelect() }
        { renderEnergySelect() }
        <div>
          <label className="form-label">
            Дата проведения
          </label>
          <input
            id="operationDate"
            type="date"
            name='operationDate'
            className="form-control"
            value={operationDate}
            onChange={ev => handleFieldChange('operationDate', ev.target.value)}
            required
          />
          <div className="invalid-feedback">
            Пожалуйста, введите дату проведения операции
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='MainForm d-flex border rounded bg-light justify-content-between flex-column'>
      <form className='leftBlock pb-3 needs-validation' onSubmit={handleSubmitForm} noValidate>
        <ul className="list-group">
          <li className="list-group-item pb-3">
            <div>
              <label className="fw-bold fs-4 form-label">Данные пациента</label>
            </div>
            { patientData() }
          </li>
          <li className="list-group-item">
            <div>
              <label className="fw-bold fs-4 form-label">Характеристики конкремента</label>
            </div>
            { renderWeightVolumeDimensions() }
            { renderLocalizationSelect() }
            { renderThickness() }
            <div className="mb-3">
              <NumberInput
                inputProps={
                  {
                    min: 0.2,
                    max: 0.55,
                    step: 0.00001,
                    required: true,
                    id: "massLoss",
                  }
                }
                value={massLoss}
                onChange={val => handleFieldChange('massLoss', val)}
                label={
                  <div className='d-flex flex-row align-items-center'>
                    Удельная величина потери массы камня на 1 джоуль – γ, мг/Дж
                    <OverlayTrigger
                      overlay={
                        <Tooltip>
                          от 0.2 до 0.55 мг/Дж
                        </Tooltip>
                      }>
                      {renderIcon()}
                    </OverlayTrigger>
                  </div>
                }
                errorText={massLoss && massLoss < 0.2 ? 'Удельная величина потери массы камня не может быть менее 0.2 мг/Дж' :
                  massLoss && massLoss > 0.55 ? 'Удельная величина потери массы камня не может быть более 0.55 мг/Дж' :
                    'Обязательное поле'}
              />
            </div>
          </li>
          <li className="list-group-item">
            <div>
              <label className="fw-bold fs-4 form-label">Особенности операции</label>
            </div>
            <div className="d-flex justify-content-between flex-md-row flex-column">
              { renderMobilityRadio() }
              { renderDustinessRadio() }
              { renderMuddinessRadio() }
            </div>
          </li>
          <li className="list-group-item">
            <div>
              <label className="fw-bold fs-4 form-label">Параметры литотриптера</label>
            </div>
            { operationParameters() }
          </li>
        </ul>
        <div className="mt-3">
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Рассчитать
          </button>
          <button
            ref={resetButton}
            type="reset"
            onClick={handleResetForm}
            className="btn btn-primary ms-2"
          >
            Очистить форму
          </button>
          <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={handleGoToSettings}
          >
            Настройка модели
          </button>
        </div>
      </form>
      { renderResult() }
      { showModal && renderEditModal() }
    </div>
  )
});
