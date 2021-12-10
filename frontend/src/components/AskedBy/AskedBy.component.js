import {
  ContainerPd2,
  LabelBg,
} from "../../styles/Global.style";
import { PostThumbnail } from "../PostThumbnail/PostThumbnail.component";

export const AskedBy = ({ user, postsState }) => {
  const { username } = user;
  return (
    <>
      <ContainerPd2>
        <LabelBg>Asked by {username}</LabelBg>
      </ContainerPd2>
      {postsState.posts.map((post) => (
        <PostThumbnail post={post} key={post._id}></PostThumbnail>
      ))}
      {postsState.loading ? <div>Loading ...</div> : null}
    </>
  );
};
