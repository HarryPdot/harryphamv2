'use client';
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { getCharacter } from '@/Assets/Service/Character';

export const Character = () => {
  const [char, setChar] = useState<string>('');
  const url = `https://maplestory.io/api/character/%7B%22itemId%22%3A2000%2C%22version%22%3A%22235%22%7D%2C%7B%22itemId%22%3A12000%2C%22version%22%3A%22235%22%7D%2C%7B%22itemId%22%3A1053252%2C%22version%22%3A%22235%22%7D%2C%7B%22itemId%22%3A1005061%2C%22version%22%3A%22235%22%7D%2C%7B%22itemId%22%3A26703%2C%22animationName%22%3A%22default%22%2C%22version%22%3A%22235%22%7D/swingO1/animated?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=false&bgColor=0,0,0,0`;
  const fetcher = (...args) =>
    fetch(...args).then((res) => {
      return res.blob();
    });

  const { data, error, isLoading } = useSWR(url, fetcher);
  const { cache } = useSWRConfig();

  if (error) {
    return <div>Failed to fetch users.</div>;
  }
  if (isLoading) return <h2>Loading...</h2>;
  URL.createObjectURL(data);

  return (
    <picture>
      <img src={URL.createObjectURL(data)} alt="Character" />
    </picture>
  );
};
