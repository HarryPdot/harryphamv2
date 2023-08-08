import { useEffect, useMemo, useRef, useState } from 'react';

import { Character, stances } from '@/Assets/index';

import styles from './OShrimp.module.css';

// get distance between shrimp and the cursor
const getDistance = (xy) => {
  return Math.hypot(xy.shrimpX - xy.clientX, xy.shrimpY - xy.clientY);
};

// shrimps velocity towards the cursor
const speed = 100;

// finding position of element
const position: any = (id) => {
  return document.getElementById(id)?.getBoundingClientRect();
};

// document to updating css vars
const updateVar = (vars, value) => {
  return document.documentElement.style.setProperty(vars, value);
};

const OShrimp = ({ pos, setPos }: any) => {
  const [currentStance, setCurrentStance] = useState<string>('walk1');
  const [frameCount, setFrameCount] = useState<number>(0);

  // function to updating css vars
  const frame = (distance) => {
    setFrameCount((prev) => prev + 1);
    if (distance <= 43) {
      return;
    } else {
      updateVar('--shrimpX', pos.clientX + 'px');
      updateVar('--shrimpY', pos.clientY + 'px');
    }

    updateVar('--velocity', `${distance / speed}s`);
  };

  const setSprite = (distance) => {
    if (distance <= 43) {
      setCurrentStance(stances().stand);
    } else if (distance > 43) {
      setCurrentStance(stances().walk);
    }
  };

  // update positions at a constant speed
  useEffect(() => {
    setPos({
      ...pos,
      shrimpX: position('shrimp')?.left + 23.44,
      shrimpY: position('shrimp')?.top + 30,
    });
    setSprite(getDistance(pos));
    const interval = setInterval(() => frame(getDistance(pos)), 50);
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
    [currentStance],
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
      <div>{`distance ${getDistance(pos)}`}</div>
    </div>
  );
};

export { OShrimp };
