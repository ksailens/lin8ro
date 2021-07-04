import React from "react";
import mainLogo from '../images/main.png';
import sevsuLogo from '../images/sevsu.png';

export const Header = () => {
  return (
    <div className='mainColor'>
      <div style={{maxWidth: '900px'}} className="mx-auto text-light">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 text-decoration-none text-light">
            <img alt={''} className="bi me-2" width="60" height="60" src={mainLogo} />
            <span className="fs-6 text-uppercase">урологическое<br /> отделение</span>
          </a>
          <p className='nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 text-uppercase text-center fw-bold'>
            система прогнозирования <br /> длительности литотрипсии
          </p>
          <div>
            <a href="https://www.sevsu.ru/" target="_blank" rel='noreferrer'>
              <img alt={''} className="bi me-2" height="60" src={sevsuLogo} />
            </a>
          </div>
        </header>
      </div>
    </div>
  );
}