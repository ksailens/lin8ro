import React from "react";
import {NavLink} from "react-router-dom";

/**
 * компонент главного меню с названием заголовков
 * */
export const Navbar = () => {
  return (
    <div className='bg-primary'>
      <nav style={{maxWidth: '900px'}} className="mx-auto navbar navbar-dark navbar-expand-lg bg-primary px-1">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              exact
              to="/">
              Главная
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/records">
              Картотека
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/model_settings">
              Настройка модели
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/help">
              Помощь
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/about">
              Информация
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>

  );
}
