import React from "react";
import FormStore from "../stores/FormStore";
import {observer} from "mobx-react";
import {Localization, Mobility, Dustiness, Muddiness} from "../constants";

export const Results = observer(() => {
  const { cloneInformation, operationData } = FormStore;
  if (cloneInformation) {
    const { width, height, depth, volume, localization, xrayThickness,
      massLoss, mobility, dustiness, muddiness, frequency,
      energy, fio, birthDate, operationDate } = cloneInformation;
    const { weight, thickness, operationDuration } = operationData;
    return (
      <table className="table table-striped">
        <tbody>
          <tr>
            <td colSpan='2' className='text-center'>Пациент</td>
          </tr>
          <tr>
            <td>Ф.И.О.</td>
            <td>{fio}</td>
          </tr>
          <tr>
            <td>Дата рождения</td>
            <td>{birthDate}</td>
          </tr>
          <tr>
            <td>Дата операции</td>
            <td>{operationDate}</td>
          </tr>
          <tr>
            <td colSpan='2' className='text-center'>Конкремент</td>
          </tr>
          <tr>
            <td>{ volume ? <span>Объем, см<sup><small>3</small></sup></span> : 'Размер, мм'}</td>
            <td>{ volume || `${width}x${height}x${depth}` }</td>
          </tr>
          <tr>
            <td>Локализация</td>
            <td>{Localization[localization]}</td>
          </tr>
          <tr>
            <td>Рентгенологическая плотность, HU</td>
            <td>{xrayThickness}</td>
          </tr>
          <tr>
            <td>γ, мг/Дж</td>
            <td>{massLoss}</td>
          </tr>
          <tr className='text-decoration-underline'>
            <td>Масса, г</td>
            <td>{weight}</td>
          </tr>
          <tr className='text-decoration-underline'>
            <td>Плотность, г/см<sup><small>3</small></sup></td>
            <td>{thickness}</td>
          </tr>
          <tr>
            <td>Подвижность</td>
            <td>{Mobility[mobility]}</td>
          </tr>
          <tr>
            <td>Пыльность</td>
            <td>{Dustiness[dustiness]}</td>
          </tr>
          <tr>
            <td>Видимость</td>
            <td>{Muddiness[muddiness]}</td>
          </tr>
          <tr>
            <td colSpan='2' className='text-center'>Параметры ФКЛТ</td>
          </tr>
          <tr>
            <td>Частота импульсов, Гц</td>
            <td>{frequency}</td>
          </tr>
          <tr>
            <td>Энергия импульсов, Дж</td>
            <td>{energy}</td>
          </tr>
          <tr>
            <td className='text-decoration-underline'>Длительность операции, мин.</td>
            <td>{operationDuration}</td>
          </tr>
        </tbody>
      </table>
    )
  }
  return null;
});