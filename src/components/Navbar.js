import React from "react";
import {NavLink} from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-primary px-4">
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
            to="/about">
            Информация
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}