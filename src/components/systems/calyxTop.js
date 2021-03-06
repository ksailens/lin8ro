import React, { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { NumberInput } from "../../ui/NumberInput";
import { useStores } from "../../stores";
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import { Systems } from "../../constants";

export const CalyxTop = observer(() => {
  const { coefficientStore: { currentCoefficients, previousCoefficients }, coefficientStore } = useStores();
  const [coefficients, setCoefficients] = useState({...currentCoefficients});
  const previousCoefficientsByType = previousCoefficients[Systems.calyxTop];
  const currentCoefficientsByType = currentCoefficients[Systems.calyxTop];

  useEffect(() => {
    setCoefficients({...currentCoefficientsByType});
  }, [currentCoefficientsByType])

  const isEqualsObj = useMemo(
    () => {
      const copyObj = {...coefficients};
      forEach(copyObj, (val, key) => copyObj[key] = parseFloat(val));
      return JSON.stringify(currentCoefficientsByType) === JSON.stringify(copyObj);
    },
    [coefficients, currentCoefficientsByType]);

  const handleChangeValue = (index, val) => {
    const prevCoeff = {...coefficients};
    prevCoeff[index] = val;
    setCoefficients(prevCoeff);
  }

  function handleSaveCoefficients() {
    coefficientStore.setCurrentCoefficients(coefficients, Systems.calyxTop);
  }

  function handleReset() {
    coefficientStore.resetCurrentCoefficients(Systems.calyxTop);
  }

  function handleResetPrevious() {
    coefficientStore.resetPreviousCoefficients(Systems.calyxTop);
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

  const renderPreviousValues = () => {
    if (isEmpty(previousCoefficientsByType)) {
      return null;
    }

    return (
      <>
        <div>
          <i>???????????????????? ???????????????? ??????????????????????????:</i> <br/>
          Q<sub>1</sub>: {previousCoefficientsByType.q1},
          Q<sub>2</sub>: {previousCoefficientsByType.q2},
          Q<sub>3</sub>: {previousCoefficientsByType.q3},
          <br/>
          Q<sub>4</sub>: {previousCoefficientsByType.q4},
          Q<sub>5</sub>: {previousCoefficientsByType.q5}
        </div>
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={handleResetPrevious}
        >
          ????????????
        </button>
      </>
    )
  }

  return (
    <div className="container">
      <div>
        <p className="lead m-0">??????????????????:</p>
        <p className="ps-4">
          X<sub>1</sub> - c???????????????? ???????????????? ?????????? ?????????????????????? ???? ???????????? ???????????????????????? ??????????<br/>
          X<sub>2</sub> - ?????????? ??????????????????????<br/>
          X<sub>3</sub> - ??????????????????<br/>
          X<sub>4</sub> - ?????????????????? ??????????<br/>
        </p>
      </div>
      <div>
        <p className="lead m-0">????????????????????????:</p>
        { renderQ1() }
        { renderQ2() }
        { renderQ3() }
        { renderQ4() }
        { renderQ5() }
      </div>
      { renderPreviousValues() }
      <div>
        <p className="lead m-0">????????????:</p>
        <p className="ps-4">
          T = Q<sub>1</sub> + Q<sub>2</sub>*X<sub>1</sub> + Q<sub>3</sub>*X<sub>2</sub> + Q<sub>4</sub>*X<sub>3</sub> + Q<sub>5</sub>*X<sub>4</sub>
        </p>
      </div>
      {!isEqualsObj && <div className="alert alert-primary" role="alert">
        ???????????????????????? ???????? ????????????????! ?????????? ?????????????????? ?????????????????? ?????????????? ???????????? "??????????????????"
      </div>}
      <div className="mt-3">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isEqualsObj}
          onClick={handleSaveCoefficients}
        >
          ??????????????????
        </button>
        <button
          type="reset"
          className="btn btn-primary ms-2"
          disabled={!coefficientStore.isCoefficientsChanged[Systems.calyxTop]}
          onClick={handleReset}
        >
          ????????????????
        </button>
      </div>
    </div>
  )
});
