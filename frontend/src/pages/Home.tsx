import axios from 'axios'
import { useEffect, useState } from 'react'
import AppBar from '../components/AppBar';
interface Blog{
    id : string,
    title : string,
    content : string,
    author : {
      firstname : string,
    }
  }
  function Home() {
    const [blogs  , setBlogs] = useState<Blog[]>([]);
    const [loading , setLoading] = useState(true);
        useEffect(() => {
      const fetchBlog = async () => { 
        try{
          const response = await axios.get("http://localhost:8787/api/v1/blog/bulk")
          setBlogs(response.data.blogs || [])
          setLoading(false);
        }catch(err){
          console.log(err)
        }
      }
      fetchBlog();
    } , [])
    if(loading){
      <AppBar />
      return <div>Loading...</div>
    }
  return (
      <div className=''>
        <AppBar />
        {blogs.map((blog) => {
          return (
            <div className='font-bold underline bg-slate-600'>
              <h1>{blog.title}</h1>
              <p>{blog.content}</p>
              <p>{blog.author.firstname}</p>
    
            </div>
          )
        })}
      </div>
  )
}

export default Home
