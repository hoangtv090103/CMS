import { useState, useEffect } from 'react'
import './App.css'
import './index.css'
import axios from 'axios'

function App() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  useEffect(() => {
    axios.get('http://localhost:3000/content').then((res) => {
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
      axios.post('http://localhost:3000/content',
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
      <h1>Content Management System</h1>
      <div>
        <input type="text" name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" name="slug" placeholder="Slug" onChange={(e) => setSlug(e.target.value)} />
        <textarea name="content" placeholder="Content" onChange={(e) => setContent(e.target.value)} />
        <input type="text" name="excerpt" placeholder="Excerpt" onChange={(e) => setExcerpt(e.target.value)} />
        <button onClick={handleCreatePost} >Create</button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Title</th>
            <th scope="col" className="px-6 py-3">Slug</th> 
            <th scope="col" className="px-6 py-3">Content</th>
            <th scope="col" className="px-6 py-3">Excerpt</th>
            <th scope="col" className="px-6 py-3">Updated At</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((content) => {
            return (
              <>
                <tr key={content._id}>
                  <td className="px-6 py-4">{content.title}</td>
                  <td className="px-6 py-4">{content.slug}</td>
                  <td className="px-6 py-4">{content.content}</td>
                  <td className="px-6 py-4">{content.excerpt}</td>
                  <td className="px-6 py-4">{content.updatedAt}</td>
                  <td className="px-6 py-4">
                    <a href={`/content/${content._id}`}>View</a>
                    <a href={`/content/${content._id}/edit`}>Edit</a>
                    <button onClick={() => handleDeletePost(content._id)}>Delete</button>
                  </td>
                </tr>
              </>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default App
