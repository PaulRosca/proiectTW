import { Container, StatValue, StatName } from "./Stat.styled";
import { getCorrectFormOfNounBasedOnValue } from "../PostThumbnail/PostThumbnail.bl";
import { abbreviateNumber } from "../../utils/Number.utils";

export const Stat = ({value, string}) => {
    return(
        <Container>
            <StatValue>{abbreviateNumber(value)}</StatValue>
            <StatName>{getCorrectFormOfNounBasedOnValue(string, value)}</StatName>
        </Container>
    )
}

