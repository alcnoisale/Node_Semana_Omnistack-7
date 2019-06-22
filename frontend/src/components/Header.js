import React from 'react';
import { Link } from 'react-router-dom';// TAG LINK TEM A MESMA FUNCAO DA TAG "a"

import './Header.css';

import logo from '../assets/logo.svg';
import camera from '../assets/camera.svg';

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          <img src={logo} alt="InstaDog"/>
        </Link>
        <Link to="/new">
          <img src={camera} alt="Enviar Publicação"/>
        </Link>        
      </div>
    </header>
  );
}
