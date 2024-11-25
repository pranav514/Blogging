import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import AppBar from '../components/AppBar';
import { useNavigate } from 'react-router-dom';
function removeHtMLTags(content : string){
    const cleantext = content.replace(/<[^>]*>/g, '')
    return cleantext;
}
function BlogPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!title || !content) {
      alert('Both title and content are required.');
      return;
    }

    try {
      setLoading(true);
      console.log(content)
      const sanitizedContent = removeHtMLTags(content)
      console.log(sanitizedContent)

      const response = await axios.post(
        'https://backend.pranavsalunkhe327.workers.dev/api/v1/blog',
        { title, content: sanitizedContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Blog posted successfully!');
      setTitle('');
      setContent('');
      navigate('/explore')
      console.log(response.data);
    } catch (error) {
      console.error('Error posting blog:', error);
      alert('Failed to post the blog.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <AppBar />
      <a href="/" className='underline text-blue-400 ml-2 mt-1'>Home</a>
       <div className="container mx-auto mt-8 max-w-3xl px-4">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Create a New Blog</h1>
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

        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="w-full rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post Blog'}
        </button>
      </form>
    </div>
    </div>
   
  );
}

export default BlogPostForm;
