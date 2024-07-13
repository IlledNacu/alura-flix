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
  const { videos } = useContext(GlobalContext);
  const [groupedVideos, setGroupedVideos] = useState([]);

  useEffect(() => {
    if (videos.length > 0) {
      const categories = videos.reduce((acc, video) => {
        const categoryExists = acc.find((item) => item.category === video.categoria);
        if (!categoryExists) {
          acc.push({
            category: video.categoria,
            videos: [video],
          });
        } else {
          categoryExists.videos.push(video);
        }
        return acc;
      }, []);

      setGroupedVideos(categories);
    }
  }, [videos]);

  return (
    <SectionStyles>
      {groupedVideos.map((group) => (
        <div key={group.category}>
          <CourseTitle color={group.videos[0].color}>{group.category}</CourseTitle>
          <CourseContainer>
            {group.videos.map((video) => (
              <Card key={video.id} color={video.color} video={video} />
            ))}
          </CourseContainer>
        </div>
      ))}
    </SectionStyles>
  );
};

export default CourseSection;
