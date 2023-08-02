'use client';
import { useEffect, useState } from 'react';

export const Contentful = ({ data }) => {
  const [content, setContent] = useState([]);
  console.log(data);
  return (
    <div>
      <div></div>
      <img src={content} alt="" />
    </div>
  );
};
