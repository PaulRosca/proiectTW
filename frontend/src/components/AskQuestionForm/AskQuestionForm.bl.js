import axios from "axios";

export const addQuestion = async ({ title, content, tags }) => {
  //some validation should be done
  try {
    const res = await axios.post(
      `http://localhost:9000/posts/createPost`,
      { title, content, tags },
      { withCredentials: true }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};
