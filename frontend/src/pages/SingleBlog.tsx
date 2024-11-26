import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBar from '../components/AppBar';
import Skeleton from '../components/Skeleton';
import { formatDate } from '../utils/dateTime';


function SingleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://backend.pranavsalunkhe327.workers.dev/api/v1/blog/${id}`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
        setTitle(response.data.blog.title);
        setContent(response.data.blog.content);
        setDate(response.data.blog.createdAt);
        setAuthor(response.data.blog.author.firstname);
      } catch (err) {
        console.error(err);
        setError('Failed to load the blog. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-red-500 text-xl font-bold">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <AppBar />
      <div className="min-h-screen p-6">

        <div className="max-w-3xl mx-auto  rounded-lg shadow p-8">
     
          <div className="flex items-center space-x-4 mb-5">
          <div className="relative mb-6 mr-2 inline-flex items-center justify-center w-6 h-6 overflow-hidden rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{author[0]}</span>
    </div>
            <div>
              <p className="text-gray-800 font-semibold text-lg">{author}</p>
              <p className="text-gray-500 text-sm">{formatDate(date)}</p>
              <p className='text-xs text-gray-400'>{Math.ceil(content.length/ 100)} minutes read</p>
            </div>
          </div>

       
          <h1 className="lg:text-5xl text-xl font-bold text-gray-900 mb-8">{title}</h1>

       
          <div className="lg:text-lg  text-gray-500 leading-relaxed whitespace-pre-wrap mb-12">
            {content}
          </div>

          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            ← Back to Blogs
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
