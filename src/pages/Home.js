import React from "react";
import { NumberInput } from "../ui/NumberInput";
import {Select} from "../ui/Select";

export const Home = () => {

  const renderWeightVolumeDimensions = () => {
    return (
      <div className="d-flex justify-content-between">
        <div style={{maxWidth: '450px'}} className="mb-3">
          <label className="form-label">Размер, мм</label>
          <div className="input-group">
            <NumberInput
              label={'Д'}
              isGrouped={true}
            />
            <NumberInput
              label={'Ш'}
              isGrouped={true}
            />
            <NumberInput
              label={'T'}
              isGrouped={true}
            />
          </div>
        </div>
        <div className='px-2 fw-bold text-uppercase align-self-center'>
          или
        </div>
        <div className="mb-3">
          <NumberInput
            label={
              <>
                Объем, см<sup><small>3</small></sup>
              </>
            }
          />
        </div>
        <div className="mb-3 ms-2">
          <NumberInput
            label={'Масса, г'}
          />
        </div>
      </div>
    );
  }

  const renderLocalizationSelect = () => {
    const items = [
      {
        key: 'Лоханка или верхняя чашечка',
        value: -1
      },
      {
        key: 'Нижняя или средняя чашечка',
        value: 1
      },
    ];

    return (
      <div className="mb-3">
        <Select
          label={'Локализация'}
          items={items}
        />
      </div>
    )
  }

  const renderThickness = () => (
    <>
      <div className="mb-3">
        <NumberInput
          label='Рентгенологическая плотность, HU'
        />
      </div>
      <div className="mb-3">
        <NumberInput
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
    for (let i = 0.1; i <= 6; i=(i+0.1).toFixed(6)*1) {
      items.push({
        key: i,
        value: i
      })
    }

    return (
      <div className="mb-3">
        <Select
          label={'Энергия импульсов, Дж'}
          items={items}
        />
      </div>
    );


  }

  const renderFrequencySelect = () => {
    const items = [];
    for (let i = 1; i <= 20; i++) {
      items.push({
        key: i,
        value: i
      })
    }

    return (
      <div className="mb-3">
        <Select
          label={'Частота импульсов, Гц'}
          items={items}
        />
      </div>
    );
  }

  return (
    <form className='MainForm border rounded bg-light'>
      <ul className="list-group">
        <li className="list-group-item">
          <div>
            <label className="fw-bold fs-4 form-label">Характеристики конкремента</label>
          </div>
          { renderWeightVolumeDimensions() }

          <div className="d-flex justify-content-between">
            { renderLocalizationSelect() }
            { renderThickness() }
          </div>
          <div className="mb-3">
            <NumberInput
              label={'Удельная величина потери массы камня на 1 джоуль – γ, мг/Дж.'}
            />
          </div>
        </li>
        <li className="list-group-item">
          <div>
            <label className="fw-bold fs-4 form-label">Особенности операции</label>
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  )
}