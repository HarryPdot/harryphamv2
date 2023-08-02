'use client';
import { useEffect, useState } from 'react';

export const Contentful = ({ data, aboutData }) => {
  const [content, setContent] = useState([]);
  const [about, setAbout] = useState([]);

  useEffect(() => {
    setContent(data);
    setAbout(aboutData);
  }, []);
  return (
    <div>
      {content.map((item, i) => {
        return <div key={i}>{item.name}</div>;
      })}
    </div>
  );
};
