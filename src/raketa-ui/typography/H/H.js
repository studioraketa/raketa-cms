import React from 'react';
import styles from './H.scss';

const H = ({ level, children }) => {
  const Tag = `h${level}`;

  return <Tag className={styles[`size${level}`]}>{children}</Tag>;
};

H.defaultProps = {
  level: 1
};

export default H;
