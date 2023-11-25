import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const ForumList = (props) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  });

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3030/api/forum/posts");
      setPosts(response.data);
    } catch (error) {
      setError("Failed to load posts");
      console.error("There was an error!", error);
    } finally {
      setLoading(false);
    }
  };


  const likePost = async (id) => {
    try {
      const response = await axios.post(`http://localhost:3030/api/forum/likepost/${id}`);
      // Update the posts state with the new like count
      setPosts(posts.map(post => post._id === id ? { ...post, upVote: response.data.upVote } : post));
    } catch (error) {
      console.error("Error liking the post", error);
    }
  };

  const dislikePost = async (id) => {
    try {
      const response = await axios.post(`http://localhost:3030/api/forum/dislikepost/${id}`);
      // Update the posts state with the new dislike count
      setPosts(posts.map(post => post._id === id ? { ...post, downVote: response.data.downVote } : post));
    } catch (error) {
      console.error("Error disliking the post", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {posts.length > 0 ? (
        <div class="my-3 p-3 bg-body rounded shadow-sm">
          {posts.map((post) => (
            <div>        
            <div class="d-flex text-body-secondary py-3" key={post._id}>
               <p class="pb-3 mb-0 small lh-sm border-bottom">
                <div class="d-block text-gray-dark">
                <strong >@{post.username}</strong> • 
                <time dateTime={post.timestamp}>
                {new Date(post.timestamp).toLocaleString()}
                </time>
                </div>
               
               
               {post.content}
               </p> 
               <div>
                </div>
            
            </div>
            <i class="fa-solid fa-thumbs-up fa-lg me-1" onClick={() => likePost(post._id)}></i>{post.upVote}
            <i class="fa-solid fa-thumbs-down fa-lg me-1 ms-3" onClick={() => dislikePost(post._id)}></i>{post.downVote}
            <hr/>
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
