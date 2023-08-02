'use client';
import { useEffect, useState } from 'react';

export const Contentful = ({ data, aboutData }: any) => {
  const [content, setContent] = useState<any>([]);
  const [about, setAbout] = useState<any>([]);

  useEffect(() => {
    setContent(data);
    setAbout(aboutData);
  }, []);
  return (
    <div>
      {content.map((item: any, i: number) => {
        return <div key={i}>{item.name}</div>;
      })}
    </div>
  );
};
