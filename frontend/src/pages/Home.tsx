import axios from 'axios';
import { useEffect, useState } from 'react';
import AppBar from '../components/AppBar';
import { useNavigate } from 'react-router-dom';
import Skeleton from '../components/Skeleton';
import Animation from '../components/Animation';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    firstname: string;
  };
}

function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://backend.pranavsalunkhe327.workers.dev/api/v1/blog/bulk');
        setBlogs(response.data.blogs || []);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div>
        <AppBar />
        <div>
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar />
      <div className="container mx-auto p-6">
        {blogs.map((blog) => (
          <div  className="mb-8 p-6 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-blue-800">{blog.title}</h1>
            <p className="text-sm text-gray-600 my-2">By {blog.author.firstname}</p>
            <p className="text-lg text-gray-700">{blog.content}</p>
            <button onClick={() => {
              navigate('/view/' + blog.id)
            }} className='text-green-500'>View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
