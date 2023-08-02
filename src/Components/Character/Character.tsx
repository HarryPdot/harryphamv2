'use client';
import { useEffect, useState } from 'react';

export const Character = ({ data }: any) => {
  const [character, setCharacter] = useState<string>('');

  useEffect(() => {
    // console.log(data);
  }, []);

  return <div></div>;
};
