import React from 'react';
import styles from './Label.scss';

const Label = ({ htmlFor, children }) => <label htmlFor={htmlFor} className={styles.root}>{children}</label>

export default Label;
