import { createClient } from 'contentful';

import { Contentful } from '@/Assets/Contentful/Contenful';

const client = createClient({
  space: 'hnyp3aiv2g1d',
  accessToken: 'Juy1tfw4ydnGMVy2gsBgX5sTcl17BtJlTaglA_sH-QY',
  host: 'cdn.contentful.com',
});

const getAboutContent = async () => {
  try {
    const entries: any = await client.getEntries({
      content_type: 'portfolio',
      select: 'fields',
    });
    return entries as any;
  } catch (error) {
    let errorMessage = 'Failed to do something';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(errorMessage);
  }
  return entries;
};

const getProjectContent = async () => {
  try {
    const entries: any = await client.getEntries({
      content_type: 'projectSection',
      select: 'fields',
    });
    return entries.items as any;
  } catch (error) {
    let errorMessage = 'Failed to do something exceptional';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(errorMessage);
  }
  return entries;
};

async function getData(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const about = await getAboutContent();
  const project = await getProjectContent();

  return (
    <>
      <Contentful about={about}></Contentful>
    </>
  );
}
