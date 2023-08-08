import { useEffect, useMemo, useRef, useState } from 'react';

import { Character, stances } from '@/Assets/index';

import styles from './OShrimp.module.css';

const getDistance = (xy) => {
  return Math.hypot(xy.shrimpX - xy.clientX, xy.shrimpY - xy.clientY);
};

const OShrimp = ({ pos, setPos }: any) => {
  const [currentStance, setCurrentStance] = useState<string>('stand1');
  const [frameCount, setFrameCount] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

  const frame = () => {
    setFrameCount((prev) => prev + 1);
    setDistance(getDistance(pos));
    document.documentElement.style.setProperty('--shrimpX', pos.clientX + 'px');
    document.documentElement.style.setProperty('--shrimpY', pos.clientY + 'px');
    document.documentElement.style.setProperty(
      '--velocity',
      `${distance / 50}s`,
    );
  };

  useEffect(() => {
    // console.log(myRef.current.offsetLeft);
    const position: unknown = document
      .getElementById('shrimp')
      ?.getBoundingClientRect();

    setPos({
      ...pos,
      shrimpX: position?.left + 23.44,
      shrimpY: position?.top + 30,
    });

    const interval = setInterval(() => frame(), 100);
    return () => clearInterval(interval);
  }, [frameCount]);

  const character = useMemo(
    () => (
      <Character
        id={'shrimp'}
        style={{
          position: 'absolute',
        }}
        stance={currentStance}
        className={styles.shrimp}
      />
    ),
    [],
  );
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {character}
      <div>{`ClientX ${pos.clientX}`}</div>
      <div>{`ClientY ${pos.clientY}`}</div>
      <div>{`ShrimpX ${pos.shrimpX}`}</div>
      <div>{`ShrimpY ${pos.shrimpY}`}</div>
      <div>{`distance ${distance}`}</div>
    </div>
  );
};

export { OShrimp };
