import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './images/Logo.jpeg';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <div className={styles.flexBox}>
      <img src={logo} className={styles.imageSize} alt="Logo" />
      <NavLink to="/home" className={`${styles.textSize} ${styles.navLink}`}>Home</NavLink>
      <NavLink to="/addMovie" className={`${styles.textSize} ${styles.navLink}`}>Add Movie</NavLink>
    </div>
  );
}
