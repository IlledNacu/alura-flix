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
      const grouped = categories.map((category) => {
        const videosInCategory = videos.filter((video) => video.categoria === category.titulo);
        return {
          category: category.titulo,
          color: category.color,
          videos: videosInCategory,
        };
      });

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
