import { useState, useEffect } from 'react'
import './App.css'
import './index.css'
import axios from 'axios'
import Sidebar from './layouts/Sidebar'
import Window from './layouts/Window'

function App() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  useEffect(() => {
    axios.get('https://cms-api-swo9.onrender.com/content').then((res) => {
      console.log(res.data)
      setPosts(res.data)
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  const handleCreatePost = () => {
    console.log(title, slug, content, excerpt)
    if (title && slug && content && excerpt) {
      const newPost = {
        title: title,
        slug: slug,
        content: content,
        excerpt: excerpt,
        publishDate: new Date().toISOString(),
      };
      axios.post('https://cms-api-swo9.onrender.com/content',
        newPost
      ).then((res) => {
        setPosts([...posts, res.data]);
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  const handleDeletePost = (id) => {
    axios.delete(`http://localhost:3000/content/${id}`).then((res) => {
      const newPosts = posts.filter((post) => {
        return post._id !== id;
      });
      setPosts(newPosts);
    }).catch((error) => {
      console.log(error);
    });
  }


  return (
    <>
      <Sidebar />
      <Window />
    </>
  )
}

export default App
