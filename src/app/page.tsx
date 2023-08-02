import clsx from 'clsx';

import { Contentful } from '../Assets/Contentful/Contenful';
import styles from './page.module.css';

async function getData(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
  const data = await getData(
    'https://cdn.contentful.com/spaces/hnyp3aiv2g1d/environments/master/entries?access_token=Juy1tfw4ydnGMVy2gsBgX5sTcl17BtJlTaglA_sH-QY&select=fields&content_type=projectSection',
  );
  // const newItems = data.items.map((item, i) => ({
  //   ...item,
  //   fields: {
  //     ...item.fields,
  //     image: {
  //       ...item.fields.image,
  //       ...data.includes.Asset[i].fields.file,
  //     },
  //   },
  // }));

  const newItems = data.items.map((item) => {
    for (let i = 0; i < data.includes.Asset.length; i++) {
      if (item.fields.image.sys.id === data.includes.Asset[i].sys.id) {
        return {
          name: item.fields.name,
          description: item.fields.description,
          githubURL: item.fields.githubUrl,
          projectURL: item.fields.projectUrl,
          skills: item.fields.skills,
          image: `https:${data.includes.Asset[i].fields.file.url}`,
        };
      }
    }
  });

  return (
    <main className={clsx(styles.main, styles.code)}>
      <Contentful data={newItems} />
    </main>
  );
}
