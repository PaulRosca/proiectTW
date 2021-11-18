import { Container } from "./ReactToPost.styled"
import { Icon } from "@iconify/react";
import { Stat } from "../Stat/Stat.component";

export const ReactToPost = ({likes, dislikes, isForComment}) => {
    return(
        <div>
        {isForComment && (<Container>
        <Icon icon="ant-design:dislike-outlined" style={{fontSize: "1.5rem", "margin-right": "1rem"}}></Icon>
            <Stat value={likes - dislikes} string={"vote"}/>
            <Icon icon="ant-design:like-outlined" style={{fontSize: "1.5rem", "margin": "0 1rem"}}></Icon>
        </Container>)
        }
        {!isForComment && <Container>
            <Icon icon="ant-design:dislike-outlined" style={{fontSize: "2rem", "margin-right": "1rem"}}></Icon>
            <Stat value={likes - dislikes} string={"vote"}/>
            <Icon icon="ant-design:like-outlined" style={{fontSize: "2rem", "margin": "0 1rem"}}></Icon>
        </Container>}
        </div>
    )
}