import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post, onDelete }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      console.log("Deleting post with ID:", post._id); // Log the ID for debugging
      const response = await fetch(`https://crudpost-73j1.onrender.com/api/delete-posts/${post._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Post deleted successfully."); // Log successful deletion
        onDelete(post._id); // Notify the parent about the deletion
      } else {
        console.error("Failed to delete the post. Response:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      {/* Post Title */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
        <p className="text-gray-600 mt-2">{post.description}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <img
          src={post.image} // Use the Cloudinary URL directly
          alt={post.title}
          className="w-full h-64 object-cover"
        />
      )}

      {/* Post Actions */}
      <div className="p-4 border-t border-gray-300 flex justify-between items-center">
        <Link
          to={`/posts/${post._id}`}
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          View
        </Link>
        <Link
          to={`/edit/${post._id}`}
          className="bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default PostCard;
