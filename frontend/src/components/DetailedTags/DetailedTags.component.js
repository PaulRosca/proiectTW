import axios from "axios"
import { useEffect, useState } from "react"
import { Tag } from "../Tag/Tag.component"
import { Container, DetailedTagGridItem, QuestionsP } from "../Tag/Tag.styled"
import { getCorrectFormOfNounBasedOnValue } from "../PostThumbnail/PostThumbnail.bl";

export const DetailedTags = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const getTags = async () => {
            const res = await axios.get(`http://localhost:9000/posts/tags`, {params: {s : ""}});
            setTags(res.data);
            setIsLoading(false);
        }
        getTags();
    }, [])
    return(
        <Container>
            {isLoading && <p>loading...</p>}
            {!isLoading && tags.map(tag => <DetailedTag tag={tag} key={tag._id}/>)}
        </Container>
    )
}

const DetailedTag = ({tag}) => {
    const {content, questionsCount} = tag
    return(
        <DetailedTagGridItem>
            <Tag name={content}/>
            <QuestionsP>{questionsCount} {getCorrectFormOfNounBasedOnValue("question", questionsCount)}</QuestionsP>
        </DetailedTagGridItem>
    )
}