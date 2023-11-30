import React, { useState, useEffect } from "react";
import axios from "axios";

const ForumList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }); // The empty array ensures this effect runs only once after the component mounts

  // Function to fetch posts from the server
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3030/api/forum/posts");
      setPosts(response.data); // Set the posts in state
    } catch (error) {
      setError("Failed to load posts");
      console.error("There was an error!", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle post likes
  const likePost = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:3030/api/forum/likepost/${id}`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      // Update the posts state with the new like count
      setPosts(
        posts.map((post) =>
          post._id === id ? { ...post, upVote: response.data.upVote } : post
        )
      );
    } catch (error) {
      console.error("Error liking the post", error);
    }
  };

  const dislikePost = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:3030/api/forum/dislikepost/${id}`
      );
      // Update the posts state with the new dislike count
      setPosts(
        posts.map((post) =>
          post._id === id ? { ...post, downVote: response.data.downVote } : post
        )
      );
    } catch (error) {
      console.error("Error disliking the post", error);
    }
  };

  // Function to handle post replies
  const replyToPost = async (content, postId) => {
    try {
      const response = await axios.post(
        `http://localhost:3030/api/forum/replytopost/${postId}`,
        { content, username },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      // Update the posts state to include the new reply
      setPosts(
        posts.map((post) =>
          post._id === postId
            ? { ...post, replies: [...post.replies, response.data] }
            : post
        )
      );
    } catch (error) {
      console.error("Error replying to the post", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {posts.length > 0 ? (
        <div class="container">
          {posts.map((post) => (
            <div key={post._id} class="my-3 p-3 bg-body rounded shadow">
              <div class="align-items-center d-flex text-body-secondary pt-3">
                <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                  <div class="d-flex justify-content-between mb-3 align-items-center">
                    <i
                      class="me-2 fa-solid fa-user fa-lg"
                      style={{ color: "#000000" }}
                    >
                      <strong class="text-gray-dark">@{post.username}</strong>
                    </i>

                    <time dateTime={post.timestamp}>
                      {new Date(post.timestamp).toLocaleString()}
                    </time>
                  </div>
                  <span class="d-block">{post.content}</span>
                </div>
              </div>
              <div class="pb-3 mb-0 my-2 small lh-sm border-bottom w-100">
                <div className="my-3">
                  <i
                    class="fa-solid fa-thumbs-up fa-2xl me-1"
                    style={{ color: "#007a14" }}
                    onClick={() => likePost(post._id)}
                  ></i>
                  {post.upVote}
                  <i
                    class="fa-solid fa-thumbs-down fa-2xl me-1 ms-3"
                    style={{ color: "#a80000" }}
                    onClick={() => dislikePost(post._id)}
                  ></i>
                  {post.downVote}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const content = e.target.elements.reply.value;
                    replyToPost(content, post._id);
                    e.target.elements.reply.value = "";
                  }}
                >
                  <div class="form-floating my-2">
                    <textarea
                      name="reply"
                      class="form-control"
                      placeholder="Leave a reply here"
                      id="floatingTextarea2"
                      style={{ height: 100 }}
                      required
                    ></textarea>
                    <label for="floatingTextarea2">Leave a reply</label>
                  </div>
                  <button class="btn btn-primary shadow" type="submit">
                    Reply
                  </button>
                </form>
              </div>
              <div className="mt-2">
                {post.replies &&
                  post.replies.map((reply) => (
                    <div
                      key={reply._id}
                      class="align-items-center d-flex text-body-secondary pt-3"
                    >
                      <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                        <div class="d-flex justify-content-between align-items-center">
                          <i
                            class="me-2 fa-regular fa-comment-dots fa-sm"
                            style={{ color: "#000000" }}
                          >
                            <strong class="p-1 text-gray-dark">
                              @{reply.username}
                            </strong>
                          </i>
                          <time dateTime={reply.timestamp}>
                            {new Date(reply.timestamp).toLocaleString()}
                          </time>
                        </div>
                        <span class="d-block">{reply.content}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts to display.</p>
      )}
    </div>
  );
};

export default ForumList;
