import React, { Component } from 'react';
import axios from 'axios';
import './App.css'

class App extends Component {
  state = {
    title: '',
    body: '',
    posts: []
  }

componentDidMount = () =>{
  this.getBlogPosts();
}

  getBlogPosts = () =>{
    axios.get('/api')
    .then((res) =>{
      const data = res.data;
      this.setState({ posts:data });
      console.log('Data has been received');
    })
    .catch(() =>{
      alert('Error retrieving data');
    })
  }

  handleChange = ({target}) =>{
    const {name, value} = target;
    this.setState({
      [name] : value
    });
  }

  submitHandler = (event) =>{
    event.preventDefault();
    const {title, body} = this.state;
    const payload = {
      title:title,
      body:body
    };
    // HTTP POST 
    axios({
      url:'/api/save',
      method:'POST',
      data:payload
    })
    .then(() => {
      console.log('Data has been sent to the server');
      this.clearInputs();
      this.getBlogPosts();
    })
    .catch(() => {
      console.log('Internal server error');
    })
  }

  clearInputs = () =>{
    this.setState({
      title: '',
      body:''
    });
  }

  displayBlogPosts = (posts) => {
    if(!posts.length){return null;}
    return posts.map((post,index) => (
      <div key={index} className="blog-post-display">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  }

  render() {
    const {title, body, posts} = this.state;
    console.log("State: ",this.state);   
    // JSX
    return (
      <div className="app">
        <h2>Welcome To My App</h2>
        <form onSubmit={this.submitHandler}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              name="body"
              placeholder="body"
              cols="30"
              rows="10"
              value={body}
              onChange={this.handleChange}
            />         
          </div>
          <button>
              Submit
          </button>
        </form>
        <div className="blog-posts">
          {this.displayBlogPosts(posts)}
        </div>    
      </div>
    )
  }
}

export default App;
