import axios from 'axios';
import { useEffect, useState } from 'react';
import AppBar from '../components/AppBar';
import { useNavigate } from 'react-router-dom';
import Skeleton from '../components/Skeleton';
import { formatDate } from '../utils/dateTime';
import { Avatar } from '../components/Avatar';


interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt : string;
  updatedAt : string;
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
      <div className="container mx-auto p-6 flex items-center flex-col">
        {blogs.map((blog) => (
          <div  className="mb-8 p-6 border-b border-gray-200">
            <div className='flex flex-row '>
           <Avatar value = {blog.author.firstname[0]} size = {5} />
              <p className="text-sm text-gray-400 my-2">{blog.author.firstname}</p>
            <p className="text-sm text-gray-600 ml-2 my-2">{formatDate(blog.createdAt)}</p>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{blog.title}</h1>
            {/* <p className="text-sm text-gray-600 my-2">updated At : {formatDate(blog.updatedAt)}</p> */}
            <p className="text-md text-gray-500">{blog.content.length > 100 ? blog.content.slice(0 , 100) + "...." : blog.content}</p>
            <p className='text-xs text-gray-400'>{Math.ceil(blog.content.length/ 100)} minutes read</p>
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
