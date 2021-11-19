import { Tag } from "../Tag/Tag.component"
import { Container, DetailedTagGridItem, QuestionsP } from "../Tag/Tag.styled"

const tags = [{name: "JavaScript", "questions": "12030"}, {name: "Binary Trees", "questions": "324"}, {name: "Binary Trees", "questions": "324"},{name: "Binary Trees", "questions": "324"},{name: "Binary Trees", "questions": "324"},{name: "Binary Trees", "questions": "324"},{name: "Binary Trees", "questions": "324"},{name: "Binary Trees", "questions": "324"},{name: "Binary Trees", "questions": "324"},{name: "Binary Trees", "questions": "4"},{name: "Binary Trees", "questions": "324"},{name: "Binary Trees", "questions": "324"},{name: "Binary Trees", "questions": "324"},{name: "Binary Trees", "questions": "324"},{name: "Binary Trees", "questions": "324"},{name: "Binary Trees", "questions": "32"},{name: "Binary Trees", "questions": "324"}]

export const DetailedTags = () => {
    return(
        <Container>
            {tags.map(tag => <DetailedTag tag={tag} />)}
        </Container>
    )
}

const DetailedTag = ({tag}) => {
    const {name, questions} = tag
    return(
        <DetailedTagGridItem>
            <Tag name={name}/>
            <QuestionsP>{questions} questions</QuestionsP>
        </DetailedTagGridItem>
    )
}