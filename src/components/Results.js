import React from "react";
import {observer} from "mobx-react";
import { useStores } from "../stores";
import moment from "moment";
import 'moment-duration-format';

export const Results = observer(() => {
  const { formStore } = useStores();
  const { cloneInformation, operationData } = formStore;
  if (cloneInformation) {
    const { weight, thickness, operationDuration, tLitChistoe } = operationData;
    return (
      <table className="table table-striped">
        <tbody>
          <tr>
            <td className='text-decoration-underline'>Масса</td>
            <td>{`${weight} мг`}</td>
          </tr>
          <tr>
            <td className='text-decoration-underline'>Плотность</td>
            <td>{thickness} г/см<sup><small>3</small></sup></td>
          </tr>
          <tr>
            <td className='text-decoration-underline'>T<sub>лит-чист</sub></td>
            <td>{moment.duration(tLitChistoe * 1000, 'milliseconds').format('m [мин] s [с] S [мс]')}</td>
          </tr>
          <tr>
            <td className='text-decoration-underline'>Длительность литотрипсии</td>
            <td>{moment.duration(operationDuration * 1000, 'milliseconds').format('m [мин] s [с] S [мс]')}</td>
          </tr>
        </tbody>
      </table>
    )
  }
  return null;
});
