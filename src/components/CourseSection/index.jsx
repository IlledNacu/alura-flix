import styled from "styled-components";
import CourseTitle from "../CourseTitle";
import Card from "../Card";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/Context";

const SectionStyles = styled.section`
  width: 100%;
  background-color: var(--main-background-black);
  padding: 40px 27px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 40px;

  @media (min-width: 1024px) {
    align-items: center;
    padding: 62px;
  }
`;

const CourseContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

const CourseSection = () => {
  const { videos, categories } = useContext(GlobalContext);
  const [groupedVideos, setGroupedVideos] = useState([]);

  useEffect(() => {
    if (videos.length > 0 && categories.length > 0) {
      // Utilizamos un objeto Set para mantener categorías únicas
      const uniqueCategories = new Set();

      // Filtramos los videos y añadimos las categorías únicas al Set
      videos.forEach((video) => {
        if (categories.find((category) => category.titulo === video.categoria)) {
          uniqueCategories.add(video.categoria);
        }
      });

      // Convertimos el Set de categorías únicas de nuevo a un array
      const uniqueCategoriesArray = Array.from(uniqueCategories);

      // Creamos un objeto con las categorías y sus videos correspondientes
      const grouped = uniqueCategoriesArray.map((category) => {
        const videosInCategory = videos.filter((video) => video.categoria === category);
        const categoryInfo = categories.find((cat) => cat.titulo === category);
        return {
          category: category,
          color: categoryInfo.color,
          videos: videosInCategory,
        };
      });

      // Establecemos el estado con las categorías agrupadas y sus videos
      setGroupedVideos(grouped);
    }
  }, [videos, categories]);

  return (
    <SectionStyles>
      {groupedVideos.map((group) => (
        <div key={group.category}>
          <CourseTitle color={group.color}>{group.category}</CourseTitle>
          <CourseContainer>
            {group.videos.map((video) => (
              <Card key={video.id} color={group.color} video={video} />
            ))}
          </CourseContainer>
        </div>
      ))}
    </SectionStyles>
  );
};

export default CourseSection;
