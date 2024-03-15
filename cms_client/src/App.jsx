import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/content').then((res) => {
      console.log(res.data)
      setPosts(res.data)
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  const handleCreate = (e) => {
    if (e.target.title.value === '' || e.target.slug.value === '' || e.target.content.value === '' || e.target.excerpt.value === '') {
      const newPost = {
        title: e.target.title.value,
        slug: e.target.slug.value,
        content: e.target.content.value,
        excerpt: e.target.excerpt.value,
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

  return (
    <>
      <h1>Content Management System</h1>
      <form action="/content" method="POST">
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="slug" placeholder="Slug" />
        <textarea name="content" placeholder="Content"></textarea>
        <input type="text" name="excerpt" placeholder="Excerpt" />
        <button onClick={handleCreate} type="submit">Create</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Content</th>
            <th>Excerpt</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((content) => {
            return (
              <>
                <tr key={content._id}>
                  <td>{content.title}</td>
                  <td>{content.slug}</td>
                  <td>{content.content}</td>
                  <td>{content.excerpt}</td>
                  <td>{content.updatedAt}</td>
                  <td>
                    <a href={`/content/${content._id}`}>View</a>
                    <a href={`/content/${content._id}/edit`}>Edit</a>
                    <form action={`/content/${content._id}?_method=DELETE`} method="POST">
                      <button type="submit">Delete</button>

                    </form>
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
