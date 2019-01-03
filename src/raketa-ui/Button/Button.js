import React from 'react';
import styles from './Button.scss';

const Button = ({ type, role, children, onClick }) => <button type={type} onClick={onClick} className={styles[role]}>{children}</button>;

Button.defaultProps = {
  type: 'button',
  role: 'primary',
};

export default Button;
