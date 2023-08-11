'use client';
import { useEffect, useState } from 'react';

import { Loading } from '@/Service/index';

import { OShrimp } from '../index';
import styles from './MainPage.module.css';
type cursorPosition = {
  clientX: number;
  clientY: number;
  shrimpX: number;
  shrimpY: number;
};

const MainPage = ({ data, aboutData }: any) => {
  const [pos, setPos] = useState<cursorPosition>({
    clientX: 0,
    clientY: 0,
    shrimpX: 0,
    shrimpY: 0,
  });
  const handleMouse = (e) => {
    setPos({ ...pos, clientX: e.clientX, clientY: e.clientY });
  };

  return (
    <div className={styles.main} onMouseMove={handleMouse}>
      <Loading />
      <OShrimp pos={pos} setPos={setPos}></OShrimp>
    </div>
  );
};

export { MainPage };
