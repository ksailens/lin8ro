import React from "react";
import {observer} from "mobx-react";
import { useStores } from "../stores";
import moment from "moment";

export const Results = observer(() => {
  const { formStore } = useStores();
  const { cloneInformation, operationData } = formStore;
  if (cloneInformation) {
    const { weight, thickness, operationDuration, tLitChistoe } = operationData;
    return (
      <table className="table table-striped">
        <tbody>
          <tr className='text-decoration-underline'>
            <td>Масса, г</td>
            <td>{weight}</td>
          </tr>
          <tr className='text-decoration-underline'>
            <td>Плотность, г/см<sup><small>3</small></sup></td>
            <td>{thickness}</td>
          </tr>
          <tr>
            <td className='text-decoration-underline'>Длительность дробления камня</td>
            <td>{moment.utc(operationDuration*1000).format('HH:mm:ss')}</td>
          </tr>
          <tr>
            <td className='text-decoration-underline'>T<sub>лит-чист</sub></td>
            <td>{tLitChistoe}</td>
          </tr>
        </tbody>
      </table>
    )
  }
  return null;
});
