import { Tag } from "../Tag/Tag.component";
import { Container, DetailedTagGridItem, QuestionsP } from "../Tag/Tag.styled";
import { getCorrectFormOfNounBasedOnValue } from "../PostThumbnail/PostThumbnail.bl";
import { useHistory } from "react-router-dom";
export const DetailedTags = ({ tags, isLoading }) => {
  return (
    <Container>
      {isLoading && <p>loading...</p>}
      {!isLoading && tags.map((tag) => <DetailedTag tag={tag} key={tag._id} />)}
    </Container>
  );
};

const DetailedTag = ({ tag }) => {
  const { content, questionsCount } = tag;
  const history = useHistory();
  const handleClick = () => {
    history.push({
      pathname: "/",
      search: "?" + new URLSearchParams({ tags: [tag._id] }),
    });
  };
  return (
    <DetailedTagGridItem onClick={handleClick}>
      <Tag name={content} />
      <QuestionsP>
        {questionsCount}
        {getCorrectFormOfNounBasedOnValue("question", questionsCount)}
      </QuestionsP>
    </DetailedTagGridItem>
  );
};
