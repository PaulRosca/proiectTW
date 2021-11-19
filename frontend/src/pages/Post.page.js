import { Icon } from "@iconify/react"
import { useHistory } from "react-router"
import { Header } from "../components/Header/Header.component"
import { NavBar } from "../components/Navbar/NavBar.component"
import { Container, ContentContainer } from "../styles/Global.style"
import { FullPost } from "../components/FullPost/FullPost.component"
import { CommentSection } from "../components/CommentSection/CommentSection.component"
import { AddComment } from "../components/AddComment/AddComment.component"

const post = {
  "id": 2,
  "title": "Yoyoyoyoyo?YoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?",
  "content": "I aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaIaasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaI aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsasdgashashdashdas I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this",
  "tags": ["JavaScript", "Binary tree", "ASD", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1"],
  "createdBy": {
    "username": "Jimmy Jones"
  },
  "stats":{
    "views": 2,
    "answers": 0,
    "likes": 18,
    "dislikes": 14
  },
  "timestamp": new Date(1636654483618),
  "comments":[{"content": "Yblablablablablablablablabldagsadgashsahsahdsaaaaaaaaaaaaaaaaaaaaaaaasdhashashsahashadgaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "createdBy":{"username" : "Scott Walton"}, "timestamp": new Date(1636654683618), "likes": 2, "dislikes": 0},
              {"content": "Yes its a comment as well", "createdBy":{"username" : "Scott Walton"}, "timestamp": new Date(1636658683618), "likes": 2, "dislikes": 4}    
  ]
}

export const Post = () => {
    const history = useHistory();
    return(
        <Container>
            <NavBar />
            <ContentContainer>
                <Header title="Post">
                <Icon icon="akar-icons:arrow-back-thick" style={{"fontSize": "1.2rem", "cursor":"pointer"}} onClick={(e) => history.goBack()}></Icon>
                </Header>
                <FullPost post={post}></FullPost>
                <AddComment />
                <CommentSection comments={post.comments} />
            </ContentContainer>
        </Container>
    )
}