import { useEffect, useMemo, useRef, useState } from 'react';

import { Character, stances } from '@/Assets/index';

import styles from './OShrimp.module.css';

// get distance between shrimp and the cursor
const getDistance = (xy: any) => {
  if (position('shrimp')) {
    const { top, left, width, height } = position('shrimp');
    const a = {
      x: left + width / 2,
      y: top + height / 2,
    };
    return Math.hypot(a.x - xy.clientX, a.y - xy.clientY);
  }
};

// shrimps velocity towards the cursor
const speed = 100;

// finding position of element
const position: any = (id: string) => {
  return document.getElementById(id)?.getBoundingClientRect();
};

// document to updating css vars
const updateVar = (vars, value): any => {
  return document.documentElement.style.setProperty(vars, value);
};

const OShrimp = ({ pos, setPos }: any) => {
  const [currentStance, setCurrentStance] = useState<string>('walk1');
  const [frameCount, setFrameCount] = useState<number>(0);

  // function to updating css vars
  const frame = (distance: any) => {
    setFrameCount((prev) => prev + 1);
    const { top, left, width, height } = position('shrimp');
    const a = {
      x: left + width / 2,
      y: top + height / 2,
    };

    if (distance <= 70) {
      setSprite(stances().stand);
      updateVar('--shrimpX', a.x + 'px');
      updateVar('--shrimpY', a.y + 'px');
      return;
    } else if (distance > 70) {
      setSprite(stances().walk);
      setDirection();
      updateVar('--shrimpX', pos.clientX + 'px');
      updateVar('--shrimpY', pos.clientY + 'px');
    }

    updateVar('--velocity', `${distance / speed}s`);
  };

  const setSprite = (stance: string) => {
    setCurrentStance(stance);
  };

  const setDirection = () => {
    if (pos.clientX >= pos.shrimpX) {
      updateVar('--transform', 'translate(-50%, -50%) scaleX(-1)');
    } else {
      updateVar('--transform', 'translate(-50%, -50%) scaleX(1)');
    }
  };

  const setMove = () => {
    setPos({
      ...pos,
      shrimpX: position('shrimp')?.left,
      shrimpY: position('shrimp')?.top,
    });
  };

  // update positions at a constant speed
  useEffect(() => {
    setMove();
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
