import { stances } from '@/Assets';

import { Prefetch } from '..';

const Loading = () => {
  return (
    <div>
      <Prefetch stance={stances().walk}></Prefetch>
      <Prefetch stance={stances().stand}></Prefetch>
      <Prefetch stance={stances().swing}></Prefetch>
      <Prefetch stance={stances().sit}></Prefetch>
    </div>
  );
};

export { Loading };
