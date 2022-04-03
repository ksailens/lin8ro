import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Accordion } from "react-bootstrap";
import { Pelvis, UreterBottom, UreterMiddle, UreterTop, CalyxTop, CalyxMidBottom } from '../components/systems'
import { useStores } from "../stores";

export const ModelSettings = observer(() => {
  const { coefficientStore } = useStores();

  useEffect(() => {
    return () => coefficientStore.stopStore();
  }, [coefficientStore]);

  const content = [
    {
      title: 'при локализации конкремента в лоханке',
      element: Pelvis
    },
    {
      title: 'при локализации конкремента в верхней чашечке',
      element: CalyxTop
    },
    {
      title: 'при локализации конкремента в нижней и средней чашечке',
      element: CalyxMidBottom
    },
    {
      title: 'при локализации конкремента в В/3 мочеточника',
      element: UreterTop
    },
    {
      title: 'при локализации конкремента в Н/3 мочеточника',
      element: UreterBottom
    },
    {
      title: 'при локализации конкремента в среднем отделе мочеточника',
      element: UreterMiddle
    },
  ];

  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <div className="container">
        <p className="h4 fw-normal pb-3">Редактирование модели прогнозирования длительности лазерной литотрипсии</p>
        <Accordion defaultActiveKey={0} alwaysOpen>
          { content.map((item, index) => (
            <Accordion.Item eventKey={index}>
              <Accordion.Header>{item.title}</Accordion.Header>
              <Accordion.Body>
                { React.createElement(item.element) }
              </Accordion.Body>
            </Accordion.Item>
          )) }
        </Accordion>
      </div>
    </div>
  )
});
