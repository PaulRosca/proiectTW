import { ContainerPd2, LabelBg } from "../../styles/Global.style";
import { PostThumbnail } from "../PostThumbnail/PostThumbnail.component";

const postsByUser = [
    {
      "_id": "6197696895f9296e30e0bad9",
      "title": "De ce e asa greu la info? si mate 8",
      "content": "Intrebare despre P1",
      "views": 165,
      "createdBy": {
        "_id": "618f8161c0e9a06c61a6b907",
        "username": "paul1234",
        "email": "paul.rosca00@e-uvt.ro",
        "createdAt": "2021-11-13T09:12:02.004Z",
        "updatedAt": "2021-11-13T09:12:02.004Z",
        "__v": 0
      },
      "likeCount": 1,
      "dislikeCount": 1,
      "tags": [
        {
          "_id": "618f8224c0e9a06c61a6b90b",
          "content": "P1",
          "questionsCount": 0,
          "__v": 0
        },
        {
          "_id": "618f7f388d1f5bdea558435c",
          "content": "Differential Equations",
          "questionsCount": 0,
          "__v": 0
        },
        {
          "_id": "618f7f118d1f5bdea558435a",
          "content": "Graphs",
          "questionsCount": 0,
          "__v": 0
        }
      ],
      "commentCount": 17,
      "createdAt": "2021-11-19T09:07:52.752Z",
      "updatedAt": "2021-11-19T16:53:17.828Z",
      "__v": 0
    },
    {
      "_id": "6197696395f9296e30e0bad7",
      "title": "De ce e asa greu la info? si mate 7",
      "content": "Intrebare despre P1",
      "views": 1,
      "createdBy": {
        "_id": "618f8161c0e9a06c61a6b907",
        "username": "paul1234",
        "email": "paul.rosca00@e-uvt.ro",
        "createdAt": "2021-11-13T09:12:02.004Z",
        "updatedAt": "2021-11-13T09:12:02.004Z",
        "__v": 0
      },
      "likeCount": 1,
      "dislikeCount": 0,
      "tags": [
        {
          "_id": "618f8224c0e9a06c61a6b90b",
          "content": "P1",
          "questionsCount": 0,
          "__v": 0
        },
        {
          "_id": "618f7f388d1f5bdea558435c",
          "content": "Differential Equations",
          "questionsCount": 0,
          "__v": 0
        },
        {
          "_id": "618f7f118d1f5bdea558435a",
          "content": "Graphs",
          "questionsCount": 0,
          "__v": 0
        }
      ],
      "commentCount": 0,
      "createdAt": "2021-11-19T09:07:47.258Z",
      "updatedAt": "2021-11-19T12:08:47.688Z",
      "__v": 0
    },
    {
      "_id": "6197695f95f9296e30e0bad5",
      "title": "De ce e asa greu la info? si mate 6",
      "content": "Intrebare despre P1",
      "views": 0,
      "createdBy": {
        "_id": "618f8161c0e9a06c61a6b907",
        "username": "paul1234",
        "email": "paul.rosca00@e-uvt.ro",
        "createdAt": "2021-11-13T09:12:02.004Z",
        "updatedAt": "2021-11-13T09:12:02.004Z",
        "__v": 0
      },
      "likeCount": 0,
      "dislikeCount": 0,
      "tags": [
        {
          "_id": "618f8224c0e9a06c61a6b90b",
          "content": "P1",
          "questionsCount": 0,
          "__v": 0
        },
        {
          "_id": "618f7f388d1f5bdea558435c",
          "content": "Differential Equations",
          "questionsCount": 0,
          "__v": 0
        },
        {
          "_id": "618f7f118d1f5bdea558435a",
          "content": "Graphs",
          "questionsCount": 0,
          "__v": 0
        }
      ],
      "commentCount": 0,
      "createdAt": "2021-11-19T09:07:43.508Z",
      "updatedAt": "2021-11-19T09:07:43.508Z",
      "__v": 0
    }]
export const AskedBy = ({user}) => {
    const { username } = user;
    return(
        <div>
        <ContainerPd2>
        <LabelBg>Asked by {username}</LabelBg>
        </ContainerPd2>
        {postsByUser.map(post => <PostThumbnail post={post} key={post._id}/>)}
        </div>
    )
}