import React from 'react';
import '../main.css'

const Post = ({ title, content, onClick }) => {
    return (
        <div className='post'>
            <div className="post-header">
                <div className="left">
                    <h3 className='title'>{title.slice(0, 50)}</h3>
                </div>
                <div className="right">
                    <a href="#" className="del-btn" onClick={onClick}>X</a>
                </div>
            </div>
            <p className='content'>{content.slice(0, 50)}</p>
        </div>
    )
}


export default Post