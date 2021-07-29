import React from 'react';
import styles from './[id].css';

export default function Page(props) {
  console.log(props);
  const { match } = props;
  return (
    <div>
      <h1 className={styles.title}>Page product/[id] id:{match.params.id}</h1>
    </div>
  );
}
