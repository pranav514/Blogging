import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBar from '../components/AppBar';
import Skeleton from '../components/Skeleton';

function SingleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState(''); // Added missing title state
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8787/api/v1/blog/${id}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        setTitle(response.data.blog.title);
        setContent(response.data.blog.content);
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
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <AppBar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto  -lg p-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">{title}</h1>
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-8 px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
            Back to Blogs
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
