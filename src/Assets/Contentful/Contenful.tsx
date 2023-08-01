'use client';
import { useEffect, useState } from 'react';

export const Contentful = ({ about }) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    setContent(`https:${about.items[0].fields.portrait.fields.file.url}`);
    console.log(content);
  }, []);
  return (
    <div>
      <div>{about.items[0].fields.about}</div>
      <img src={content} alt="" />
    </div>
  );
};
