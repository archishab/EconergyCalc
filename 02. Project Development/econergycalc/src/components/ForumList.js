import React, { useState, useEffect } from "react";
import axios from "axios";

const ForumList = (props) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Make the GET request to the backend API using Axios
        const response = await axios.get(
          "http://localhost:3030/api/forum/posts"
        );
        setPosts(response.data); // Set the posts in state
      } catch (error) {
        setError("Failed to load posts");
        console.error("There was an error!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }); 

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
            <i class="fa-solid fa-thumbs-up fa-lg me-3"></i>
            <i class="fa-solid fa-thumbs-down fa-lg me-3"></i>
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
