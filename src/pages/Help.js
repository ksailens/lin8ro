import React from "react";
import { Accordion } from "react-bootstrap";

export const Help = () => {
  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <div className="container">
        <Accordion defaultActiveKey={null} alwaysOpen>
          <Accordion.Item eventKey={1}>
            <Accordion.Header>Характеристика конкремента</Accordion.Header>
            <Accordion.Body>
              <p>При работе с блоком «Характеристики конкремента» пользователь может выбрать для ввода либо размер конкремента, либо его объем.
                В случае ввода одного из вариантов второй станет неактивным для ввода. Так как для расчета длительности контактной лазерной литотрипсии достаточно знать лишь один из этих параметров.
              </p>
              <p>Ввод информации о размере конкремента:</p>
              <img alt={''} className="img-fluid rounded mx-auto d-block mb-3" src={'/img/2.png'} />
              <p>Ввод информации об объеме конкремента: </p>
              <img alt={''} className="img-fluid rounded mx-auto d-block mb-3" src={'/img/3.png'} />
              <p>Система позволяет использовать для расчета различные модели прогнозирования при различной локализации конкремента у пациента.</p>
              <img alt={''} className="img-fluid rounded mx-auto d-block mb-3" src={'/img/4.png'} />
              <p>Подбирая параметры «Рентгенологическая плотность, HU» и «Удельная величина потери массы камня на 1 джоуль – γ, мг/Дж» рекомендуется:</p>
              <ul>
                <li>при выборе «Рентгенологическая плотность, HU» ограничиться верхней границей в 3000 HU (система не позволит внести значение свыше этого).</li>
                <li>при выборе параметра «Удельная величина потери массы камня на 1 джоуль – γ, мг/Дж» рекомендуется для моделей по умолчанию придерживаться значения 0,444 ±0,008 мг/Дж (система не ограничивает это поле ввода).</li>
              </ul>
              <img alt={''} className="img-fluid rounded mx-auto d-block mb-3" src={'/img/5.png'} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey={2}>
            <Accordion.Header>Параметры литотриптера</Accordion.Header>
            <Accordion.Body>
              <p>Блок «Параметры литотриптера» позволяет указать значения частоты и энергии импульса.</p>
              <p>При этом системно устанавливается:</p>
              <ul>
                <li>диапазон частоты импульса: от 1 до 20 Гц.</li>
                <li>диапазон энергии импульса: от 0.1 до 6 Дж.</li>
              </ul>
              <img alt={''} className="img-fluid rounded mx-auto d-block mb-3" src={'/img/6.png'} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey={3}>
            <Accordion.Header>Страница «Картотека»</Accordion.Header>
            <Accordion.Body>
              <p>Страница «Картотека» представляет собой хранилище информации о всех проведенных расчетах.</p>
              <img alt={''} className="img-fluid rounded mx-auto d-block mb-3" src={'/img/7.png'} />
              <p>Помимо хранения блок позволяет осуществить добавление фактического времени проведения операции и автоматически рассчитать погрешность модели при конкретном случае:</p>
              <img alt={''} className="img-fluid rounded mx-auto d-block mb-3" src={'/img/8.png'} />
              <img alt={''} className="img-fluid rounded mx-auto d-block mb-3" src={'/img/9.png'} />
              <p>При работе с картотекой возможна ситуация, когда система теряет связь с базой данных:</p>
              <img alt={''} className="img-fluid rounded mx-auto d-block mb-3" src={'/img/10.png'} />
              <p>Для устранения этой ошибки на этапе размещения системы на хостинге firebase достаточно подключить VPN или использовать браузер со встроенным VPN (например, Opera). После подключения VPN достаточно перезагрузить страницу ИЛИ нажать на кнопку «Получить данные…».
                Без соединения с БД система не сможет сохранить результаты вычислений на странице «Главная». Поэтому перед проведением расчет рекомендуется зайти на страницу «Картотека» и удостовериться в существовании подключения к БД.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey={4}>
            <Accordion.Header>Страница «Настройка модели»</Accordion.Header>
            <Accordion.Body>
              <p>Страница «Настройка модели» позволяет осуществлять изменение значения коэффициентов модели при различных локализациях конкремента.</p>
              <img alt={''} className="img-fluid rounded mx-auto d-block mb-3" src={'/img/11.png'} />
              <p>Для перехода в режим редактирования необходимо нажать на интересующий блок и таким образом его «развернуть».</p>
              <img alt={''} className="img-fluid rounded mx-auto d-block mb-3" src={'/img/12.png'} />
              <p>При введении нового значения в поля «Коэффициенты» система уведомит пользователя о том, что произошли изменения и для их применения необходимо сохранить новую модель.</p>
              <img alt={''} className="img-fluid rounded mx-auto d-block mb-3" src={'/img/13.png'} />
              <p>После нажатия на кнопку «Сохранить» введенные коэффициенты будут преобразованы в новую модель для расчета.</p>
              <p>При этом предыдущие (сохраненные) коэффициенты будут отображены в блоке «Предыдущие значение коэффициентов».</p>
              <p>Нажав на кнопку «Сбросить», пользователь может вернуться к коэффициентам по умолчанию системы.</p>
              <img alt={''} className="img-fluid rounded mx-auto d-block mb-3" src={'/img/14.png'} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  )
}
