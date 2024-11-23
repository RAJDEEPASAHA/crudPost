import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function PostDetails() {
  const { id } = useParams(); // Get the post ID from the route
  const [post, setPost] = useState(null); // Store the post data
  const [error, setError] = useState(""); // Handle errors
  const [loading, setLoading] = useState(true); // Show loading state

  useEffect(() => {
    // Fetch the post by its ID
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/get-posts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch the post.");
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  if (!post) {
    return <div className="text-center text-gray-500 mt-10">Post not found.</div>;
  }

  return (
    <div className="container mx-auto max-w-3xl p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.description}</p>
      {post.image && (
        <img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt={post.title}
          className="w-full max-w-lg mx-auto rounded-lg shadow-md mb-6"
        />
      )}
      <Link
        to="/"
        className="inline-block bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Back to Posts
      </Link>
    </div>
  );
}

export default PostDetails;
