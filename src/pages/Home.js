import React from "react";
import { NumberInput } from "../ui/NumberInput";
import {Select} from "../ui/Select";
import {RadioGroup} from "../ui/RadioGroup";
import FormStore from "../stores/FormStore";
import {observer} from "mobx-react";
import round from 'lodash/round';

export const Home = observer(() => {
  const { formParameters, operationDuration } = FormStore;
  const { width, height, depth, volume, weight, localization, xrayThickness,
    thickness, massLoss, mobility, dustiness, muddiness, frequency,
    energy } = formParameters;

  const handleSubmit = ev => {
    ev.preventDefault();
    FormStore.calculateDuration();
  }

  const handleResetForm = ev => {
    ev.preventDefault();
    FormStore.resetForm();
  }

  const handleFieldChange = (fieldName, value) => {
    FormStore.updateField(fieldName, value)
  }

  const renderWeightVolumeDimensions = () => {
    return (
      <div className="d-flex justify-content-between flex-md-row flex-column">
        <div style={{maxWidth: '450px'}} className="mb-3">
          <label className="form-label">Размер, мм</label>
          <div className="input-group">
            <NumberInput
              label={'Д'}
              value={width}
              isGrouped={true}
              disabled={!!volume || !!weight}
              onChange={val => handleFieldChange('width', val)}
            />
            <NumberInput
              label={'Ш'}
              value={height}
              isGrouped={true}
              disabled={!!volume || !!weight}
              onChange={val => handleFieldChange('height', val)}
            />
            <NumberInput
              label={'T'}
              value={depth}
              isGrouped={true}
              disabled={!!volume || !!weight}
              onChange={val => handleFieldChange('depth', val)}
            />
          </div>
        </div>
        <div className='px-2 pt-3 text-uppercase align-self-center'>
          или
        </div>
        <div className="mb-3">
          <NumberInput
            label={
              <>
                Объем, см<sup><small>3</small></sup>
              </>
            }
            value={volume}
            disabled={(!!width && !!height && !!depth) || !!weight}
            onChange={val => handleFieldChange('volume', val)}
          />
        </div>
        <div className='px-2 pt-3 text-uppercase align-self-center'>
          или
        </div>
        <div className="mb-3 ms-md-2">
          <NumberInput
            label={'Масса, г'}
            disabled={!!xrayThickness || !!thickness}
            value={weight}
            onChange={val => handleFieldChange('weight', val)}
          />
        </div>
      </div>
    );
  }

  const renderLocalizationSelect = () => {
    const items = [
      { key: 'Лоханка или верхняя чашечка', value: '-1' },
      { key: 'Нижняя или средняя чашечка', value: '1' },
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
          label='Рентгенологическая плотность, HU'
          onChange={val => handleFieldChange('xrayThickness', val)}
        />
      </div>
      <div className='px-2 pt-3 text-uppercase align-self-center'>
        или
      </div>
      <div className="mb-3">
        <NumberInput
          disabled={!!weight || !!xrayThickness}
          value={thickness}
          onChange={val => handleFieldChange('thickness', val)}
          label={
            <>
              Плотность, г/см<sup><small>3</small></sup>
            </>
          }
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
    if (operationDuration) {
      return (
        <div className="alert alert-info mt-3" role="alert">
          { `Длительность литотрипсии: ${operationDuration} минут(ы)` }
        </div>
      );
    }
  }

  return (
    <>
      <form className='MainForm border rounded bg-light' onSubmit={handleSubmit}>
        <ul className="list-group">
          <li className="list-group-item">
            <div>
              <label className="fw-bold fs-4 form-label">Характеристики конкремента</label>
            </div>
            { renderWeightVolumeDimensions() }

            <div className="d-flex justify-content-between flex-md-row flex-column">
              { renderLocalizationSelect() }
              { renderThickness() }
            </div>
            <div className="mb-3">
              <NumberInput
                value={massLoss}
                onChange={val => handleFieldChange('massLoss', val)}
                label={'Удельная величина потери массы камня на 1 джоуль – γ, мг/Дж'}
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
              <label className="fw-bold fs-4 form-label">Параметры ФКЛТ</label>
            </div>
            { renderFrequencySelect() }
            { renderEnergySelect() }
          </li>
        </ul>
        <div className="mt-3">
          <button
            disabled={FormStore.isDisableButton}
            type="submit"
            className="btn btn-primary"
          >
            Рассчитать
          </button>
          <button
            // disabled={FormStore.isDisableButton}
            type="reset"
            onClick={handleResetForm}
            className="btn btn-primary ms-2"
          >
            Очистить форму
          </button>
        </div>
      </form>
      { renderResult() }
    </>
  )
});