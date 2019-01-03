import React from 'react';
import styles from './P.scss';

const P = ({ children }) => <p className={styles.root}>{children}</p>;

export default P;
