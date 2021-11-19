import { ContainerPd2, LabelBg, PostButton } from "../../styles/Global.style"
import { AddCommentTextarea } from "./AddComment.styled"

export const AddComment = () => {
    return(
        <ContainerPd2>
            <LabelBg>Your answer</LabelBg>
            <AddCommentTextarea placeholder="Write your answer here..."></AddCommentTextarea>
            <PostButton>Post</PostButton>
        </ContainerPd2>
    )
}