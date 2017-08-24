import React, { Component } from 'react';
import { Link } from 'react-router';

class Post extends Component {
    render(){
        
        return(
            <div className='post'>
                <h3>Add a new drop</h3>
                <a href="javascript: void(0)" className="squid svg">
                    Squid
                </a>
                <a href="javascript: void(0)" className="eggs svg">
                    eggs
                </a>
                <a href="javascript: void(0)" className="seastar svg">
                    seastar
                </a>
                <form onSubmit={(e) => { this.props.newMsg(e, this.refs.author.value, this.refs.message.value, this.refs.sfx); this.refs.author.value = ''; this.refs.message.value = ''; }}>
                    <input ref='author' type='text' placeholder='enter your name'></input>
                    <textarea className='msg' ref='message' type='text' placeholder='enter your message' maxlength="50"></textarea>
                    <p>Go back to the Ocean to find your drop!</p>
                    <button className= 'newDropBtn' type='submit'>Drop!</button>
                    <audio ref='sfx' src='./water-drop.mp3' />
                </form>

            </div>
        )
    }
}

export default Post;