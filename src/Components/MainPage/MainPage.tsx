import { Character, Contentful } from '../../Assets/index';
const MainPage = ({ data, aboutData }) => {
  return (
    <div>
      <Contentful data={data} aboutData={aboutData}></Contentful>
      <Character></Character>
    </div>
  );
};

export { MainPage };
