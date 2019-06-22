import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';


class Feed extends Component {
    state = {
        feed: [],
    };
    
    async componentDidMount() {
        this.registerToSocket();

        const response = await api.get('posts');

        this.setState({ feed: response.data });
    };
    registerToSocket = () => {
        const socket = io('http://localhost:3001');

        // post, like
        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] });
        })
        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post => 
                    post._id === likedPost._id ? likedPost : post
                    )
            });
        })
    }


    handleLike = id => {
        console.log("AQUI NO HANDLE");
        console.log(id);
        api.post(`/posts/${id}/like`);                
    }

    render() {
        return(
            <section id="post-list">
                { this.state.feed.map(post => (
                    <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.autor}</span>
                            <span className="place">{post.place}</span>
                        </div>
                        <img src={more} alt="Mais"/>
                    </header>
                        
                        <img src={`http://localhost:3001/files/${post.imagem}`} alt=""/>

                    <footer>
                        <div className="actions">
                            <button type="button" onClick={() => this.handleLike(post._id)}>
                                <img src={like} alt="curtir"/>
                            </button>
                            <button type="button" onClick={() => this.handleComment(post._id)}>
                                <img src={comment} alt="comentar"/>
                            </button>
                            <button type="button" onClick={() => this.handleSend(post._id)}>
                                <img src={send} alt="enviar"/>
                            </button>
                        </div>

                        <strong>{post.likes} curtidas</strong>

                        <p>
                            {post.descricao}
                        <span>{post.hashtags}</span>    
                        </p>
                    </footer>    
                </article>
                )) }
            </section>
        )
    }
}

export default Feed;