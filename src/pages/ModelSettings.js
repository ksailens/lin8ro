import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { NumberInput } from "../ui/NumberInput";
import { useStores } from "../stores";

export const ModelSettings = observer(() => {
  const { coefficientStore: { currentCoefficients }, coefficientStore } = useStores();
  const [coefficients, setCoefficients] = useState({...currentCoefficients});

  useEffect(() => {
    setCoefficients({...currentCoefficients});
  }, [currentCoefficients])

  const handleChangeValue = (index, val) => {
    const prevCoeff = {...coefficients};
    prevCoeff[index] = val;
    setCoefficients(prevCoeff);
  }

  function handleReset() {
    coefficientStore.resetCurrentCoefficients();
  }

  const renderQ1 = () => {
    return (
      <div className={'CoefficientInput m-1'}>
        <NumberInput
          label={<>Q<sub>1</sub></>}
          isNegative={true}
          value={coefficients.q1}
          isError={coefficients.q1 === '-'}
          isGrouped={true}
          onChange={val => handleChangeValue('q1', val)}
        />
      </div>
    );
  }

  const renderQ2 = () => {
    return (
      <div className={'CoefficientInput m-1'}>
        <NumberInput
          label={<>Q<sub>2</sub></>}
          isNegative={true}
          value={coefficients.q2}
          isError={coefficients.q2 === '-'}
          isGrouped={true}
          onChange={val => handleChangeValue('q2', val)}
        />
      </div>
    );
  }

  const renderQ3 = () => {
    return (
      <div className={'CoefficientInput m-1'}>
        <NumberInput
          label={<>Q<sub>3</sub></>}
          isNegative={true}
          value={coefficients.q3}
          isError={coefficients.q3 === '-'}
          isGrouped={true}
          onChange={val => handleChangeValue('q3', val)}
        />
      </div>
    );
  }

  const renderQ4 = () => {
    return (
      <div className={'CoefficientInput m-1'}>
        <NumberInput
          label={<>Q<sub>4</sub></>}
          isNegative={true}
          value={coefficients.q4}
          isError={coefficients.q4 === '-'}
          isGrouped={true}
          onChange={val => handleChangeValue('q4', val)}
        />
      </div>
    );
  }

  const renderQ5 = () => {
    return (
      <div className={'CoefficientInput m-1'}>
        <NumberInput
          label={<>Q<sub>5</sub></>}
          isNegative={true}
          value={coefficients.q5}
          isError={coefficients.q5 === '-'}
          isGrouped={true}
          onChange={val => handleChangeValue('q5', val)}
        />
      </div>
    );
  }

  const renderQ6 = () => {
    return (
      <div className={'CoefficientInput m-1'}>
        <NumberInput
          label={<>Q<sub>6</sub></>}
          isNegative={true}
          value={coefficients.q6}
          isError={coefficients.q6 === '-'}
          isGrouped={true}
          onChange={val => handleChangeValue('q6', val)}
        />
      </div>
    );
  }

  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <div className="container">
        <p className="h4 fw-normal pb-3">Редактирование модели прогнозирования времени продолжительности лазерной литотрипсии</p>
        <div>
          <p className="lead m-0">Аргументы:</p>
          <p className="ps-4">
            X<sub>1</sub> - cуммарное «чистое» время затраченное на полную фрагментацию камня<br/>
            X<sub>2</sub> - сложность анатомии (место локализации)<br/>
            X<sub>3</sub> - видимость<br/>
            X<sub>4</sub> - пыльность камня<br/>
            X<sub>5</sub> - подвижность камня<br/>
          </p>
        </div>
        <div>
          <p className="lead m-0">Коэффициенты:</p>
          { renderQ1() }
          { renderQ2() }
          { renderQ3() }
          { renderQ4() }
          { renderQ5() }
          { renderQ6() }
        </div>
        <div>
          <p className="lead m-0">Модель:</p>
          <p className="ps-4">
            T = Q<sub>1</sub> + Q<sub>2</sub>*X<sub>1</sub> + Q<sub>3</sub>*X<sub>2</sub> + Q<sub>4</sub>*X<sub>3</sub> + Q<sub>5</sub>*X<sub>4</sub> + Q<sub>6</sub>*X<sub>5</sub>
          </p>
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Сохранить
          </button>
          <button
            type="reset"
            className="btn btn-primary ms-2"
            onClick={handleReset}
          >
            Сбросить
          </button>
        </div>

      </div>
    </div>
  )
});
