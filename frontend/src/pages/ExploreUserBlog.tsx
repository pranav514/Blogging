import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "../components/Skeleton";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";

interface Blog {
  id: string;
  title: string;
  content: string;
}

function ExploreUserBlog() {
  const [loading, setLoading] = useState(true);
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const res = async () => {
      try {
        const response = await axios.get("https://backend.pranavsalunkhe327.workers.dev/api/v1/blog", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setBlogList(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    res();
  }, []);

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
        <a href="/" className="underline mt-1  float-left text-blue-500">Home</a>
         <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-800 mb-5">Your Blogs</h1>
        <div className="space-y-6">
          {blogList.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow rounded-lg p-6 hover:shadow-md transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {blog.content}
              </p>
              <button
                onClick={() => navigate("/update/" + blog.id)}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
              >
                Update
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
   
  );
}

export default ExploreUserBlog;
