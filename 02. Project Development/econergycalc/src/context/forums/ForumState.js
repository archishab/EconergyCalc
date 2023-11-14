import { useState } from "react";
import ForumContext from "./ForumContext";

const ForumState = (props) => {
  const host = "http://localhost:3030/";
  const postInitial = [];

  const [posts, setPosts] = useState(postInitial);

  //Add a post
  const addPost = async (content) => {
    const response = await fetch(`${host}api/forum/addpost`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({
        content,
      }),
    });
    const json = response.json();

    console.log("Adding a post");
    const newPost = {
      user: "654169de86a069773db0db98",
      content: "This is a new post",
      _id: "6553773a52637c2150651d66",
      timestamp: "2023-11-14T13:33:46.562Z",
      __v: 0,
    };
    setPosts(posts.concat(newPost));
  };

  return (
    <div>
      <ForumContext.Provider value={{ posts, addPost }}>
        {props.children}
      </ForumContext.Provider>
    </div>
  );
};

export default ForumState;
