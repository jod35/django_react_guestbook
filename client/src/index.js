import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Post from './components/post';
import './main.css'


const baseURL = 'http://localhost:8000'

const App = () => {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('')
  const [modalVisible, setModalVisible] = useState(false);

  const getPosts = async () => {
    const response = await fetch(`${baseURL}/posts/`);

    const data = await response.json();

    if (response.ok) {
      console.log(data)
      setPosts(data)
    }
    else {
      console.log("Failed Network request")
    }
  }


  const createPost = async (e) => {

    e.preventDefault();
    const new_post = { title, content };


    const newRequest = new Request(`${baseURL}/posts/`, {
      method: 'POST',
      body: JSON.stringify(new_post),
      headers: {
        'Content-Type': 'Application/Json'
      }
    })

    const response = await fetch(newRequest);

    const data = await response.json();

    if (response.ok) {
      getPosts()
    }

    console.log(new_post)

    setTitle('')
    setContent('')


    setModalVisible(!modalVisible)
  }

  const deletePost = async (postId) => {
    const newRequest = new Request(`${baseURL}/posts/${postId}/`,
      {
        method: 'DELETE'
      }
    )

    const response = await fetch(newRequest);

    getPosts()

    // window.location.reload()
  }

  useEffect(
    () => {
      getPosts()
    }, []
  )

  return (
    <div className='app'>
      <div className="header">
        <div className='left'><p className='headerText'>Guest Book</p></div>
        <div className='right'><a href="#" className="add-btn"
          onClick={() => setModalVisible(true)}
        >Add Post</a></div>
      </div>
      {posts.length > 0 ? (

        <div className='posts'>
          {
            posts.map(
              (item) => (
                <Post title={item.title} content={item.content} key={item.id}
                  onClick={() => deletePost(item.id)} />
              )
            )
          }
        </div>

      ) : (

        <div className="centerText">
          <h1 className="no-posts">No Notes 😞</h1>
        </div>

      )}
      <div className={modalVisible ? 'post-modal-open' : 'post-modal'}>
        <div className="form">
          <form onSubmit={createPost}>
            <div className='form-header'>
              <div><p className="post-header-text">Create a Note</p></div>
              <div><a href="#" className="closebtn"
                onClick={() => setModalVisible(!modalVisible)}
              >X</a></div>
            </div>
            <div className="form-area">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" name="title"
                  id="title" className="form-control form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea className='form-control' value={content}
                  onChange={e => setContent(e.target.value)}
                  rows={10}></textarea>
              </div>

              <div className="form-group">
                <input type="submit" value="Save" className='btn' />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


ReactDOM.render(<App />, document.querySelector('#root'));