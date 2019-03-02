import React, {Component} from 'react';
import axios from '../../../axios';
// import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import  './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
  state = {
    posts: []
    // selectedPostId: null,
    // error: false
  }

  componentDidMount() {
    console.log("Posts Props",this.props);
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
    // this.setState({selectedPostId: id});
    // this.props.history.push('/posts/' + id);
    this.props.history.push({pathname: '/posts/' + id});
  }

  render() {

    let posts = <p style={{textAlign: 'center'}}>Oh no! You stumbled upon an error! :(</p>;
      if (!this.state.error) {
          posts = this.state.posts.map(post => {
              return (
                  // <Link to={'/posts/' + post.id} key={post.id}>
                      <Post
                          key={post.id}
                          author={post.author}
                          title={post.title}
                          clicked={() => this.postSelectedHandler(post.id)} />
                  // </Link>
              );
          })
      }

    return (
      <div>
        <section className="Posts">
          {posts}
         </section>
        <Route  path={this.props.match.url + "/:id"} component={FullPost} />
      </div>
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