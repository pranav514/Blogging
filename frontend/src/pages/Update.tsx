import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AppBar from "../components/AppBar";
function removeHtMLTags(content : string){
    const cleantext = content.replace(/<[^>]*>/g, '')
    return cleantext;
}
function Update() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadstate , Setloadstate] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://backend.pranavsalunkhe327.workers.dev/api/v1/blog/${id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setTitle(response.data.blog.title);
        setContent(response.data.blog.content);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        alert("Failed to load blog details.");
        navigate("/explore");
      }
    };

    fetchBlog();
  }, [id, navigate]);

  // Handle blog update
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
        Setloadstate(true);
        const sanitized = removeHtMLTags(content)
      const response = await axios.put(
        `https://backend.pranavsalunkhe327.workers.dev/api/v1/blog/${id}`,
        { title, content:sanitized },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      Setloadstate(false)
    //   alert("Blog updated successfully!");
      navigate("/explore");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog. Please try again.");
    }
  };

  if (loading) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  return (
    <div>
        <AppBar />
        <a href="/" className='underline text-blue-400 ml-2 mt-1'>Home</a>
        <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Update Blog
        </h1>
        <form className="bg-white p-6 shadow-md rounded-lg">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your blog title"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Blog Content
            </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              placeholder="Write your blog content here..."
              className="mt-1"
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleUpdate}
              className="w-full rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 disabled:opacity-50"
            >
              {loadstate ? 'updating blog.....' : 'Update Blog'}
            </button>
          </div>
        </form>
      </div>
    </div> 
    </div>
   
  );
}

export default Update;
