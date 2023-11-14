import React, { useState, useContext } from "react";
import axios from "axios";
import ForumList from "./ForumList";

const Forum = (props) => {
  const [content, setContent] = useState("");
  const username = localStorage.getItem("username");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const addPost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3030/api/forum/addpost",
        { content, username },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      setSuccess(true);
      console.log("Post added:", response.data);
      setContent("");
      props.showAlert("Post Added Successfully", "success");
    } catch (err) {
      setError("Failed to add post");
      console.error("Error adding post:", err.response?.data || err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost();
  };
  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addPostModal"
      >
        Add New Post
      </button>

      <div
        class="modal fade"
        id="addPostModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                New Post
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div class="modal-body">
                {error && <div className="error">{error}</div>}
                {success && (
                  <div className="success">Post added successfully!</div>
                )}

                <div class="form-floating mb-3">
                  <textarea
                    class="form-control"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                  <label for="floatingInput">Add Content</label>
                </div>
                
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Add Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ForumList />
    </div>
  );
};

export default Forum;
