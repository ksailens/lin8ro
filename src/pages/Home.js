import React from "react";
import { NumberInput } from "../ui/NumberInput";
import {Select} from "../ui/Select";
import {RadioGroup} from "../ui/RadioGroup";
import FormStore from "../stores/FormStore";
import {observer} from "mobx-react";

export const Home = observer(() => {
  const { width, height, depth, volume, weight, localization, xrayThickness,
    thickness, massLoss, mobility, dustiness, muddiness, frequency,
    energy } = FormStore.formParameters;

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
            />
            <NumberInput
              label={'Ш'}
              value={height}
              isGrouped={true}
            />
            <NumberInput
              label={'T'}
              value={depth}
              isGrouped={true}
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
          />
        </div>
        <div className="mb-3 ms-md-2">
          <NumberInput
            label={'Масса, г'}
            value={weight}
          />
        </div>
      </div>
    );
  }

  const renderLocalizationSelect = () => {
    const items = [
      { key: 'Лоханка или верхняя чашечка', value: -1 },
      { key: 'Нижняя или средняя чашечка', value: 1 },
    ];

    return (
      <div className="mb-3">
        <Select
          value={localization}
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
          value={xrayThickness}
          label='Рентгенологическая плотность, HU'
        />
      </div>
      <div className="mb-3">
        <NumberInput
          value={thickness}
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
          value={energy}
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
          value={frequency}
          name={'Frequency'}
          label={'Частота импульсов, Гц'}
          items={items}
        />
      </div>
    );
  }

  const renderMuddinessRadio = () => {
    const items = [
      { key: 'нет замутнения', value: -1 },
      { key: 'есть замутнение', value: 1 },
    ];

    return (
      <div className="mb-3">
        <RadioGroup
          value={muddiness}
          name={'Muddiness'}
          label='Видимость'
          items={items}
        />
      </div>
    );
  }

  const renderDustinessRadio = () => {
    const items = [
      { key: 'непыльный', value: -1 },
      { key: 'пыльный', value: 1 },
    ];
    return (
      <div className="mb-3">
        <RadioGroup
          value={dustiness}
          name={'Dustiness'}
          label='Пыльность камня'
          items={items}
        />
      </div>
    );
  }

  const renderMobilityRadio = () => {
    const items = [
      { key: 'нет', value: -1 },
      { key: 'есть', value: 1 },
    ];
    return (
      <div className="mb-3">
        <RadioGroup
          value={mobility}
          label='Подвижность камня'
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

          <div className="d-flex justify-content-between flex-md-row flex-column">
            { renderLocalizationSelect() }
            { renderThickness() }
          </div>
          <div className="mb-3">
            <NumberInput
              value={massLoss}
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  )
});