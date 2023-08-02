import { MainPage } from '@/Components/MainPage/MainPage';

import { Contentful } from '../Assets/Contentful/Contenful';
import styles from './page.module.css';

async function getData(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
  const content = await getData(
    'https://cdn.contentful.com/spaces/hnyp3aiv2g1d/environments/master/entries?access_token=Juy1tfw4ydnGMVy2gsBgX5sTcl17BtJlTaglA_sH-QY&select=fields&content_type=projectSection',
  );

  const newContent = content.items.map((item: any) => {
    for (let i = 0; i < content.includes.Asset.length; i++) {
      if (item.fields.image.sys.id === content.includes.Asset[i].sys.id) {
        return {
          name: item.fields.name,
          description: item.fields.description,
          githubURL: item.fields.githubUrl,
          projectURL: item.fields.projectUrl,
          skills: item.fields.skills,
          image: `https:${content.includes.Asset[i].fields.file.url}`,
        };
      }
    }
  });

  const about = await getData(
    'https://cdn.contentful.com/spaces/hnyp3aiv2g1d/environments/master/entries?access_token=Juy1tfw4ydnGMVy2gsBgX5sTcl17BtJlTaglA_sH-QY&select=fields&content_type=portfolio',
  );
  const newAbout = about.items.map((item: any, i: number) => {
    return {
      description: item.fields.about,
      image: about.includes.Asset[i].fields.file.url,
    };
  });

  return (
    <main>
      <MainPage data={newContent} aboutData={newAbout}></MainPage>
    </main>
  );
}
