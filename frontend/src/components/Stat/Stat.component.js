import { Container, StatValue, StatName } from "./Stat.styled";
import { getCorrectFormOfNounBasedOnValue } from "../PostThumbnail/PostThumbnail.bl";
export const Stat = ({value, string}) => {
    return(
        <Container>
            <StatValue>{value}</StatValue>
            <StatName>{getCorrectFormOfNounBasedOnValue(string, value)}</StatName>
        </Container>
    )
}

