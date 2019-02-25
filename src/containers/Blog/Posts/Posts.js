import React, {Component} from 'react';
import axios from '../../../axios';

import Post from '../../../components/Post/Post';
import  './Posts.css';

class Posts extends Component {
  state = {
    posts: []
    // selectedPostId: null,
    // error: false
  }

  componentDidMount() {
    axios.get('/posts')
        .then(response => {
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'A mighty little man'
                }
            });
            this.setState({posts: updatedPosts});
            console.log(updatedPosts);
        })
        .catch(error => {
            console.log(error);
            // this.setState({error: true});
        });
}

  postSelectedHandler = (id) => {
    this.setState({selectedPostId: id});
  }

  render() {

    let posts = <p style={{textAlign: 'center'}}>Oh no! You stumbled upon an error! :(</p>;
      if (!this.state.error) {
          posts = this.state.posts.map(post => {
              return(
                  <Post
                      author={post.author}
                      title={post.title}
                      key={post.id}
                      clicked={() => this.postSelectedHandler(post.id)} />
              )
          })
      }

    return (
      <section className="Posts">
          {posts}
      </section>
    );
  }
}

export default Posts;

// <section>
//                     <FullPost id={this.state.selectedPostId} />
//                 </section>
//                 <section>
//                     <NewPost />
//                 </section>