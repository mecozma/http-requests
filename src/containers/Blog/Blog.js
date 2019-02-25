import React, { Component } from 'react';
import axios from 'axios';

import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
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
                this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
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
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {posts}
                </section>
                
            </div>
        );
    }
}

export default Blog;