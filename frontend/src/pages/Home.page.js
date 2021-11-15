import { NavBar } from "../components/Navbar/NavBar.component";
import { Container, ContentContainer } from "../styles/Global.style";
import { Header } from "../components/Header/Header.component";
import { SearchBar } from "../components/SearchBar/SearchBar.component";
import { PostThumbnail } from "../components/PostThumbnail/PostThumbnail.component";

const posts = [{
  id: 1,
  title: "How to reverse a binary tree?",
  content: "I aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaI aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaI aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsasdgashashdashdas",
  tags: ["JavaScript", "Binary tree", "ASD"],
  createdBy: {
    "username": "Jimmy Jones"
  },
  stats:{
    "views": 2,
    "answers": 0,
    "likes": 15,
    "dislikes": 14
  },
  timestamp: new Date(1636654463618)
},
{
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
  "timestamp": new Date(1636654483618)
},
{
  "id": 3,
  "title": "Yoyoyoyoyo?YoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?",
  "content": "I aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaIaasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaI aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsasdgashashdashdas I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this",
  "tags": ["JavaScript", "Binary tree", "ASD", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1"],
  "createdBy": {
    "username": "Jimmy Jones"
  },
  "stats":{
    "views": 1,
    "answers": 1,
    "likes": 14,
    "dislikes": 14
  },
  "timestamp": new Date(1636654483618)
},
{
  "id": 4,
  "title": "Yoyoyoyoyo?YoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyoYoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?Yoyoyoyoyo?",
  "content": "I aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaIaasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsaI aasdgashassssssssssssssssssssssssssshsahasdhasadassgaashsahsahsasdgashashdashdas I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this I also tried to do this but it happened that blabla so i tried this and then tried this and tried this and this",
  "tags": ["JavaScript", "Binary tree", "ASD", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1", "Tag1"],
  "createdBy": {
    "username": "Jimmy Jones"
  },
  "stats":{
    "views": 2,
    "answers": 5,
    "likes": 15,
    "dislikes": 14
  },
  "timestamp": new Date(1636654483618)
}
];

export const Home = () => {
  return (
    <Container>
      <NavBar />
      <ContentContainer>
        <Header title="Home">
          <SearchBar type="question"/>
        </Header>
        {posts.map((post) => <PostThumbnail post={post} key={post.id}></PostThumbnail>)}
      </ContentContainer>
    </Container>
  );
};
